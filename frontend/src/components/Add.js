import React, { useState } from "react";
import axios from "axios";
import CustomInput from "./CustomInput";
import { ToastContainer, toast } from 'react-toastify';


export const Add = () => {

  const [documentNo, setDocumentNo] = useState('');
  const [appSerialNumber, setAppSerialNumber] = useState('');
  const [priorityDate, setPriorityDate] = useState('');
  const [fileDate, setFileDate] = useState('');
  const [agent, setAgent] = useState('');
  const [cpcClassFirst, setCpcClassFirst] = useState('');
  const [title, setTitle] = useState('');
  const [assigneeUltimate, setAssigneeUltimate] = useState('');

  const submitHandler = async (event) => {
    // console.log("hello world!");
    // console.log(documentNo, appSerialNumber, priorityDate, fileDate,agent,cpcClassFirst,title,assigneeUltimate);
    event.preventDefault();
    if (
      !documentNo ||
      !appSerialNumber ||
      !priorityDate ||
      !fileDate ||
      !agent ||
      !cpcClassFirst ||
      !title ||
      !assigneeUltimate
    ) {
      toast.warn('Please enter all required fields');
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://sigvitas-data-projects.vercel.app/api/data/add-data",
        {
          documentNo,
          appSerialNumber,
          priorityDate,
          fileDate,
          agent,
          cpcClassFirst,
          title,
          assigneeUltimate,
        },
        config
      );
      console.log(data);
      toast.success(`Data added Successfully`);
    } catch (error) {
      toast.warn(`Invalid Credentials`);
    }
  };

  return (
    <>
      <div className="wrapper">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <ToastContainer />
        <h3 className="mb-4 title">Add Data</h3>
        <div className="data-card">
          <form action="" className='d-flex flex-column gap-10' onSubmit={submitHandler}>
            <CustomInput
              type="text"
              name="documentNo"
              placeholder="Enter Document No"
              onChange={(e) => setDocumentNo(e.target.value)}
            />
            <CustomInput
              type="text"
              name="appSerialNumber"
              placeholder="Enter App Serial Number"
              onChange={(e) => setAppSerialNumber(e.target.value)}
            />
            <CustomInput
              type="text"
              name="priorityDate"
              placeholder="Enter Priority Date (DD-MM-YYYY)"
              onChange={(e) => setPriorityDate(e.target.value)}
            />
            <CustomInput
              type="text"
              name="fileDate"
              placeholder="Enter File Date (DD-MM-YYYY)"
              onChange={(e) => setFileDate(e.target.value)}
            />
            <CustomInput
              type="text"
              name="agent"
              placeholder="Enter Agent"
              onChange={(e) => setAgent(e.target.value)}
            />
            <CustomInput
              type="text"
              name="cpcClassFirst"
              placeholder="Enter CPC Class (First)"
              onChange={(e) => setCpcClassFirst(e.target.value)}
            />
            <CustomInput
              type="text"
              name="title"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <CustomInput
              type="text"
              name="assigneeUltimate"
              placeholder="Enter Assignee Ultimate"
              onChange={(e) => setAssigneeUltimate(e.target.value)}
            />
            <div>
              <div className='mt-3 d-flex justify-content-center'>
                <button className='button border-0 rounded-button w-100 fs-6' type='submit'>Add Data</button>
              </div>
            </div>
          </form>
        </div>
      </div>



    </>
  );
}
