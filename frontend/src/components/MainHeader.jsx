import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxSpeakerLoud } from "react-icons/rx";
import { TiThMenuOutline } from "react-icons/ti";
import { IoSunnyOutline } from "react-icons/io5";

export default function MainHeader() {
  return (
    <>
      <div className="bg-blue-950  hidden  text-white p-3 lg:flex justify-between items-center text-sm">
        <span>
          Every role has different sets of features. Login as another role and
          check them.
        </span>
        {/* <button className="text-red-500">✖</button> */}
      </div>
      <div className="bg-white te p-3 h-[10vh] lg sticky top-0  flex justify-end items-center text-sm shadow-gray-100 shadow ">
        <ul className=" flex justify-end space-x-7 items-center w-full lg:w-2/4">
          <li>
            <IoMdNotificationsOutline className="text-2xl " />
          </li>
          <li>
            <RxSpeakerLoud className="text-2xl " />
          </li>
          <li>
            <TiThMenuOutline className="text-2xl " />
          </li>
          <li>
            <IoSunnyOutline className="text-2xl " />
          </li>
          <li className="w-7 h-7 rounded-full bg-sky-100 flex justify-center items-center">
            D
          </li>
        </ul>
      </div>
    </>
  );
}
