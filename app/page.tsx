'use client'

import React, {useEffect, useState} from 'react';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [load, setLoad] = useState(true);

  const dummyLoad = async () => {
    await new Promise(resolve => setTimeout(resolve, 125));
    setLoad(false);
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    dummyLoad();
  }, [])
  return (
    <div className="flex w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className={`p-3 w-4/5 md:w-2/4 lg:w-1/5 m-auto bg-black/20 rounded-lg shadow-xl transition-opacity duration-1000 ${load ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-stone-50 text-center">Silahkan Masuk</h3>
        <form action="" className="mt-4">
          <label htmlFor="username" className="block my-3 text-sm font-medium text-gray-200">Username</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-200 bg-gray-200/40 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <FaRegUser className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              id="username" 
              className="rounded-none rounded-e-lg placeholder-gray-200 bg-gray-50/40 border text-gray-200 border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-gray-400 block flex-1 min-w-0 w-full text-sm p-2.5" 
              placeholder="Ozan" 
            />
          </div>

          <label htmlFor="password" className="block my-3 text-sm font-medium text-gray-200">Password</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-200 bg-gray-200/40 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <RiLockPasswordLine className="w-4 h-4" />
            </span>
            <input 
              required 
              type={isVisible ? 'text' : 'password'} 
              id="password" 
              className="rounded-none rounded-e-lg placeholder-gray-200 bg-gray-50/40 border text-gray-200 border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-gray-400 block flex-1 min-w-0 w-full text-sm p-2.5" 
              placeholder="*****" 
            />
          </div>

          <div className="flex">
            <button className="mt-5 mb-2 w-full lg:w-1/2 mx-auto group relative flex items-center justify-center overflow-hidden rounded-md p-0.5">
              <span className="absolute h-full w-full bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500"></span>
              <span className="relative z-10 rounded-md bg-white py-1.5 transition-all ease-out group-hover:bg-opacity-0 w-full flex items-center justify-center">
                <span className="relative bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text text-transparent group-hover:text-white">Login</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
