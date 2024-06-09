import { LoaderIcon } from "../icons";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-white z-30 opacity-40">
        <div className="fixed inset-0 z-40 flex justify-center items-center">
          <LoaderIcon className=" fill-ifcg-red-low animate-spin" />
          <p className="ml-2 text-ifcg-gray-high">Loading...</p>
        </div>
      </div>
    </>
  );
}
