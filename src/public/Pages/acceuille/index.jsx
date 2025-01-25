
import { Helmet } from "react-helmet"
import EcommerceAppBar from "../../component/appbar"

import Home from "./Home"

export default function Acceuille(){
    return (
        <>
        <Helmet>
        <title>Home</title>
        
      </Helmet>
      <EcommerceAppBar/>
        <Home />
     
        
        </>
    )
}