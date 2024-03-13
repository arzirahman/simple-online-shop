import ProductCart from "../../components/card/product";

export default function Home() {
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

    return(
        <div className="grid grid-cols-4 gap-6">
            {dummy.map((u) => (
                <ProductCart key={u.id} name={u.name} image={u.image} price={u.price} rating={u.rating} sold={u.sold} />
            ))}
        </div>
    )
}