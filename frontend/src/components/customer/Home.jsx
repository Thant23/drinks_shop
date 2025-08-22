import { useState, useEffect } from "react";
import Navbar from "../global/Navbar";
const API_URL = "http://localhost:5000/api/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = async (product) => {
    // Update local state
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Save to backend
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // replace with logged-in user ID
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      console.log("Cart updated:", data);
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  return (
    <>
      <div>
        <Navbar cartItems={cartItems} setCartItems={setCartItems} />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group">
                <img
                  src={`http://localhost:5000${product.image_url}`}
                  alt={product.name}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div className="flex flex-col justify-content-start items-start">
                    <p className="text-start">{product.name}</p>
                    <p className="mt-1 text-gray-500">{product.description}</p>
                  </div>
                  <p className="text-sm text-gray-900 text-start">
                    ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  type="submit"
                  className="mt-5 block w-full rounded-full px-2 py-2 text-center text-sm font-semibold text-black shadow-xs bg-orange-300 hover:bg-orange-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
