import React, { useState, useEffect } from 'react';
import Card from './Card';

// Importa las imágenes directamente
import img1 from '../components/imagenes/img1.png';
import img2 from '../components/imagenes/img2.png';
import img3 from '../components/imagenes/img3.png';
import img4 from '../components/imagenes/img4.png';
import img5 from '../components/imagenes/img5.png';
import img6 from '../components/imagenes/img6.png';

const Board = () => {
  const [cartas, setCartas] = useState(generateShuffledCards());
  const [cartaVolteo, setCartaVolteo] = useState([]); // Cartas volteadas actualmente
  const [cartasIguales, setCartasIguales] = useState([]); // Cartas emparejadas
  const [gameOver, setGameOver] = useState(false); // Estado de fin de juego

  // Generar cartas mezcladas
  function generateShuffledCards() {
    const imagenCarta = [img1, img2, img3, img4, img5, img6]; 
    const cartas = imagenCarta.flatMap((image, index) => [
      { id: `img${index + 1}_1`, name: `img${index + 1}`, image }, 
      { id: `img${index + 1}_2`, name: `img${index + 1}`, image },
    ]);
    return shuffleArray(cartas);
  }

  // Función para mezclar las cartas
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Manejo del clic en una carta
  const handleCardClick = (card) => {
    if (cartaVolteo.length === 2 || cartaVolteo.includes(card.id) || cartasIguales.includes(card.name)) {
      return;
    }

    const cartasVuelta = [...cartaVolteo, card.id];
    setCartaVolteo(cartasVuelta);

    if (cartasVuelta.length === 2) {
      const [idcarta1, idCarta2] = cartasVuelta;
      const primeraCarta = cartas.find((c) => c.id === idcarta1);
      const segundaCarta = cartas.find((c) => c.id === idCarta2);

      if (primeraCarta.name === segundaCarta.name) {
        setCartasIguales((prev) => [...prev, primeraCarta.name]);
        setCartaVolteo([]);
      } else {
        setTimeout(() => {
          setCartaVolteo([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cartasIguales.length === cartas.length / 2) {
      setGameOver(true);
    }
  }, [cartasIguales, cartas]);

  return (
    <div className="board">
      {cartas.map((card) => {
        const isFlipped = cartaVolteo.includes(card.id) || cartasIguales.includes(card.name);
        const isClickable = !cartasIguales.includes(card.name) && cartaVolteo.length < 2;
        const handleClick = isClickable ? () => handleCardClick(card) : () => {};
  
        return (
          <Card
            key={card.id}
            card={card}
            onClick={handleClick}
            isFlipped={isFlipped}
          />
        );
      })}
      {gameOver && <div className="game-over">¡Juego terminado!</div>}
    </div>
  );
  
};

export default Board;







