import { useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store"
import { fetchLogin } from "../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { user } = useAppSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
    if (!user?._id) return
    navigate('/votes')
  }, [user]);

  useEffect(() => {
    if (user?._id) {
        navigate('/votes')
    }
  }, []);
  
  return (
    <div>
        <input 
        type="text" 
        placeholder="user name" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        />

        <input 
        type="password" 
        placeholder="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />

        <button onClick={ ()  => dispatch(fetchLogin({username, password}))}  >Login</button>
      
    </div>
  )
}
