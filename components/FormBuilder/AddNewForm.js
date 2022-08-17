import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import {
  CheckIcon,
  PlusCircleIcon,
  SelectorIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Accordion, AccordionSummary } from "@mui/material";
import { Listbox, Switch, Transition } from "@headlessui/react";

function AddNewForm() {
  const [forms, setForms] = useState([
    {
      open: true,

      formQuestion: "What's your favorite meal?",
      formType: "radio",
      options: [{ optionText: "chicken" }, { optionText: "frites" }],
      required: false,
    },
  ]);

  function changeQuestion(text, i) {
    let newQuest = [...forms];
    newQuest[i].formQuestion = text;
    setForms(newQuest);
    console.log(newQuest);
  }

  function addQuestionType(i, type) {
    let qsType = [...forms];

    qsType[i].formType = type;
    setForms(qsType);
    console.log(qsType);
  }

  function deleteQuestion(i) {
    let qs = [...forms];
    if (qs.length > 1) {
      qs.splice(i, 1);
    }
    setForms(qs);
  }

  function requiredQuestion(i) {
    let requiredQuest = [...forms];
    requiredQuest[i].required = !requiredQuest[i].required;
    console.log(requiredQuest[i].required + "" + i);
    setForms(requiredQuest);
  }

  function addAnotherQuestion() {
    setForms((forms) => [
      ...forms,
      {
        open: true,
        formId: 0,

        formQuestion: "Question",
        formType: "radio",
        options: [{ optionText: "Option 1" }],
        required: true,
      },
    ]);
  }

  function changeOptionValue(text, i, j) {
    var optionsOfQuestion = [...forms];
    optionsOfQuestion[i].options[j].optionText = text;

    setForms(optionsOfQuestion);
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...forms];
    if (optionsOfQuestion[i].options.length > 2) {
      optionsOfQuestion[i].options.splice(j, 1);
      setForms(optionsOfQuestion);
      console.log(i + "__" + j);
    }
  }
  function addOption(i) {
    var optionsOfQuestion = [...forms];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("Max  5 options ");
    }
    //console.log(optionsOfQuestion);
    setForms(optionsOfQuestion);
  }

  function formTemplates() {
    return forms.map((form, i) => (
      // <Accordion expanded={form.open} key={i}>
      //   <AccordionSummary
      //     elevation={0}
      //     style={{
      //       width: "100%",
      //       borderTop: "5px solid blue",
      //       backgroundColor: "#f7f7f7",
      //       padding: "30px 20px",
      //       borderRadius: "5px",
      //     }}
      //   >
      <div
        key={i}
        className="mt-10 bg-gray-50 border-l-blue-500 py-6 px-4 rounded-lg border-l-4 border-solid"
      >
        {!form.open ? (
          <div className="flex justify-start items-start flex-col ml-2 pt-4 pb-4">
            <span className="ml-0">
              {i + 1}/ {form.formQuestion}
            </span>
            {form.options.map((op, j) => (
              <div key={j}>
                <div className="flex justify-center items-center ml-3">
                  <input
                    required={form.required}
                    type={form.formType}
                    className="mr-1 required:border-red-500 checked:bg-blue-500 "
                  />
                  <label> {op.optionText} </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex justify-between items-baseline">
          <div className="w-full flex justify-start items-baseline">
            {" "}
            {i + 1}/
            <input
              className=" w-full mb-4 ml-1 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border border-gray-300 rounded-md py-2 pl-2  shadow-sm focus:outline-none focus:border-blue-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
              placeholder="Form Question"
              type="text"
              value={form.formQuestion}
              required={form.required}
              onChange={(e) => {
                changeQuestion(e.target.value, i);
              }}
            />
          </div>
          <select
            value={form.formType}
            onChange={(e) => addQuestionType(i, e.target.value)}
            className=" divide-y divide-gray-100 w-1/2 mb-4 ml-1 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border border-gray-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-gray-500 focus:ring-1 sm:text-xs"
          >
            <option value="text">Text Field</option>
            <option value="radio">Multiple choice</option>
            <option value="checkbox">Checkboxes</option>
            <option value="select">Dropdown Menu</option>
          </select>
        </div>
        {form.formType === "text" ? (
          <input
            value={form.options.optionText}
            className=" w-80 ml-2 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
            placeholder="Option Text"
            type="text"
            onChange={(e) => {
              changeOptionValue(e.target.value, i, j);
            }}
          />
        ) : (
          form.options.map((op, j) =>
            form.formType === "select" ? (
              <div
                key={j}
                className="flex ml-3 justify-between py-2 items-stretch"
              >
                <div className="flex justify-center items-center px-2 ">
                  <span> {j + 1}</span>
                  <input
                    value={op.optionText}
                    className=" w-auto ml-2 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                    placeholder="Option Text"
                    type="text"
                    required={form.required}
                    onChange={(e) => {
                      changeOptionValue(e.target.value, i, j);
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeOption(i, j);
                  }}
                >
                  <TrashIcon width="20px" height="20px" />
                </button>
              </div>
            ) : (
              <div
                key={j}
                className="flex ml-3 justify-between py-2 items-stretch"
              >
                <div className="flex justify-center items-center px-2 ">
                  <input type={form.formType} className="blue-500" />
                  <input
                    value={op.optionText}
                    className=" w-auto ml-2 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                    placeholder="Option Text"
                    type="text"
                    required={form.required}
                    onChange={(e) => {
                      changeOptionValue(e.target.value, i, j);
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    removeOption(i, j);
                  }}
                >
                  <TrashIcon width="20px" height="20px" />
                </button>
              </div>
            )
          )
        )}
        {form.formType !== "text" && form.options.length < 5 ? (
          <div className="flex ml-2 justify-between py-2 items-stretch">
            <div className="flex justify-center items-center px-2 ">
              {form.formType !== "select" ? (
                <input
                  type={form.formType}
                  className="ml-1 required:border-red-500 checked:bg-blue-500 "
                />
              ) : null}
              <label>
                <input
                  type="text"
                  className=" w-40 ml-2 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                  placeholder="Add Other"
                />
              </label>
            </div>
            <button
              type="button"
              className="cursor-pointer bg-gray-100 hover:bg-blue-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => {
                addOption(i);
              }}
            >
              Add option
            </button>{" "}
          </div>
        ) : (
          ""
        )}
        <div className=" mt-2 space-x-2 flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              addAnotherQuestion();
            }}
          >
            <PlusCircleIcon width="25px" height="25px" />
          </button>
          <button
            type="button"
            onClick={() => {
              deleteQuestion(i);
            }}
          >
            <TrashIcon width="25px" height="25px" />
          </button>
          <Switch.Group>
            <div className="flex items-center">
              <Switch.Label className="mr-4">Required</Switch.Label>
              <Switch
                onChange={() => requiredQuestion(i)}
                checked={form.required}
                className={`${
                  form.required ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    form.required ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>
      </div>
      //   </AccordionSummary>
      // </Accordion>
    ));
  }

  return (
    <div>
      <Navbar />
      <div className="h-full pb-8 flex justify-center items-center flex-col pt-40 text-center font-bold space-y-2">
        <div className="w-1/2 m-auto space-y-4">
          <div className="space-y-4">
            <div className="bg-gray-50 border-t-blue-500 py-8 px-6 rounded-lg border-t-4 border-solid">
              <input
                className="h-10 mb-3 box-border placeholder:italic  placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                placeholder="Form Title"
                type="text"
                name="formTitle"
              />
              <input
                className="h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                placeholder="Form Description"
                type="text"
                name="formDesc"
              />
            </div>

            {formTemplates()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewForm;
