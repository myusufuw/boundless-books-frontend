import { Link } from "react-router-dom"
import BoundlessBooksLogo from "../assets/boundless-books.svg"

import { cookies } from "../utilities/auth"
import { useState } from "react"

const Navbar = () => {
  const [auth, setAuth] = useState(cookies.getAll())

  const handleSignOut = () => {
    cookies.remove("token")
    setAuth(cookies.getAll())
  }

  return (
    <nav className=" bg-white h-[60px] py-4 px-3 shadow-md flex items-center fixed top-0 left-0 right-0 z-10">
      <div className=" container mx-auto flex flex-row justify-between">
        <img src={BoundlessBooksLogo} alt="boundless books logo" />

        {auth.token && (
          <div className="flex flex-row items-center gap-4">
            <Link to="/cart">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <button
              onClick={handleSignOut}
              className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center"
            >
              Sign Out
            </button>
          </div>
        )}

        {!auth.token && (
          <div>
            <Link to="/sign-in">
              <button className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
