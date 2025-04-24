// components/InputField.jsx
const InputField = ({ label, name, value, onChange, type = "text", placeholder = "" }) => {
    return (
      <div className="mb-1">
        <label className="block text-sm font-medium mb-1" htmlFor={name}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    );
  };
  
  export default InputField;
  