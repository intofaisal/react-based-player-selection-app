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
    <div className="flex gap-20 md:gap-0 flex-col-reverse md:flex-row justify-around p-4 pt-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Players</h2>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 auto place-items-center">
          {players.map((player) => (
            <div key={player.ID} className="w-[250px] h-[300px] bg-white rounded-lg pt-5 hover:scale-105 hover:duration-300">
              <img className="rounded-full bg-gradient-to-r from-green-500 to-green-700 bg-blend-multiply w-24 h-24 mb-2 mx-auto" src={player.Image} alt="" />
              <h3 className="text-xl font-medium">{player.Name}</h3>
              <p>{player.Role}</p>
              <p>{player.Age} Years</p>
              <p>${player.Price}</p>
              <button onClick={() => handleSelectPlayers(player)} className="mt-5 text-white font-bold bg-green-700 hover:bg-green-600 p-2 rounded-md">Add to Team</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-20 text-3xl font-bold">Selected Players</h2>
        <Cart selectedPlayers={selectedPlayers} totalCost={totalCost} remaining={remaining} handleRemovePlayer={handleRemovePlayer}></Cart>
      </div>
    </div>
  );
};

export default Home;
