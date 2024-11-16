import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect, useState } from "react";

export default function Header() {
    const { currentUser} = useSelector((state)=>state.user)
    const [searchTerm , setSearchTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const urlParams =new URLSearchParams(window.location.search)
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)

    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFormUrl = urlParams.get('searchTerm');
        if(searchTermFormUrl){
            setSearchTerm(searchTermFormUrl)
        }
    },[location.search])

  return (
    <header className="bg-sky-200  p-2 sm:px-4 sm:py-2 "> 
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to={'/'}>
                <img src={logo} alt="logo" className="h-8 sm:h-10" />
            </Link>


            <form onSubmit={handleSubmit} className="bg-sky-100 p-2 rounded-lg flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className="bg-transparent focus:outline-none text-slate-700 w-28 sm:w-64"
                />
                <button type="sumit">
                    <FaSearch className="text-sky-300" />
                </button>
            </form>


            <ul className="flex gap-4 items-center">
                <Link to={'/'}>
                    <li className="hidden sm:inline text-sky-700 hover:text-sky-800 cursor-pointer hover:font-medium transition-all duration-300">
                        Home
                    </li>
                </Link>
                <Link to={'/about'}>
                    <li className="hidden sm:inline text-sky-700 hover:text-sky-800 cursor-pointer hover:font-medium transition-all duration-300">
                        About
                    </li>
                </Link>
                {
                    currentUser ? (
                        <Link to={'/profile'}>
                            <img src={currentUser.avatar} alt="profile image" className="h-8 w-8 object-cover rounded-full"/>
                        </Link>
                    ):(
                        <Link to={'/sign-in'}>
                            <li className=" text-sky-700 hover:text-sky-800 cursor-pointer hover:font-medium transition-all duration-300">
                                Sign in
                            </li>
                        </Link>
                    )
                }
                
        </ul>
        </div> 
    </header>
  );
}
