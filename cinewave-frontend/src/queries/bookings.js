import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../common/axios';
import { ENDPOINTS } from '../common/constants';

const useList = () => {
    return useQuery({
        queryKey: [ENDPOINTS.BOOKINGS.LIST],
        queryFn: async () => {
            return api.get(ENDPOINTS.BOOKINGS.LIST).then(res => res.data.data);
        }
    });
};

const useUserList = () => {
    return useQuery({
        queryKey: [ENDPOINTS.BOOKINGS.LIST_USER_BOOKINGS],
        queryFn: async () => {
            return api.get(ENDPOINTS.BOOKINGS.LIST_USER_BOOKINGS).then(res => res.data.data);
        }
    });
};

const useDetail = id => {
    return useQuery({
        queryKey: [ENDPOINTS.BOOKINGS.DETAIL(id)],
        queryFn: async () => {
            return api.get(ENDPOINTS.BOOKINGS.DETAIL(id)).then(res => res.data.data);
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
            formData.append('show_timing_id', data.show_timing_id);
            formData.append('premium_seat_count', data.premium_seat_count);
            formData.append('premium_seat_cost', data.premium_seat_cost);
            formData.append('executive_seat_count', data.executive_seat_count);
            formData.append('executive_seat_cost', data.executive_seat_cost);
            formData.append('normal_seat_count', data.normal_seat_count);
            formData.append('normal_seat_cost', data.normal_seat_cost);
            formData.append('total_cost', data.total_cost);
            formData.append('payment_id', data.payment_id);

            return api.post(ENDPOINTS.BOOKINGS.CREATE, formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.BOOKINGS.LIST);
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
            formData.append('show_timing_id', data.show_timing_id);
            formData.append('booking_date', data.booking_date);
            formData.append('premium_seat_count', data.premium_seat_count);
            formData.append('premium_seat_cost', data.premium_seat_cost);
            formData.append('executive_seat_count', data.executive_seat_count);
            formData.append('executive_seat_cost', data.executive_seat_cost);
            formData.append('normal_seat_count', data.normal_seat_count);
            formData.append('normal_seat_cost', data.normal_seat_cost);
            formData.append('total_cost', data.total_cost);

            return api.patch(ENDPOINTS.BOOKINGS.UPDATE(id), formData).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.BOOKINGS.LIST);
        }
    });
};

const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async id => {
            return api.delete(ENDPOINTS.BOOKINGS.REMOVE(id)).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(ENDPOINTS.BOOKINGS.LIST);
        }
    });
};

export const bookingsApi = {
    useList,
    useUserList,
    useDetail,
    useCreate,
    useUpdate,
    useRemove
};
