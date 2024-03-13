import { useState } from "react";
import Input from "../input";
import Modal, { openModal } from "../modal";
import SignUpForm from "../form/sign-up";
import SignInForm from "../form/sign-in";
import { IoIosSearch } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [modalConfig, setModalConfig] = useState({ title: '', content: '' })
    const navigate = useNavigate()
    const modalId = 'auth-modal'

    const setModal = ({ title, content }) => {
        setModalConfig({ title, content })
        openModal(modalId)
    }

    return (
        <div className="flex items-center justify-between w-full gap-12 px-16 py-6 shadow-md">
            <button onClick={() => { navigate("/") }} className="text-3xl font-bold text-primary">Online Shop</button>
            <div className="flex-1">
                <Input
                    placeholder={'Search Product Here...'} 
                    type='text'
                    icon={<IoIosSearch size={25} />}
                />
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={() => { setModal({ title: 'Sign In', content: <SignInForm /> }) }} 
                    className="px-6 btn btn-sm min-h-10 btn-outline btn-primary"
                >
                    Sign In
                </button>
                <button 
                    onClick={() => { setModal({ title: 'Sign Up', content: <SignUpForm /> }) }} 
                    className="px-6 btn btn-sm min-h-10 btn-primary"
                >
                    Sign Up
                </button>
            </div>
            <Modal id={modalId} title={modalConfig.title}>
                {modalConfig.content}
            </Modal>
        </div>
    )
}