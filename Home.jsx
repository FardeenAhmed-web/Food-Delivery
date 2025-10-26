import React, { useState } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import { food_items } from "../food";

function Home() {
  const [cate, setCate] = useState(food_items);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const categories = [
    { name: "All", icon: "🍽️" },
    { name: "Breakfast", icon: "🥞" },
    { name: "Soups", icon: "🥣" },
    { name: "Pasta", icon: "🍝" },
    { name: "Main_Course", icon: "🍛" },
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
  ];

  function applyFilters(selectedCat = activeCat, searchValue = search) {
    let filteredList = [...food_items];
    if (selectedCat !== "All") {
      filteredList = filteredList.filter(
        (item) =>
          item.food_category.toLowerCase() === selectedCat.toLowerCase()
      );
    }
    if (searchValue.trim() !== "") {
      filteredList = filteredList.filter((item) =>
        item.food_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setCate(filteredList);
  }

  function filter(category) {
    setActiveCat(category);
    applyFilters(category, search);
  }

  function handleSearch(value) {
    setSearch(value);
    applyFilters(activeCat, value);
  }

  function addToCart(item) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, food_quantity: i.food_quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, food_quantity: 1 }];
      }
    });
  }

  return (
    <div className="bg-slate-300 min-h-screen">
      <Nav
        onSearch={handleSearch}
        cartCount={cart.length}
        cartItems={cart}
        setCartItems={setCart}
      />

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => filter(item.name)}
            className={`w-[120px] h-[125px] flex flex-col items-center justify-center font-bold rounded-xl shadow-xl cursor-pointer transition-all duration-200 ${
              activeCat === item.name
                ? "bg-green-300 scale-105"
                : "bg-white hover:bg-green-200"
            }`}
          >
            <span className="text-3xl">{item.icon}</span>
            {item.name.replace("_", " ")}
          </div>
        ))}
      </div>

      {/* Food Cards */}
      <div className="flex flex-wrap gap-5 pt-8 justify-center items-center">
        {cate.length > 0 ? (
          cate.map((item) => {
            const isAdded = cart.some((c) => c.id === item.id);
            return (
              <Card
                key={item.id}
                name={item.food_name}
                id={item.id}
                image={item.food_image}
                price={item.price}
                type={item.food_type}
                onAdd={() => addToCart(item)}
                added={isAdded}
              />
            );
          })
        ) : (
          <p className="text-lg font-semibold text-gray-700">No items found 😔</p>
        )}
      </div>
    </div>
  );
}

export default Home;
