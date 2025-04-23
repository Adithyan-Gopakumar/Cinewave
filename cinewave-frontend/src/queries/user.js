import { useQuery } from '@tanstack/react-query';
import { api } from '../common/axios';
import { ENDPOINTS } from '../common/constants';

const useAllUsers = () => {
    return useQuery({
        queryKey: [ENDPOINTS.USERS.LIST],
        queryFn: async () => {
            return api.get(ENDPOINTS.USERS.LIST).then(res => res.data);
        }
    });
};

export const users = {
    useAllUsers
};
