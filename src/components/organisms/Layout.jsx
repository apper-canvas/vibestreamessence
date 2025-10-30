import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout