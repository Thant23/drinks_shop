import { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingCart, FaBars } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/products"; 

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [orders] = useState([
    {
      id: 1,
      user: "customer1@gmail.com",
      items: [
        { name: "Coca Cola", quantity: 2 },
        { name: "Pepsi", quantity: 1 },
      ],
      totalAmount: 74,
      createdAt: "2025-08-22",
    },
  ]);

  // Fetch products from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const openModalForCreate = () => {
    setEditingProduct(null);
    setSelectedImage(null);
    setModalOpen(true);
  };

  const openModalForEdit = (product) => {
    setEditingProduct(product);
    setSelectedImage(null);
    setModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    if (form.image.files[0]) {
      formData.append("image", form.image.files[0]);
    }

    if (editingProduct) {
      // Update
      const res = await fetch(`${API_URL}/${editingProduct._id}`, {
        method: "PUT",
        body: formData,
      });
      const updated = await res.json();
      setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
    } else {
      // Create
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
    }

    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && <h1 className="text-2xl font-bold">Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars className="text-white text-xl" />
          </button>
        </div>
        <ul>
          <li
            className={`mb-4 cursor-pointer flex items-center space-x-2 ${
              activeTab === "products" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            <FaBoxOpen />
            {sidebarOpen && <span>Products</span>}
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <button
                onClick={openModalForCreate}
                className="bg-gray-500 px-3 py-1 rounded text-white hover:bg-gray-400"
              >
                Create Product
              </button>
            </div>

            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Created At</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2">${product.price}</td>
                    <td className="border px-4 py-2">
                      {product.image_url && (
                        <img
                          src={`http://localhost:5000${product.image_url}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2">{product.createdAt}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => openModalForEdit(product)}
                        className="bg-gray-500 px-2 py-1 rounded text-white hover:bg-gray-400"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Items</th>
                  <th className="border px-4 py-2">Total Amount</th>
                  <th className="border px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.user}</td>
                    <td className="border px-4 py-2">
                      {order.items
                        .map((item) => `${item.name} (x${item.quantity})`)
                        .join(", ")}
                    </td>
                    <td className="border px-4 py-2">${order.totalAmount}</td>
                    <td className="border px-4 py-2">{order.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Update Product" : "Create Product"}
            </h2>
            <form onSubmit={handleSaveProduct} className="space-y-3">
              <input
                name="name"
                defaultValue={editingProduct?.name || ""}
                placeholder="Product Name"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                name="description"
                defaultValue={editingProduct?.description || ""}
                placeholder="Description"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                name="price"
                type="number"
                defaultValue={editingProduct?.price || ""}
                placeholder="Price"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full border px-2 py-1 rounded"
              />
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-400"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;