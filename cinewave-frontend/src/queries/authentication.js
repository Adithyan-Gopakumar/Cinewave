import { useMutation } from '@tanstack/react-query';

import { api } from '../common/axios';
import { ENDPOINTS } from '../common/constants';

const useLogin = () => {
    return useMutation({
        mutationFn: data => {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);

            return api.post(ENDPOINTS.USERS.LOGIN, formData).then(res => res.data);
        }
    });
};

const useRegister = () => {
    return useMutation({
        mutationFn: data => {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);
            formData.append('password', data.password);
            formData.append('password_repeat', data.password_repeat);

            return api.post(ENDPOINTS.USERS.REGISTER, formData).then(res => res.data);
        }
    });
};

export const authentication = {
    useLogin,
    useRegister
};
