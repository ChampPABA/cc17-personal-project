function Input({
  placeholder,
  type = "text",
  autoComplete,
  error,
  value,
  onChange,
  name,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        name={name}
        className={`block w-full rounded-md px-3 py-1.5 border focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-ifcg-green-high focus:ring-ifcg-green-low"
        }`}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}

export default Input;
