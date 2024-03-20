import AddTodoPage from "@/components/template/AddTodoPage";
import { getSession } from "next-auth/react";

export default function AddTodo({ session }) {
  return <AddTodoPage session={session} />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return {
    props: {},
  };
}
