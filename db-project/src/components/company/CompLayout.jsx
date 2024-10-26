import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer"
import '../../assets/styles/Layout.css'
import React from "react";
import CompHeader from "./CompHeader";

const CompLayout = () => {
    const [locationValue, setLocationValue] = useState('')

    useEffect(() => {
      setLocationValue(location.pathname)
    });
  return (
    <>
        <div id="page-container">
          <div id="content-wrap">
            <CompHeader location={locationValue}/>
            <Outlet/>
            <Footer/>
          </div>
        </div>
    </>
  )
};

export default CompLayout;