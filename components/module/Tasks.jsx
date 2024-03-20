import { RiMastodonLine } from "react-icons/ri";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

function Tasks({ data, back, next, fetchTodos }) {
  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };

  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <div className="task__button">
            <Link href={`/edit/${i._id}`}>
              <MdEdit />
            </Link>
            <Link href={`/details/${i._id}`}>
              <TbListDetails />
            </Link>
          </div>
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4>{i.title}</h4>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatus(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatus(i._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
