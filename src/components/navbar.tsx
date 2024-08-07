import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import BoundlessBooksLogo from "../assets/boundless-books.svg"

import { useContext } from "react"
import { MainContext } from "../context/main-context"
import { cookies } from "../utilities/auth"

const Navbar = () => {
  const { auth, setAuth } = useContext(MainContext)

  const handleSignOut = () => {
    cookies.remove("token")
    setAuth({})
  }

  return (
    <nav className=" bg-white h-[60px] p-4 shadow-md flex items-center fixed top-0 left-0 right-0 z-10">
      <div className=" container mx-auto flex flex-row justify-between">
        <Link to="/">
          <img src={BoundlessBooksLogo} alt="boundless books logo" />
        </Link>

        {auth.token && (
          <div className="flex flex-row items-center gap-4">
            <Link to="/cart">
              <FaShoppingCart style={{ width: 30, height: 30 }} />
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
