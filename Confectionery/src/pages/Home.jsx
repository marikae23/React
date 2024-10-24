import React from "react";
import "../view/Home.css"; 
import Navbar from "../components/Navbar"; 
import frutaOmelete from "../assets/images/Fruit Omelette.png"; 
import morangoOmelete from "../assets/images/Strawberry Omelette.png";
import berries from "../assets/images/berries.png";

const images = [
  { src: frutaOmelete, alt: "Fruta Omelete", className: "frutaOmelete" },
  { src: morangoOmelete, alt: "Omelete de Morango", className: "morangoOmelete" },
  { src: berries, alt: "blueberries", className: "blueberries" },
  
];

const Home = () => {
  return (
    <div>
      <Navbar /> {/* Inclua a Navbar aqui */}
      <div className="content">
        <h1>Welcome to Choii Confectionery!</h1>
        <p>Discover our delicious Strawberry Omelette and more!</p>

        {/* Mapeia a array de imagens para renderizar cada uma com as classes apropriadas */}
        <div className="image-gallery">
          {images.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} className={image.className} />
          ))}
        </div>

        <a href="/store">Check out our store</a>
        <CircleBackground />
      </div>
    </div>
  );
};

const CircleBackground = () => {
  return <div className="circle"></div>;
};

export default Home;
