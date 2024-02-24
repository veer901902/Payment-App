import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Home from '../Components/Home'

export default function Layout() {
  return (
    <>
    <Home />
    <Outlet/>
    </>
  )
}
