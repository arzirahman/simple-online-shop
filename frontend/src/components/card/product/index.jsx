import { FaStar } from "react-icons/fa";
import { formatPrice, formatRating, formatSold } from "../../../utils/general";

export default function ProductCard({ name, price, rating, sold, image }) {
    const formattedPrice = formatPrice(price)
    const formattedRating = formatRating(rating)
    const formattedSold = formatSold(sold)

    return (
        <div className="shadow-xl card bg-base-100 bordered">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="w-full card-body">
                <span className="text-lg text-start">{name}</span>
                <span className="card-title text-primary">{formattedPrice}</span>
                <div className="flex items-center w-full gap-3 mt-2 text-gray-500">
                    <div className="flex items-center gap-1">
                        <span className="text-warning"><FaStar /></span>
                        <span>{formattedRating}</span>
                    </div>
                    <span className="translate-y-[-2px]">|</span>
                    <span>{formattedSold} Sold</span>
                </div>
                <div className="justify-end mt-4 card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}