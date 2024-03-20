import EditTodoPage from "@/components/template/EditTodoPage";
import { getSession } from "next-auth/react";

export default function EditTodo() {
  return <EditTodoPage />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return {
    props: {},
  };
}