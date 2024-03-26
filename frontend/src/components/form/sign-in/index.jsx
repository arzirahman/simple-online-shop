import { useFormik } from "formik";
import Input from "../../input";
import { axios } from "../../../utils/axios";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Alert from "../../alert";

export default function SignInForm() {
    const [alert, setAlert] = useState({ visibility: false, type: 'alert-success', message: 'Sign Up Success' });
    const [loading, setLoading] = useState(false);
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
                setAlert(prev => ({...prev, visibility: false}))
                setLoading(true)
                axios()
                .post('/user/sign-in', values)
                .then((response) => {
                    Cookies.set('token', response.data?.data?.token ?? '', { expires: 1 });
                    navigate('/')
                })
                .catch((error) => {
                    if (error?.response?.data?.message) {
                        setAlert({ visibility: true, type: 'alert-error', message: error?.response?.data?.message })
                    } else {
                        setAlert({ visibility: true, type: 'alert-error', message: 'Internal Server Error' })
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
            }
        }
    })
    
    return (
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-2">
            {alert.visibility && <Alert message={alert.message} type={alert.type} />}
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