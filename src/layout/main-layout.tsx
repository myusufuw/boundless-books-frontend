import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { MainContext } from "../context/main-context"
import { cookies } from "../utilities/auth"

const MainLayout = () => {
  const auth = cookies.getAll()
  const { setAuth } = useContext(MainContext)

  useEffect(() => {
    if (auth.token) setAuth(auth)
  }, [])

  return (
    <div className="overflow-auto h-[100vh] flex flex-col relative px-4">
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
