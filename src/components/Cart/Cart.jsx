import PropTypes from 'prop-types';
import "./Cart.css";

const Cart = ({ selectedPlayers, totalCost, remaining, handleRemovePlayer }) => {
  return (
    <div>
      <p className='bg-green-200 rounded-lg py-2 mb-5'><b>Remaining Balance:</b> ${remaining}</p>
      {selectedPlayers.map((player) => (
        <div key={player.ID} className="flex items-center gap-2 bg-white text-green rounded-md p-3 mb-5">
          <img className='w-12 h-12 bg-yellow-500 rounded-full' src={player.Image} alt="" />
          <h3 className='text-xl text-left'>{player.Name}</h3>
          <p>${player.Price}</p>
          <img onClick={()=>handleRemovePlayer(player)} className='ml-auto w-8 h-8 cursor-pointer hover:bg-gray-300 hover:rounded-full' src="https://i.ibb.co/CQZ70qq/delete.png" alt="" />
        </div>
      ))}
      <p className='bg-green-200 rounded-lg py-2'><b>Total Spending:</b> {totalCost}</p>
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

