import Link from "next/link";
import { useState } from "react";
import LoginApi from "./api/loginApi";
import { useRouter } from "next/navigation"; // Correct import


export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await LoginApi.logIn(formData);
      if ( response.user.role == "user") {
        
        console.log("Login Successfully!" , response.user.role);
        router.push("./dashboard/userDashboard");
      } else  if (( response.user.role == "admin")){
        console.log("Login Successfully!" , response.user.role);
        router.push("./dashboard/adminDashBoard");
      }

    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 rounded-xl shadow-xl border-y-slate-700 bg-slate-200 lg:max-w-xl border-none py-20">
        <h1 className="text-3xl font-bold text-center text-white my-20  rounded-full border-2 p-2 bg-slate-500 ">
          JAViER
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              id="email"
              name="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Dont have an account?{" "}
          <Link
            href="./SignUp"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
