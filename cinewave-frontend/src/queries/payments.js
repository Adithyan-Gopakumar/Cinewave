import { useQuery } from '@tanstack/react-query';

import { ENDPOINTS } from '../common/constants';
import { api } from '../common/axios';

const usePaymentIntent = (amount, readyForPayment) => {
    return useQuery({
        queryKey: [ENDPOINTS.BOOKINGS.PAYMENT_INTENT],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('amount', amount);
            return api.get(ENDPOINTS.BOOKINGS.PAYMENT_INTENT, { params }).then(res => res.data.data);
        },
        staleTime: 0,
        retry: false,
        enabled: readyForPayment
    });
};

export const stripeApi = {
    usePaymentIntent
};
