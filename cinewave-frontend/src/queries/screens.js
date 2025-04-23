import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../common/axios';
import { ENDPOINTS } from '../common/constants';

const useList = () => {
    return useQuery({
        queryKey: [ENDPOINTS.SCREENS.LIST],
        queryFn: async () => {
            return api.get(ENDPOINTS.SCREENS.LIST).then(res => res.data.data);
        }
    });
};

const useDetail = id => {
    return useQuery({
        queryKey: [ENDPOINTS.SCREENS.DETAIL(id)],
        queryFn: async () => {
            return api.get(ENDPOINTS.SCREENS.DETAIL(id)).then(res => res.data.data);
        }
    });
};

const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async data => {
            const formData = new FormData();

            formData.append('screen_name', data.screen_name);
            formData.append('premium_seat_count', data.premium_seat_count);
            formData.append('premium_seat_cost', data.premium_seat_cost);
            formData.append('executive_seat_count', data.executive_seat_count);
            formData.append('executive_seat_cost', data.executive_seat_cost);
            formData.append('normal_seat_count', data.normal_seat_count);
            formData.append('normal_seat_cost', data.normal_seat_cost);

            return api.post(ENDPOINTS.SCREENS.CREATE, formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.SCREENS.LIST);
        }
    });
};

const useUpdate = id => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async data => {
            const formData = new FormData();

            formData.append('screen_name', data.screen_name);
            formData.append('premium_seat_count', data.premium_seat_count);
            formData.append('premium_seat_cost', data.premium_seat_cost);
            formData.append('executive_seat_count', data.executive_seat_count);
            formData.append('executive_seat_cost', data.executive_seat_cost);
            formData.append('normal_seat_count', data.normal_seat_count);
            formData.append('normal_seat_cost', data.normal_seat_cost);

            return api.patch(ENDPOINTS.SCREENS.UPDATE(id), formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.SCREENS.LIST);
        }
    });
};

const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async id => {
            return api.delete(ENDPOINTS.SCREENS.REMOVE(id)).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.SCREENS.LIST);
        }
    });
};

export const screensApi = {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useRemove
};
