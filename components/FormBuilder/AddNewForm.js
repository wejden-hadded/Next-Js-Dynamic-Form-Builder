import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Switch } from "@headlessui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { useRouter } from "next/router";
function AddNewForm(props) {
  const [forms, setForms] = useState([
    {
      open: true,
      formQuestion: "What's your favorite meal?",
      formType: "radio",
      options: [{ optionText: "chicken" }, { optionText: "frites" }],
      required: false,
    },
  ]);
  const [formData, setFormData] = useState([
    {
      formTitle: "",
      formDescription: "",
      questions: forms,
    },
  ]);
  console.log(formData);
  const router = useRouter();
  function saveForm(e) {
    localStorage.setItem("forms", JSON.stringify(formData));
    router.push("/");
  }

  function changeTitle(text, i) {
    let titleForm = [...formData];
    titleForm[i].formTitle = text;
    setFormData(titleForm);
  }
  function changeDescription(text, i) {
    let titleForm = [...formData];
    titleForm[i].formDescription = text;
    setFormData(titleForm);
  }

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
    expandCloseAll();
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

    setForms(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...forms];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setForms(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function expandCloseAll() {
    let qs = [...forms];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setForms(qs);
  }

  function handleExpand(i) {
    let qs = [...forms];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
      console.log(i, j);
    }

    setForms(qs);
  }

  function formTemplates() {
    return forms.map((form, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div className="mb-4">
                <div className="w-full -mb-2">
                  <DragIndicatorIcon
                    style={{ transform: "rotate(-90deg)", color: "#DAE0E2" }}
                    fontSize="small"
                  />
                </div>
                <Accordion
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={form.open}
                >
                  <div className="mt-10 bg-gray-50 border-l-blue-500 py-6 px-4 rounded-lg border-l-4 border-solid">
                    <AccordionSummary
                      elevation={0}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      {!form.open ? (
                        <div className="flex justify-start items-start flex-col ml-2 pt-4 pb-4">
                          <span className="ml-0">
                            {i + 1}/ {form.formQuestion}
                          </span>
                          {form.formType === "select" ? (
                            <div className="flex justify-center items-center ml-3">
                              {" "}
                              <select
                                className="mb-4 ml-3 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border border-gray-300 rounded-md py-2 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-gray-500 focus:ring-1 sm:text-xs"
                                required={form.required}
                              >
                                {form.options.map((op, j) => (
                                  <option key={j} value={op.optionText}>
                                    {op.optionText}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : form.formType === "text" ? (
                            <input
                              className=" w-80 ml-2 h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                              placeholder="Option Text"
                              type="text"
                              // onChange={(e) => {
                              //   changeOptionValue(e.target.value, i, j);
                              // }}
                            />
                          ) : (
                            form.options.map((op, j) => (
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
                            ))
                          )}
                        </div>
                      ) : null}
                    </AccordionSummary>

                    {form.open ? (
                      <AccordionDetails>
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
                                  <input
                                    type={form.formType}
                                    className="blue-500"
                                  />
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

                        <div className=" mt-2 space-x-2 flex items-center justify-end">
                          <button
                            type="button"
                            className="cursor-pointer bg-gray-100 hover:bg-blue-500 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                              addOption(i);
                            }}
                          >
                            Add option
                          </button>
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
                              <Switch.Label className="mr-4">
                                Required
                              </Switch.Label>
                              <Switch
                                onChange={() => requiredQuestion(i)}
                                checked={form.required}
                                className={`${
                                  form.required ? "bg-blue-600" : "bg-gray-200"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                              >
                                <span
                                  className={`${
                                    form.required
                                      ? "translate-x-6"
                                      : "translate-x-1"
                                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                                />
                              </Switch>
                            </div>
                          </Switch.Group>
                        </div>
                      </AccordionDetails>
                    ) : null}
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
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
                value={formData.formTitle}
                onChange={(e) => {
                  changeTitle(e.target.value, 0);
                }}
              />
              <input
                className="h-10 box-border placeholder:italic placeholder:text-slate-400 required:border-red-500 block bg-white w-full border-b border-b-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                placeholder="Form Description"
                type="text"
                name="formDesc"
                value={formData.formDescription}
                onChange={(e) => {
                  changeDescription(e.target.value, 0);
                }}
              />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {formTemplates()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div>
              <button
                onClick={saveForm}
                className=" w-1/3 cursor-pointer bg-blue-500 hover:bg-blue-200 text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Save form{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewForm;
