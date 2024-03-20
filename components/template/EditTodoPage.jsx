import { useEffect, useState } from "react";

import { MdEdit } from "react-icons/md";

import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

import RadioButton from "../element/RadioButton";
import { useRouter } from "next/router";

function EditTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const editTodoHandler = async () => {
    const res = await fetch(`/api/edit/${router.query.todoId}`, {
      method: "POST",
      body: JSON.stringify({ title, status, description }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      router.push("/");
    }
  };

  const cancelEditHandler = () => {
    router.push("/");
  };

  useEffect(() => {
    fetchTodoDetails();
  }, []);

  const fetchTodoDetails = async () => {
    const res = await fetch(`/api/edit/${router.query.todoId}`);
    const data = await res.json();
    if (data.status === "success") {
      setTitle(data.data.title);
      setStatus(data.data.status);
      setDescription(data.data.description);
    }
  };

  return (
    <div className="add-form">
      <h2>
        <MdEdit />
        Edit Todo
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
        <div className="profile-form__button">
          <button onClick={editTodoHandler}>Edit Todo</button>
          <button onClick={cancelEditHandler} style={{ marginLeft: "5px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTodoPage;
