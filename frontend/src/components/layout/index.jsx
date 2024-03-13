import Navbar from "../navbar";

export default function Layout({ children }) {
    return (
        <main className="flex flex-col items-center w-full h-screen">
            <Navbar />
            <div className="flex flex-col items-center w-full px-6 py-10 overflow-y-auto">
                <div className="max-w-[1200px] w-full">{children}</div>
            </div>
        </main>
    )
}