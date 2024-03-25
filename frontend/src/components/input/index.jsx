export default function Input({ errorMessage, label, className, icon, ...props }) {
    return (
        <label className="w-full form-control">
            {label && <div className="label">
                <span className="label-text">{label}</span>
            </div>}
            <label className={`flex items-center w-full h-10 gap-4 bg-base-200 input input-bordered text-primary ${errorMessage ? "input-error" : "input-neutral"}`}>
                {icon && <span className="text-gray-400">{icon}</span>}
                <input {...props} className="grow" />
            </label>
            {errorMessage && <div className="label">
                <span className="label-text-alt text-error">{errorMessage}</span>
            </div>}
        </label>
    )
}