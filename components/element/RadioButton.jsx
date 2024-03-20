function RadioButton({ children, title, value, status, setStatus }) {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
