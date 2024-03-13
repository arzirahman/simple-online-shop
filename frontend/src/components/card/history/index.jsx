import { formatDate, formatPrice } from "../../../utils/general"

export default function HistoryCard({ id, image, status, price, date, name }) {
    const formattedPrice = formatPrice(price)
    const formattedDate = formatDate(date)

    return (
        <div className="shadow-xl card card-side bg-base-100 bordered">
            <figure className="pl-8"><img className="w-24 h-24 max-h-24 max-w-24 rounded-xl" src={image} alt="Movie"/></figure>
            <div className="gap-4 card-body">
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">{id}</span>
                        <span className="translate-y-[-2px]">|</span>
                        <span>{formattedDate}</span>
                    </div>
                    <span className={`
                        p-1 text-xs rounded-md
                        ${status.toLowerCase() === "complete" ? "bg-success text-success-content" : 
                        status.toLowerCase() === "ongoing" ? "bg-warning text-warning-content" : ""
                    }
                    `}>{status}</span>
                </div>
                <div className="flex items-start justify-between">
                    <span className="text-lg text-start">{name}</span>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="card-title text-primary">{formattedPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}