import React from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";

function Card({ name, id, price, type, image, onAdd, added }) {
  return (
    <div className="w-[280px] h-[400px] bg-white p-4 rounded-lg flex flex-col gap-3 shadow-2xl hover:border-4 border-green-300 transition-all duration-300">
      <div className="w-[100%] h-[60%] overflow-hidden rounded-lg">
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>

      <div className="text-2xl font-semibold">{name}</div>

      <div className="w-full flex justify-between items-center">
        <div className="text-lg font-bold text-green-500">Rs {price}/-</div>
        <div className="flex justify-center items-center gap-2 text-green-500 text-lg font-semibold">
          {type === "veg" ? <LuLeafyGreen /> : <GiChickenOven />}{" "}
          <span>{type}</span>
        </div>
      </div>

      <button
        onClick={onAdd}
        disabled={added}
        className={`w-full text-white rounded-lg p-3 font-semibold transition-all duration-300 transform ${
          added
            ? "bg-gray-400 cursor-not-allowed scale-100"
            : "bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95"
        }`}
      >
        {added ? "Added" : "Add to Dish"}
      </button>
    </div>
  );
}

export default Card;
