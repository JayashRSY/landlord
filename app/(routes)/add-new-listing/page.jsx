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
import LocationAutocomplete from "../../_components/LocationAutocomplete";

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
          toast("Address saved successfully!.");
          router.replace(`/edit-listing/${data[0].id}`);
        }
        if (error) {
          toast(error.message);
        }
      }
    } catch (error) {
      toast(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div className="flex justify-center">
        <MapComponent
          lat={address?.lat}
          lon={address?.lat}
          setAddress={setAddress}
        />
      </div>
    </div>
  );
};
export default AddNewListing;
