// @ts-nocheck
"use client";
import dynamic from "next/dynamic";
// @ts-ignore
import MapComponent from "../../_components/MapComponent";
// @ts-ignore
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "../../../utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const LocationAutocomplete = dynamic(
  // @ts-ignore
  () => import("../../_components/LocationAutocomplete"),
  {
    ssr: false,
  }
);
const AddNewListing = () => {
  const router = useRouter();

  const [address, setAddress] = useState(null);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const handleNext = async () => {
    setLoader(true);
    try {
      if (address) {
        const { data, error } = await supabase
          .from("listing")
          .insert([
            {
              address: address.display_name,
              coordinates: {
                lat: address.lat,
                lon: address.lon,
              },
              createdBy: user.primaryEmailAddress.emailAddress,
            },
          ])
          .select();
        if (data?.length) {
          console.log("🚀 ~ file: page.jsx:35 ~ data:", data);
          toast("Address saved successfully!.");
          router.replace(`/edit-listing/${data[0].id}`);
        }
        if (error) {
          toast(error.message);
          console.log("🚀 ~ file: page.jsx:23 ~ error:", error);
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: page.jsx:24 ~ error:", error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className=" md:flex justify-evenly p-2">
      <div className="p-5 w-full flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-5 w-full rounded-lg border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500 text-center">
            Enter Address which you want to use
          </h2>
          <LocationAutocomplete address={address} setAddress={setAddress} />
          <Button Button disabled={!address || loader} onClick={handleNext}>
            {loader ? (
              // @ts-ignore
              <Loader className="animate-spin" />
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
      <MapComponent address={address} setAddress={setAddress} />
    </div>
  );
};
export default AddNewListing;
