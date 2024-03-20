import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { BiMessageSquareAdd } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function Layout({ children }) {
  const {status,data} = useSession();

  const logOutHandler = () => {
    signOut()
  }

  return (
    <div className="container">
      <header>
        <p>Welcome {data?.user.email.split("@")[0].toUpperCase()}</p>
        {status === "authenticated" ? (
          <button onClick={logOutHandler}>
            Logout <FiLogOut />
          </button>
        ) : null}
      </header>
      <div className="container--main">
        <aside>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/">Todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
