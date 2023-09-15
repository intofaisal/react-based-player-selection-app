/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
import Cart from "../Cart/Cart";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const Home = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [totalCost, setTotalCost] = useState(0)
  const [remaining, setRemaining] = useState(40000)

  useEffect(() => {
    fetch("/players.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);


  const handleSelectPlayers = (player) => {
    const isExist = selectedPlayers.find((item) => item.ID == player.ID);
    if (isExist) {
      return Swal.fire(
        'Error!',
        'Player already in the team!',
        'error'
      )
    }
    else {
      let total = parseFloat(player.Price);
      selectedPlayers.forEach(item => {
        total += parseFloat(item.Price);
      });
      const totalRemaining = 400000 - total;
      if (totalRemaining < 0){
        return Swal.fire(
          'Error!',
          'Player budget exceeded',
          'error'
        )
      }
      else {
      setRemaining(totalRemaining);
      setTotalCost(total);
      setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  }

  const handleRemovePlayer = (player) => {
    console.log(player.ID);
    let total = 0;
    const newSetPlayers = selectedPlayers.filter(sportsman => sportsman.ID !== player.ID)
    setSelectedPlayers(newSetPlayers);
    const playerPrice = parseFloat(player.Price);
    setTotalCost(totalCost - playerPrice);
    setRemaining(remaining + playerPrice);
  }

  return (
    <div className="container">
      <div className="card-container">
        <h2>Players</h2>
        <div className="card-main">
          {players.map((player) => (
            <div key={player.ID} className="card">
              <img className="photo" src={player.Image} alt="" />
              <h3>{player.Name}</h3>
              <p>{player.Role}</p>
              <p>{player.Age} Years</p>
              <p>${player.Price}</p>
              <button onClick={() => handleSelectPlayers(player)} className="add-btn">Add to Team</button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-container">
        <h2>Selected Players</h2>
        <Cart selectedPlayers={selectedPlayers} totalCost={totalCost} remaining={remaining} handleRemovePlayer={handleRemovePlayer}></Cart>
      </div>
    </div>
  );
};

export default Home;
