import { Navigate, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Statistics from './components/pages/Statistics'
import Votes from './components/pages/Votes'
import { socket } from './main'
import { useEffect } from 'react'
import { useAppDispatch } from './redux/store'
import { fetchCandidates } from './redux/slices/candidatesSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
  })

    socket.on("newVoteHasOccured", () => {
      dispatch(fetchCandidates())
  })
  
  }, [])
  

  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='votes' element={<Votes />} />
        <Route path='statistics' element={<Statistics />} />
        <Route path='/' element={<Navigate to="/votes" />} />
      </Routes>
    </div>
  )
}

export default App
