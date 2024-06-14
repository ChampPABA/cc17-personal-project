import { LoaderIcon } from "../icons";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-gray-200 z-30  opacity-20">
        <div className="fixed inset-0 z-40 flex justify-center items-center">
          <LoaderIcon className=" fill-ifcg-red-high animate-spin" />
          <p className="ml-2 text-ifcg-black-high">Loading...</p>
        </div>
      </div>
    </>
  );
}
