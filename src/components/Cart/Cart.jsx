import PropTypes from 'prop-types';
import "./Cart.css";

const Cart = ({ selectedPlayers, totalCost, remaining, handleRemovePlayer }) => {
  return (
    <div>
      <p><b>Remaining Balance:</b> ${remaining}</p>
      {selectedPlayers.map((player) => (
        <div onClick={()=>handleRemovePlayer(player)} key={player.ID} className="player-cart-container">
          <img src={player.Image} alt="" />
          <h3>{player.Name}</h3>
          <p>${player.Price}</p>
        </div>
      ))}
      <p><b>Total Spending:</b> {totalCost}</p>
    </div>
  );
};

Cart.propTypes = {
    selectedPlayers: PropTypes.array.isRequired,
    totalCost: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
    handleRemovePlayer: PropTypes.func
}

export default Cart;

