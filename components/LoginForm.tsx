"use client"

import React, { FormEvent, useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { AlertItem } from '../app/interfaces';
import Alert from './Alert';
import { getUser } from '../lib/userActions';

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [load, setLoad] = useState(true);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await getUser(formData);
    setPending(false);

    if (!result.isSuccess) {
      const errorAlert: AlertItem = {
        id: Date.now(),
        type: 'error',
        message: result.err as string,
      };

      setAlerts([...alerts, errorAlert]);
      setTimeout(() => {
        setAlerts((currentAlerts) =>
          currentAlerts.filter((alert) => alert.id !== errorAlert.id)
        );
      }, 5000);
    }
  };

  const removeAlert = (id: number) => {
    setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== id));
  };

  const dummyLoad = async () => {
    await new Promise(resolve => setTimeout(resolve, 125));
    setLoad(false);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    dummyLoad()
  }, []);

  return (
    <div className="flex w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="fixed top-0 right-0 m-4 w-full max-w-sm z-10">
        {alerts.map((alert) => (
          <Alert
            key = {alert.id}
            type = {alert.type}
            message = {alert.message}
            onClose = {() => removeAlert(alert.id)}
          />
        ))}
      </div>
      <div className={`p-3 w-4/5 md:w-2/4 lg:w-1/4 m-auto bg-black/20 rounded-lg shadow-xl transition-opacity duration-1000 ${load ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-stone-50 text-center">Silahkan Masuk</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="username" className="block my-3 text-sm font-medium text-gray-200">Username</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-200 bg-gray-200/40 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <FaRegUser className="w-4 h-4" />
            </span>
            <input
              required
              type="text" 
              id="username"
              name="username"
              className="rounded-none rounded-e-lg placeholder-gray-200 bg-gray-50/40 border text-gray-200 border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-gray-400 block flex-1 min-w-0 w-full text-sm p-2.5" 
              placeholder="ozan"
            />
          </div>

          <label htmlFor="password" className="block my-3 text-sm font-medium text-gray-200">Password</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-200 bg-gray-200/40 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <RiLockPasswordLine className="w-4 h-4" />
            </span>
            <div className="relative w-full">
              <input 
                required 
                type={isVisible ? 'text' : 'password'} 
                id="password"
                name="password"
                className="rounded-none rounded-e-lg placeholder-gray-200 bg-gray-50/40 border text-gray-200 border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-gray-400 block flex-1 min-w-0 w-full text-sm p-2.5" 
                placeholder="*****"
              />
              <span
                onClick={toggleVisibility}
                className="absolute top-0 end-0 p-2.5 text-gray-200"
              >
                {isVisible ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
              </span>
            </div>
          </div>

          <div className="flex">
            <button type="submit" className="mt-5 mb-2 w-full lg:w-1/2 mx-auto group relative flex items-center justify-center overflow-hidden rounded-md p-0.5" disabled={pending}>
              <span className="absolute h-full w-full bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500"></span>
              <span className="relative z-10 rounded-md bg-white py-1.5 transition-all ease-out group-hover:bg-opacity-0 w-full flex items-center justify-center">
                <span className="relative bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text text-transparent group-hover:text-white">{pending ? "Loading..." : "Login"}</span>
              </span>
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}