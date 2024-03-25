import { useFormik } from "formik"
import Input from "../../input"

export default function SignUpForm() {
    const form = useFormik({
        initialValues: {
            username: '', password: '', confirmPassword: ''
        },
        validate: (values) => {
            const errors = {}
            if (!values.username) errors.username = "Username is required"
            if (!values.password) errors.password = "Password is required"
            if (!values.confirmPassword) errors.confirmPassword = "Confirmation Password is required"
            if (values.password.length < 6) errors.password = "Password must be at least 6 characters long"
            if (values.confirmPassword !== values.password) errors.confirmPassword = "The password confirmation doesn't match"
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
            <Input 
                label={'Confirmation Password'} 
                placeholder="Confirmation Password..." 
                type="password" 
                name="confirmPassword"
                onChange={form.handleChange}
                values={form.values.confirmPassword}
                errorMessage={form.errors.confirmPassword}
            />
            <button type="submit" className="w-full mt-4 btn btn-neutral">Sign Up</button>
        </form>
    )
}