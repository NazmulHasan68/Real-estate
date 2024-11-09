import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className="bg-sky-200  p-2 sm:px-4 sm:py-2 "> 
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to={'/'}>
                <img src={logo} alt="logo" className="h-8 sm:h-10" />
            </Link>
            <form className="bg-sky-100 p-3 rounded-lg flex items-center">
                <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-28 sm:w-64"
                />
                <FaSearch className="text-sky-300" />
            </form>
            <ul className="flex gap-4">
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
                <Link to={'/sign-in'}>
                    <li className=" text-sky-700 hover:text-sky-800 cursor-pointer hover:font-medium transition-all duration-300">
                        Sign in
                    </li>
                </Link>
        </ul>
        </div> 
    </header>
  );
}
