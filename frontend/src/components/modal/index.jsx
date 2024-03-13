export default function Modal({ children, title, id, ref }) {
    return (
        <dialog ref={ref} id={id} className="modal">
            <div className="modal-box w-[400px]">
                <form method="dialog">
                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                </form>
                {title && <h3 className="text-lg font-bold">{title}</h3>}
                <div className="py-4">
                    {children}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export const openModal = (id) => {
    if (document) {
        document.getElementById(id).showModal()
    }
}