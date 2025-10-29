import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingBag, FaUtensils } from "react-icons/fa"; // 🍴 logo icon

function Nav({ onSearch, cartCount = 0, cartItems = [], setCartItems }) {
  const [openCart, setOpenCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Quantity update
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, food_quantity: Math.max(1, item.food_quantity + delta) }
          : item
      )
    );

    const updatedItem = cartItems.find((i) => i.id === id);
    if (updatedItem) {
      setToast({
        show: true,
        message:
          delta > 0
            ? `Added 1 more ${updatedItem.name}`
            : `Removed 1 ${updatedItem.name}`,
      });
    }
  };

  // Remove item
  const removeItem = (id) => {
    const removedItem = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (removedItem) {
      setToast({ show: true, message: `${removedItem.name} removed from dish` });
    }
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.food_quantity,
    0
  );

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setToast({ show: true, message: "✅ Order successfully placed!" });
    setCartItems([]); // Clear cart after checkout
  };

  // Hide toast after 2 sec
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, message: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="w-full h-[100px] flex justify-between items-center px-5 md:px-8 relative">
      {/* Logo + Name (Left Side) */}
      <div className="flex items-center gap-3">
        <FaUtensils className="text-green-500 text-4xl animate-pulse" />
        <a
          href="/"
          className="text-3xl md:text-4xl font-extrabold text-green-500 tracking-wide"
        >
          FoodiHub
        </a>
      </div>

      {/* Search */}
      <form
        className="w-[35%] md:w-[70%] h-[60px] bg-white flex items-center px-6 gap-6 rounded-md shadow-xl text-[10px] md:text-[25px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <FaSearch className="w-[20px] h-[20px] text-green-500" />
        <input
          type="text"
          placeholder="Search items......."
          className="w-[100%] outline-none text"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </form>

      {/* Cart */}
      <div
        className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer"
      >
        <span className="absolute top-1 right-2 text-green-500 font-bold text-[18px]">
          {cartCount}
        </span>
        <FaShoppingBag
          className="w-[30px] h-[30px] text-green-500"
          onClick={() => setOpenCart(!openCart)} // Only toggle via icon click
        />

        {/* Mini Cart Dropdown */}
        {openCart && (
          <div className="absolute right-0 top-[70px] w-[380px] bg-white shadow-xl rounded-lg p-4 z-50">
            <h2 className="font-bold text-lg mb-3">Your Dish</h2>
            {cartItems.length === 0 ? (
              <p>No items added 😔</p>
            ) : (
              <>
                <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b pb-2 items-center"
                    >
                      {/* Item Image */}
                      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden">
                        <img
                          src={item.food_image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col gap-0.5">
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Category: {item.food_category}
                        </p>
                        <p className="text-sm text-gray-500">Type: {item.food_type}</p>
                        <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex flex-col gap-1 items-center">
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 bg-red-500 text-white rounded transition-transform duration-150 transform hover:scale-110 active:scale-95"
                          >
                            -
                          </button>
                          <span className="font-semibold">{item.food_quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 bg-green-500 text-white rounded transition-transform duration-150 transform hover:scale-110 active:scale-95"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="px-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-transform duration-150 transform hover:scale-110 active:scale-95 mt-1 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total & Checkout */}
                <div className="mt-3 border-t pt-2 font-bold flex justify-between">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-10 py-5 rounded shadow-lg z-50 text-lg font-semibold animate-bounce">
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
