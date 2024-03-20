function ProfileData({ data, editProfileHandler }) {
  return (
    <div className="profile-data">
      <div>
        <span>Name: </span>
        <p>{data.name}</p>
      </div>
      <div>
        <span>Last Name: </span>
        <p>{data.lastName}</p>
      </div>
      <div>
        <span>Email: </span>
        <p>{data.email}</p>
      </div>
      <button onClick={editProfileHandler}>Edit Profile</button>
    </div>
  );
}

export default ProfileData;
