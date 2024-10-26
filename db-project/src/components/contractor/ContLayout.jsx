import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer"
import '../../assets/styles/Layout.css'
import React from "react";
import ContHeader from "./ContHeader";

const ContLayout = () => {
    const [locationValue, setLocationValue] = useState('')

    useEffect(() => {
      setLocationValue(location.pathname)
    }, []);
  return (
    <>
        <div id="page-container">
          <div id="content-wrap">
            <ContHeader location={locationValue}/>
            <Outlet/>
            <Footer/>
          </div>
        </div>
    </>
  )
};

export default ContLayout;