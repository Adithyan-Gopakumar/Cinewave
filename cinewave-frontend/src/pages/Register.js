import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { authentication } from '../queries/authentication';
import Input from '../components/Input';
import CinewaveNavbar from '../components/CinewaveNavbar';

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();

    const navigate = useNavigate();

    const { mutateAsync: registerUser, error: registrationError } = authentication.useRegister();

    useEffect(() => {
        if (registrationError?.response?.data) {
            const { errors } = registrationError.response.data;

            if (errors) {
                Object.keys(errors).forEach(key => {
                    setError(key, { message: errors[key] });
                });
            }
        }
    }, [registrationError?.response?.data, setError]);

    const onSubmit = async data => {
        await registerUser(data);
        navigate('/login');
    };

    const goToLogin = e => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <>
            <CinewaveNavbar title="Registration" hideSearch />
            <br />

            <div className="container">
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="col-8">
                        <div className="row">
                            <div className="col">
                                <Input
                                    {...register('first_name', { required: 'Please enter your first name' })}
                                    label={'First Name'}
                                    error={errors.first_name}
                                />
                            </div>
                            <div className="col">
                                <Input
                                    {...register('last_name', { required: 'Please enter your last name' })}
                                    label={'Last Name'}
                                    error={errors.last_name}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col">
                                <Input
                                    {...register('email', { required: 'Please enter your email' })}
                                    label={'Email'}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col">
                                <Input
                                    {...register('password', { required: 'Please enter your password' })}
                                    label={'Password'}
                                    error={errors.password}
                                    type={'password'}
                                />
                            </div>
                            <div className="col">
                                <Input
                                    {...register('password_repeat', { required: 'Please enter your password again' })}
                                    label={'Password Repeat'}
                                    error={errors.password_repeat}
                                    type={'password'}
                                />
                            </div>
                            <small className="text-muted">
                                Passwords should be at least 8 characters and should contain an alphabet, number and a
                                symbol
                            </small>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col-4">
                                <small>
                                    Already have an account?&nbsp;
                                    <a href="/#" className="text-primary" onClick={goToLogin}>
                                        Login
                                    </a>
                                </small>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
