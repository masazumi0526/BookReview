const InputField = ({ label, type, name, register, validation, error }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register(name, validation)} />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default InputField;
