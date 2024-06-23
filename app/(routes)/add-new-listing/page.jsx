"use client";
import dynamic from "next/dynamic";
import MapComponent from "../../_components/MapComponent";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LocationAutocomplete = dynamic(
  () => import("../../_components/LocationAutocomplete"),
  {
    ssr: false,
  }
);
const AddNewListing = () => {
  const [address, setAddress] = useState(null);

  return (
    <div>
      <div className="p-5 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-5 w-full rounded-lg border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500 text-center">Enter Address which you want to use</h2>
          <LocationAutocomplete address={address} setAddress={setAddress} />
          <Button>Next</Button>
        </div>
      </div>
      <MapComponent address={address} setAddress={setAddress} />
    </div>
  );
};
export default AddNewListing;
