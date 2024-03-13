import { useFormik } from "formik";
import Input from "../../input";

export default function SignInForm() {
    const form = useFormik({
        initialValues: {
            username: '', password: ''
        },
        validate: (values) => {
            const errors = {}
            if (!values.username) errors.username = "Username is required"
            if (!values.password) errors.password = "Password is required"
            return errors;
        },
        onSubmit: (values) => {
            console.log(values)
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
            <button type="submit" className="w-full mt-4 btn btn-primary">Sign In</button>
        </form>
    )
}