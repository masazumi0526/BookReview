const InputField = ({ label, type, name, register, validation, error }) => {
    return (
      <div className="input-field">
        <label>{label}</label>
        <input type={type} {...register(name, validation)} />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    );
  };
  
  export default InputField;
  