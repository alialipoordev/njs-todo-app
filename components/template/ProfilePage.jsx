import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import { useEffect, useState } from "react";
import ProfileData from "../module/ProfileData";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastName) {
      setData(data.data);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setData(data.data);
      setPassword("");
    }
  };

  const editProfileHandler = () => {
    setName(data.name);
    setLastName(data.lastName);
    setData(null);
  };

  const cancelHandler = () => {
    fetchProfile();
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {data ? (
        <ProfileData data={data} editProfileHandler={editProfileHandler} />
      ) : (
        <ProfileForm
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
        />
      )}
    </div>
  );
}

export default ProfilePage;
