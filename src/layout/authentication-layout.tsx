import { Outlet } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

const AuthenticationLayout = () => {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <main className="w-full h-[100vh] flex flex-row">
        <div className="flex-[3] bg-[url('https://images.unsplash.com/photo-1569728723358-d1a317aa7fba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover hidden lg:flex" />

        <div className="flex-[1] p-4 justify-center items-center h-full flex flex-col bg-[url('https://images.unsplash.com/photo-1569728723358-d1a317aa7fba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover lg:bg-none">
          <Outlet />
        </div>
      </main>
    </CookiesProvider>
  )
}

export default AuthenticationLayout
