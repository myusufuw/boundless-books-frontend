import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

const MainLayout = () => {
  return (
    <div className="overflow-auto h-[100vh] flex flex-col relative">
      {/* APP BAR */}
      <Navbar />

      {/* CONTENTS */}
      <main className="flex-1 pt-[82px]">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default MainLayout
