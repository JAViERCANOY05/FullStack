import React from "react";
import Link from "next/link";
import { useState } from "react";
import SignAPI from "./api/signUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess, notifyWarning } from "./notifications";




const RegistartionForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


     const handleSubmit =  async(event : any )=>
    {

      event.preventDefault();

      const newUser = {
        name : name ,
        email : email ,
        password : password
      }

      try {
        const response = await SignAPI.signUp(newUser);
        if (response.message === "Account Successfully Created.") {

          console.log(response);
          notifySuccess(response.message);
           // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/'; // Replace '/login' with your actual login page URL
      }, 2000);

        } else {
          notifyError(response.message);

          console.log("Something Wrong !" , response);

        }
      } catch (error) {
        notifyError("Invalid email address or password.");

        console.log(error);
      }

    }

    const handleEmailChange = (event : any ) => {
      setEmail(event.target.value); 
    };
    const handlePasswordChange = (event : any ) => {
        setPassword(event.target.value); 
      };
      
      const handleNameChange = (event : any ) => {
        setName(event.target.value); 
      };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500 my-5">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                  value={name} 
                  onChange={handleNameChange} 
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={email} 
                  onChange={handleEmailChange} 
                />
              
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password} 
                  onChange={handlePasswordChange} 
                />
                <button onClick={handleSubmit} type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="./Login">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </a>
        
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default RegistartionForm;
