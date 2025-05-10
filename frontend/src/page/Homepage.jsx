import React from 'react'
import Login from '../Auth/Login'

export default function Homepage() {
  return (
   <div>
  <nav className="fixed top-0 left-0 w-full flex flex-col md:flex-row items-center justify-between p-4 bg-[#6BD4E7] text-black z-50">
    <img src="bg1.png" alt="Logo" className="w-[50px] h-auto mb-2 md:mb-0" />
    <div className="flex space-x-4 text-lg font-bold">
      <a href="#" className="hover:underline">About Us</a>
      <a href="#" className="hover:underline">Products</a>
      <a href="#" className="hover:underline">Contact Us</a>
    </div>
    <div className="flex items-center space-x-2 mt-2 md:mt-0 md:mr-8">
     
      <button className="border-2 border-orange-500 text-white px-4 py-2 text-sm font-bold rounded hover:bg-orange-500 transition">Guest Mode</button>
    </div>
  </nav>
  <main className="pt-32 px-4 text-center">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">School Management System</h1>
      <p className="text-white text-base md:text-lg mt-6 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo eget lorem facilisis aliquet. Donec porta nisi id nisl suscipit, a fringilla libero vulputate.
      </p>
      <a href="/admin/register" className="text-white font-bold text-sm hover:underline block mt-4">Admin Register</a>
    </div>
    <div className="mt-10 flex justify-center">
      <img src="bg.png" alt="pupils" className="w-4/5 max-h-[80vh] object-cover" />
    </div>
  </main>
</div>

  )
}
