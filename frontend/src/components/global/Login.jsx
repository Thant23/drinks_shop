import Logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.user.role === "admin") {
        navigate("/admin");   // redirect admin
      } else {
        navigate("/products"); // redirect customer
      }
    } else {
      alert(data.error || "Login failed");
    }
  }
  return (
    <>
    <div className="mx-auto">
        <div className="flex align-items-center flex-col justify-center px-4 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={Logo} alt="Your Company" className="" />
          <h2 className="text-center text-xl font-bold tracking-tight text-black">
            Sign In to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div className="">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md px-3 border py-1.5 text-base text-black sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border px-3 py-1.5 text-base text-black sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-300 px-3 py-1.5 text-sm font-semibold text-teal-100 hover:bg-orange-200"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have account? <span></span> 
            <Link
              to="/register"
              className="font-semibold text-black hover:text-gray-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Login;
