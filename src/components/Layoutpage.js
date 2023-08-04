import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Footer from './footer/Footer'

const Layoutpage = () => {
  return (
    <>
    <div className="container-xxl bg-white p-0">
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default Layoutpage