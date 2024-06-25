import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"

const MainLayout = () => {
  return (
    <div className="overflow-auto h-[100vh] flex flex-col relative">
      {/* APP BAR */}
      <Navbar />

      {/* CONTENTS */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* FOOTER */}
      <div>Footer</div>
    </div>
  )
}

export default MainLayout
