import { useEffect, useState } from "react"

export const Home  = () => {
    const [data,setData] = useState(null)
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async() => {
        const response = await fetch("http://localhost:3001/course/list")
        const jsonData = await response.json()
        console.log(jsonData)
        setData(jsonData)
    }
    return <div>
    {/* console.log({data}) */}
    </div>
}