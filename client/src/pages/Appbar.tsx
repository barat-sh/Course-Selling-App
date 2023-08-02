import {useNavigate} from "react-router-dom"

export const Appbar = () =>{
    const navigate = useNavigate()
    return <>
    <nav className="bg-gray-900">
        <div className="container px-12 min-w-full h-20 flex justify-between items-center">
            <button className="text-white text-2xl font-bold" onClick={()=>{
                navigate("/")
            }}>Home</button>
            <div>
                <button className="text-lime-600 font-bold mx-2" onClick={()=>{
                    navigate("/login")
                }}>Login</button>
                <button className="text-white font-bold mx-2" onClick={()=>{
                    navigate("/signup")
                }}>signup</button>
            </div>
        </div>
    </nav>
    </>
}