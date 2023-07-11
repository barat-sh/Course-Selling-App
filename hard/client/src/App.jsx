import './App.css'
import axios from "axios";
import { useEffect,useState } from 'react';


function App() {
  const [listofUsers,setListofUsers] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/problems").then((response)=>{
      setListofUsers(response.data)
    })
  },[])

  return (
    <div>
      {listofUsers.map((value,key)=>{
        return <h3 key={key}>{value.title+" -> "+value.difficulty+" -> "+value.link}</h3>
      })}
    </div>
  )
}

export default App