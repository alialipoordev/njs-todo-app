function ProfileForm({
  name,
  setName,
  lastName,
  setLastName,
  password,
  setPassword,
  submitHandler,
  cancelHandler
}) {
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="profile-form__button">
        <button onClick={submitHandler}>Submit</button>
        <button onClick={cancelHandler} style={{marginLeft: "5px"}}>Cancel</button>
      </div>
    </>
  );
}

export default ProfileForm;
