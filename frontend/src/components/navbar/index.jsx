import { useEffect, useState } from "react";
import Input from "../input";
import Modal, { closeModal, openModal } from "../modal";
import SignUpForm from "../form/sign-up";
import SignInForm from "../form/sign-in";
import { IoIosSearch } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { IoPersonCircle } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";

export default function Navbar() {
    const location = useLocation();
    const [userDetail, setUserDetail] = useState();
    const [modalConfig, setModalConfig] = useState({ title: '', content: '' })
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const navigate = useNavigate()
    const modalId = 'auth-modal'

    const setModal = ({ title, content }) => {
        setModalConfig({ title, content })
        openModal(modalId)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?search=${search}`)
    }

    useEffect(() => {
        closeModal(modalId)
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken) setUserDetail(decodedToken)
        } else {
            setUserDetail(null)
        }
    }, [location])

    const handleLogout = () => {
        setDropdown(false)
        Cookies.remove('token');
        navigate('/')
    }

    return (
        <div className="fixed top-0 left-0 z-[1] flex items-center justify-between w-full gap-12 px-16 py-6 shadow-md backdrop-filter backdrop-blur-xl">
            <button onClick={() => { navigate("/") }} className="text-3xl font-bold">Online Shop</button>
            <form onSubmit={handleSearch} className="flex-1">
                <Input
                    placeholder={'Search Product Here...'} 
                    type='text'
                    icon={<IoIosSearch size={25} />}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
            </form>
            {userDetail && <div className="flex items-center gap-8">
                <button onClick={() => { navigate('/history') }} className="px-3 py-1 rounded-lg btn-ghost active:scale-95">
                    <LuClipboardList size={30} />
                </button>
                <div className="w-[1px] h-10 bg-neutral-content"></div>
                <div 
                    onMouseEnter={() => { setDropdown(true) }}
                    onMouseLeave={() => { setDropdown(false) }}
                    className="relative flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer btn-ghost"
                >
                    <IoPersonCircle size={30} />
                    <span className="text-lg">{userDetail.sub}</span>
                    {dropdown && <div className="absolute right-0 py-1 w-[100px] rounded-lg top-full">
                        <button onClick={handleLogout} className="w-full px-4 py-2 text-sm rounded-lg bg-base-300 active:scale-95">Sign Out</button>
                    </div>}
                </div>
            </div>}
            {!userDetail && <div className="flex gap-4">
                <button 
                    onClick={() => { setModal({ title: 'Sign In', content: <SignInForm /> }) }} 
                    className="px-6 btn btn-sm min-h-10 btn-outline btn-neutral"
                >
                    Sign In
                </button>
                <button 
                    onClick={() => { setModal({ title: 'Sign Up', content: <SignUpForm /> }) }} 
                    className="px-6 btn btn-sm min-h-10 btn-neutral"
                >
                    Sign Up
                </button>
            </div>}
            <Modal id={modalId} title={modalConfig.title}>
                {modalConfig.content}
            </Modal>
        </div>
    )
}