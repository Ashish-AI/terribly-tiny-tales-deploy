import React from "react";
import App from "./App";
import imgsrc from "../src/images/res.svg";



const Home=()=>{

    return (
        <>

        <div className="main-container">

            <div className="left">
                 <App/>
            </div>
            <div className="right">
                <img  src={imgsrc}/>
            </div>

        </div>



        </>


    )



}

export default Home;