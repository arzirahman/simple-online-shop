import HistoryCard from "../../components/card/history";

export default function History() {
    const dummy = [
        { id: 'TRX-' + Math.floor(Math.random() * 1000), name: "Sport Shoes", price: 20000, status: 'complete', date: '2024-07-12 12:23:32', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: 'TRX-' + Math.floor(Math.random() * 1000), name: "Sport Shoes", price: 20000, status: 'complete', date: '2024-07-12 12:23:32', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: 'TRX-' + Math.floor(Math.random() * 1000), name: "Sport Shoes", price: 20000, status: 'complete', date: '2024-07-12 12:23:32', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: 'TRX-' + Math.floor(Math.random() * 1000), name: "Sport Shoes", price: 20000, status: 'complete', date: '2024-07-12 12:23:32', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: 'TRX-' + Math.floor(Math.random() * 1000), name: "Sport Shoes", price: 20000, status: 'complete', date: '2024-07-12 12:23:32', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' },
        { id: 'TRX-' + Math.floor(Math.random() * 1000), name: "Sport Shoes", price: 20000, status: 'complete', date: '2024-07-12 12:23:32', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' }
    ]

    return (
        <div className="flex flex-col w-full gap-8">
            <span className="text-2xl font-bold">Transaction List</span>
            <div className="grid grid-cols-2 gap-6">
                {dummy.map((u) => (
                    <HistoryCard key={u.id} id={u.id} name={u.name} image={u.image} date={u.date} price={u.price} status={u.status} />
                ))}
            </div>
        </div>
    )
}