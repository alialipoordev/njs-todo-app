import ProfilePage from "@/components/template/ProfilePage";
import { getSession } from "next-auth/react";

export default function Profile() {
  return <ProfilePage />;
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
