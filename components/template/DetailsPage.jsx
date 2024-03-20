import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

function DetailsPage() {
  const { query } = useRouter();
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`/api/edit/${query.todoId}`)
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return (
    <div >
      <div className="profile-data">
        <button className="button__profile">
          <Link href="/">
            <IoMdArrowRoundBack />
          </Link>
        </button>
        <div>
          <span>Todo Name: </span>
          <p>{data?.title}</p>
        </div>
        <div>
          <span>Status: </span>
          <p>{data?.status}</p>
        </div>
        <div>
          <span>Description: </span>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
