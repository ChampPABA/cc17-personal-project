const bgMap = {
  red: "bg-ifcg-red-high hover:bg-ifcg-red-low focus-visible:outline-ifcg-red-high",
  green:
    "bg-ifcg-green-high hover:bg-ifcg-green-low focus-visible:outline-ifcg-red-high",
  gray: "bg-ifcg-gray-high hover:bg-ifcg-gray-low focus-visible:outline-ifcg-red-high",
};

const colorMap = {
  white: "text-ifcg-white",
  gray: "text-ifcg-gray-high",
};

const widthMap = {
  full: "w-full",
  40: "w-40",
};

export default function Button({
  children,
  bg = "red",
  color = "white",
  width,
  onClick,
}) {
  return (
    <button
      className={`flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${bgMap[bg]} ${colorMap[color]} ${widthMap[width]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
