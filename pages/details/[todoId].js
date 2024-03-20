import DetailsPage from "@/components/template/DetailsPage";
import { getSession } from "next-auth/react";

export default function DetailsTodo() {
  return <DetailsPage />;
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