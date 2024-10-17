import { useEffect, useState } from "react"
import {Header, Footer} from "./components/index.js"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice.js"
import { Outlet } from "react-router-dom"

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if(userData) {
                    dispatch(login({userData}))
                } else {
                    dispatch(logout())
                }
            })
        .finally(() => setLoading(false))
    }, [])

    if(loading) return null;

    return (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400"> 
            <div className="w-full block">
                <Header />
                <main>
                    TODO: //<Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default App
