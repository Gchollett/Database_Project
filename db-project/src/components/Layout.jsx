import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import Footer from "./Footer"
import '../assets/styles/Layout.css'
import React from "react";

const Layout = () => {
    const [locationValue, setLocationValue] = useState('')

    useEffect(() => {
      setLocationValue(location.pathname)
    });
  return (
    <>
        <div id="page-container">
          <div id="content-wrap">
            <Header location={locationValue}/>
            <Outlet/>
            <Footer/>
          </div>
        </div>
    </>
  )
};

export default Layout;