import React from "react";
import Link from "next/link";
import { DocumentAddIcon } from "@heroicons/react/outline";
import AddNewForm from "./AddNewForm";
import Image from "next/image";
function FormsList() {
  const [forms, setForms] = React.useState([]);
  React.useEffect(() => {
    if (window.localStorage !== undefined) {
      const data = localStorage.getItem("forms");
      data !== null ? setForms(JSON.parse(data)) : null;
    }
  }, []);
  console.log(forms);
  return (
    <div className="flex justify-center items-center flex-col pt-40 text-center font-bold space-y-2">
      <h1 className="font-bold text-xl text-center md:text-3xl md:mt-12 mb-4">
        Forms List
      </h1>

      <div className="flex flex-wrap justify-center">
        {forms.map((form, i) => (
          <div
            key={i}
            className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
          >
            <Image
              src="/forms-head.jpg"
              alt=""
              width={150}
              height={150}
              className="h-20 m-6"
            />

            <Link href="/formBuilder">
              <a className="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500">
                {form.formTitle ? form.formTitle : <span>untitled Form</span>}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormsList;
