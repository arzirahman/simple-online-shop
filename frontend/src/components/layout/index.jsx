import Navbar from "../navbar";

export default function Layout({ children }) {
    return (
        <main className="flex flex-col items-center w-full h-screen bg-base-200">
            <Navbar />
            <div className="flex flex-col items-center w-full px-6 pt-32 pb-10 overflow-y-auto">
                <div className="max-w-[1200px] w-full">{children}</div>
            </div>
        </main>
    )
}