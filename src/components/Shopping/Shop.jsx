import React, { useState, useEffect } from "react";
import ItemModal from "./ItemModal";
import { ClipLoader } from "react-spinners"; 
import { getProducts } from "../Data/AsyncMock";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  
  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#e6e8eb] text-center mb-8">Tienda</h1>

      
      <div className="text-center mb-8">
        <button onClick={() => setSelectedCategory("Todos")} className="px-4 py-2 mx-2 bg-[#5f81a9] text-white rounded-md">Todos</button>
        <button onClick={() => setSelectedCategory("Minimalista")} className="px-4 py-2 mx-2 bg-[#5f81a9] text-white rounded-md">Minimalista</button>
        <button onClick={() => setSelectedCategory("Gamer")} className="px-4 py-2 mx-2 bg-[#5f81a9] text-white rounded-md">Gamer</button>
        <button onClick={() => setSelectedCategory("Contemporáneo")} className="px-4 py-2 mx-2 bg-[#5f81a9] text-white rounded-md">Contemporáneo</button>
        <button onClick={() => setSelectedCategory("Moderno")} className="px-4 py-2 mx-2 bg-[#5f81a9] text-white rounded-md">Moderno</button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#5f81a9" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#131518] rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 w-[300px]"
            >
              <img
                src={product.img}
                alt={product.name}
                className="h-40 w-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-[#e6e8eb]">{product.name}</h3>
              <p className="text-[#aebbc9]">{product.price}</p>
              <p className="text-[#aebbc9]">{product.stock}</p>
              <button
                onClick={() => handleBuyClick(product)}
                className="w-[100%] mt-4 px-4 py-2 bg-[#5f81a9] text-white rounded-md hover:bg-[#5f81a9]/80"
              > 
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ItemModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Shop;