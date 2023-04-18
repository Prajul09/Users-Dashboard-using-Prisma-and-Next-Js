import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from "../components/Login"
import Signup from "../components/Signup"
import Profile from '../components/Profile'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Login />
      <Signup />
      <Profile />
    </>
    
  )
}
