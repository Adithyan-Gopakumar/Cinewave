import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { authentication } from '../queries/authentication';
import { getCurrentUser } from '../common/util';
import CinewaveNavbar from '../components/CinewaveNavbar';

export default function Login() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { register, handleSubmit } = useForm();

    const { mutateAsync: login } = authentication.useLogin();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async data => {
        const response = await login(data);

        localStorage.setItem('token', response.token);

        localStorage.setItem('user', JSON.stringify(response.user));

        navigate(state?.from || '/');
    };

    const goToRegister = e => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <>
            <CinewaveNavbar title="Login" hideSearch />
            <br />

            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column justify-content-center align-content-center col-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input {...register('email')} className="form-control" />
                            </div>
                            <br />

                            <div>
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input {...register('password')} type="password" className="form-control" />
                            </div>
                            <br />

                            <div className="d-flex flex-row-reverse">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className="row">
                            <div className="col-12">
                                <small>
                                    Don't have an account?&nbsp;
                                    <a href="/#" className="text-primary" onClick={goToRegister}>
                                        Register
                                    </a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
