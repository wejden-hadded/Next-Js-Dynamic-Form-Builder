import React from "react";
import Link from "next/link";
import { DocumentAddIcon } from "@heroicons/react/outline";
function FormsList() {
  return (
    <div className="flex justify-center items-center flex-col pt-40 text-center font-bold space-y-2">
      <h1 className="font-bold text-xl text-center md:text-3xl md:mt-12 mb-4">
        Forms List
      </h1>

      <div className="flex flex-wrap justify-center">
        {/* <div className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52">
          <div className="place-content-center">
            <DocumentAddIcon width="128px" height="128px" />
          </div>

          <Link href="/formBuilder">
            <a className="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500">
              Add New Form
            </a>
          </Link>
        </div> */}

        <div className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52">
          <img src="images/email-icon.svg" alt="" className="h-20 m-6" />

          <a
            href="#"
            className="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500"
          >
            Know More
          </a>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52">
          <img src="images/chat-icon.svg" alt="" className="h-20 m-6" />

          <a
            href="#"
            className="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500"
          >
            Know More
          </a>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52">
          <img src="images/terminal-icon.svg" alt="" className="h-20 m-6" />

          <a
            href="#"
            className="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500"
          >
            Know More
          </a>
        </div>
      </div>
    </div>
  );
}

export default FormsList;
