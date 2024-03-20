import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

import RadioButton from "../element/RadioButton";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");


  const addTodoHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status, description }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      setDescription("");
      toast.success("Todo Added!");
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            title="Todo"
            value="todo"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            title="In Progress"
            value="inProgress"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            title="Review"
            value="review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            title="Done"
            value="done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addTodoHandler}>Add Todo</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodoPage;
