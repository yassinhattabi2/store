import React, { useState, useEffect } from "react";
import "./style.css";
import AppBarComponent from "../../component/appbar";
import { Helmet } from "react-helmet";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images
  const images = [
    "https://images.prismic.io/travauxlib/2466e59e-4935-43eb-86c0-b4612a223b15_decoration%20salon.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=clip&q=80&rect=0%2C0%2C822%2C548&w=1500&h=1000",
    "https://img.freepik.com/photos-gratuite/design-interieur-salon-moderne_23-2150794714.jpg?semt=ais_hybrid",
    "https://fr.mycs.com/blog/wp-content/uploads/2023/11/FR_Inspiration_Salon_Moderne_Chic_Featured_Image-scaled.jpg",
  ];
 
 
  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="homepage" dir="ltr"> {/* Change dir to rtl for right-to-left */}
   
        <Helmet>
        <title>Home</title>
        
      </Helmet>
      <AppBarComponent />
      <div
        className="background"
        style={{ backgroundImage: `url(${images[currentSlide]})` }}
      ></div>

      {/* Overlay Content */}
      <div className="content">
        
        <h2>New Collection</h2>
        <br/>
        <br/>
        <p>
        Bienvenue sur notre site de vente de décorations intérieures, où chaque détail compte pour transformer votre espace en un véritable havre de paix. Découvrez notre large sélection d'articles de décoration modernes, élégants et uniques, conçus pour ajouter une touche personnelle à votre maison.
        </p>
        <button className="shop-now" ><a style={{textDecoration:'none',color:'white'}} href="/product">SHOP NOW</a></button>
      </div>
      
    </div>
  );
};

export default Home;
