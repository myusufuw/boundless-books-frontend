import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4 overflow-auto h-[100vh] flex flex-col">
      <div>AppBar</div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  )
}

export default MainLayout
