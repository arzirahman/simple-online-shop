import { useEffect, useState } from "react";
import ProductCart from "../../components/card/product";
import { axios } from "../../utils/axios";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from 'react-icons/io'
import Loading from "../../components/loading";

export default function Home() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const dummy = [
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: Math.random(), name: 'Sport Shoes', price: 3000, rating: 5, sold: 20, image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search') ?? '';
        setLoading(true)
        axios()
        .get(`/products?search=${searchParam}`)
        .then((response) => {
            setProducts(response.data.data)
        })
        .catch(() => {})
        .finally(() => {
            setLoading(false)
        })
    }, [location])

    return(
        <>
        {loading && <Loading />}
            {products.length > 0 && <div className="grid grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCart 
                        key={p.productId} 
                        name={p.name} 
                        image={p.image} 
                        price={p.price} 
                        rating={p.rating} 
                        sold={p.sold} 
                    />
                ))}
            </div>}
            {products.length == 0 && <div className="flex flex-col items-center justify-center w-full gap-8">
                <IoIosSearch size={200} />
                <span className="text-4xl font-bold">Data Not Found</span>
            </div>}
        </>
    )
}