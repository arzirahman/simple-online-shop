import { useFormik } from "formik";
import Input from "../../input";
import { axios } from "../../../utils/axios";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const form = useFormik({
        initialValues: {
            username: '', password: ''
        },
        validate: (values) => {
            const errors = {}
            if (!values.username) errors.username = "Username is required"
            if (!values.password) errors.password = "Password is required"
            if (values.password.length < 6) errors.password = "Password must be at least 6 characters long"
            return errors;
        },
        onSubmit: (values) => {
            if (!loading) {
                setErrorMessage('')
                setLoading(true)
                axios()
                .post('/user/sign-in', values)
                .then((response) => {
                    Cookies.set('token', response.data?.data?.token ?? '', { expires: 1 });
                    navigate('/')
                })
                .catch((error) => {
                    if (error?.response?.data?.message) setErrorMessage(error?.response?.data?.message)
                    else setErrorMessage('Internal Server Error')
                })
                .finally(() => {
                    setLoading(false)
                })
            }
        }
    })
    
    return (
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-2">
            <Input 
                label={'Username'} 
                placeholder="Username..." 
                type="text"
                name="username"
                onChange={form.handleChange}
                values={form.values.username}
                errorMessage={form.errors.username}
            />
            <Input 
                label={'Password'} 
                placeholder="Password..." 
                type="password" 
                name="password"
                onChange={form.handleChange}
                values={form.values.password}
                errorMessage={form.errors.password}
            />
            {errorMessage && <span className="mt-4 text-sm text-error">{errorMessage}</span>}
            <button type="submit" className="w-full mt-4 btn btn-neutral">
                {loading && <>
                    <span className="loading loading-spinner"></span>
                    loading
                </>}
                {!loading && <>Sign In</>}
            </button>
        </form>
    )
}