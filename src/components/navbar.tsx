import BoundlessBooksLogo from "../assets/boundless-books.svg"
import CartLogo from "../assets/cart.svg"

const Navbar = () => {
  return (
    <div className=" bg-white h-[60px] py-4 px-3 shadow-md flex items-center fixed top-0 left-0 right-0 z-100">
      <div className=" container mx-auto flex flex-row justify-between">
        <img src={BoundlessBooksLogo} alt="boundless books logo" />
        <button>
          <img src={CartLogo} alt="cart logo" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
