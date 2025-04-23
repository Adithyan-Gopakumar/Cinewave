import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../common/axios';
import { ENDPOINTS } from '../common/constants';

const useList = (orderBy, orderType) => {
    return useQuery({
        queryKey: [ENDPOINTS.MOVIES.LIST, orderBy, orderType],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (orderBy) params.append('order_by', orderBy);
            if (orderType) params.append('order_type', orderType);
            return api.get(ENDPOINTS.MOVIES.LIST, { params }).then(res => res.data.data);
        }
    });
};

const useUpcomingList = () => {
    return useQuery({
        queryKey: [ENDPOINTS.MOVIES.LIST_UPCOMING],
        queryFn: async () => {
            return api.get(ENDPOINTS.MOVIES.LIST_UPCOMING).then(res => res.data.data);
        }
    });
};

const useTrendingList = () => {
    return useQuery({
        queryKey: [ENDPOINTS.MOVIES.LIST_TRENDING],
        queryFn: async () => {
            return api.get(ENDPOINTS.MOVIES.LIST_TRENDING).then(res => res.data.data);
        }
    });
};

const useDetail = id => {
    return useQuery({
        queryKey: [ENDPOINTS.MOVIES.DETAIL(id)],
        queryFn: async () => {
            return api.get(ENDPOINTS.MOVIES.DETAIL(id)).then(res => res.data.data);
        }
    });
};

const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async data => {
            const formData = new FormData();

            formData.append('title', data.title);
            formData.append('genre', data.genre);
            formData.append('release_date', data.release_date);
            formData.append('language', data.language);
            formData.append('duration_minutes', data.duration_minutes);
            formData.append('rating', data.rating);
            formData.append('about', data.about);
            formData.append('cast', data.cast);
            formData.append('poster', data.poster);
            formData.append('banner', data.banner);

            return api.post(ENDPOINTS.MOVIES.CREATE, formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.MOVIES.LIST);
        }
    });
};

const useUpdate = id => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async data => {
            const formData = new FormData();

            formData.append('title', data.title);
            formData.append('genre', data.genre);
            formData.append('release_date', data.release_date);
            formData.append('language', data.language);
            formData.append('duration_minutes', data.duration_minutes);
            formData.append('rating', data.rating);
            formData.append('about', data.about);
            formData.append('cast', data.cast);
            formData.append('poster', data.poster);
            formData.append('banner', data.banner);

            return api.patch(ENDPOINTS.MOVIES.UPDATE(id), formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.MOVIES.LIST);
        }
    });
};

const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async id => {
            return api.delete(ENDPOINTS.MOVIES.REMOVE(id)).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.MOVIES.LIST);
        }
    });
};

export const moviesApi = {
    useList,
    useUpcomingList,
    useTrendingList,
    useDetail,
    useCreate,
    useUpdate,
    useRemove
};
