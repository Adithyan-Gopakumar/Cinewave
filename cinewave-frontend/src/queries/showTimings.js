import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../common/axios';
import { ENDPOINTS } from '../common/constants';

const useList = (movieId, date) => {
    return useQuery({
        queryKey: [ENDPOINTS.SHOW_TIMINGS.LIST, movieId, date],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (movieId) params.append('movie_id', movieId);
            if (date) params.append('date', date);
            return api.get(ENDPOINTS.SHOW_TIMINGS.LIST, { params }).then(res => res.data.data);
        }
    });
};

const useDetail = id => {
    return useQuery({
        queryKey: [ENDPOINTS.SHOW_TIMINGS.DETAIL(id)],
        queryFn: async () => {
            return api.get(ENDPOINTS.SHOW_TIMINGS.DETAIL(id)).then(res => res.data.data);
        }
    });
};

const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async data => {
            const formData = new FormData();

            formData.append('movie_id', data.movie_id);
            formData.append('screen_id', data.screen_id);
            formData.append('date', data.date);
            formData.append('time', data.time);

            return api.post(ENDPOINTS.SHOW_TIMINGS.CREATE, formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.SHOW_TIMINGS.LIST);
        }
    });
};

const useUpdate = id => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async data => {
            const formData = new FormData();

            formData.append('movie_id', data.movie_id);
            formData.append('screen_id', data.screen_id);
            formData.append('date', data.date);
            formData.append('time', data.time);

            return api.patch(ENDPOINTS.SHOW_TIMINGS.UPDATE(id), formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.SHOW_TIMINGS.LIST);
        }
    });
};

const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async id => {
            return api.delete(ENDPOINTS.SHOW_TIMINGS.REMOVE(id)).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.SHOW_TIMINGS.LIST);
        }
    });
};

export const showTimingsApi = {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useRemove
};
