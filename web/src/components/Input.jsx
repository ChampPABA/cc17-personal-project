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
        className={`block w-full rounded-md border-0 px-3 py-1.5 text-ifcg-black-high shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ringblue300"
        }`}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}

export default Input;
