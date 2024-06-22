"use client";
import dynamic from "next/dynamic";

import MapComponent from "../../_components/MapComponent";

const LocationAutocomplete = dynamic(
  () => import("../../_components/LocationAutocomplete"),
  {
    ssr: false,
  }
);
const AddNewListing = () => {
  return (
    <div>
      <div className="p-10 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div>
          <h2 className="text-gray-500">Enter Address which you want to use</h2>
        </div>
      </div>
      <LocationAutocomplete />
      <MapComponent />
    </div>
  );

};
export default AddNewListing;
