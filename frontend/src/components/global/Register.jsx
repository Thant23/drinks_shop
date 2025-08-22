import Logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        alert("Registration successful! Please login.");
        navigate("/"); // redirect to login page
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex align-items-center flex-col justify-center px-4 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={Logo} alt="Your Company" className="" />
        <h2 className="text-center text-xl font-bold tracking-tight text-black">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-left text-sm font-medium leading-6 text-black"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md px-3 border py-1.5 text-base text-black sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-medium leading-6 text-black"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md px-3 border py-1.5 text-base text-black sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-black"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border px-3 py-1.5 text-base text-black sm:text-sm"
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-300 px-3 py-1.5 text-sm font-semibold text-teal-100 hover:bg-orange-200"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have account?{" "}
          <Link to="/" className="font-semibold text-black hover:text-gray-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
