// @ts-nocheck
"use client";
import dynamic from "next/dynamic";
// @ts-ignore
import MapComponent from "../../../_components/MapComponent";
// @ts-ignore
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Drill,
  House,
  LandPlot,
  Loader,
  BathIcon,
  BedDouble,
  MapPin,
  Ruler,
  Search,
  CarFront,
} from "lucide-react";
import { useRouter } from "next/navigation";
import LocationAutocomplete from "../../../_components/LocationAutocomplete";
import Slider from "../_components/Slider";

import AgentDetail from "../_components/AgentDetail";
import ListingDetails from "../_components/ListingDetails";

const ViewListing = ({ params }) => {
  const [listing, setListing] = useState(null);
  const fetchListingDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("listing")
        .select("*, listingImages(listing_id, url)")
        .eq("id", params.id)
        .single();
      if (data) {
        setListing(data);
      }
      if (error) {
        toast(error.message);
      }
    } catch (error) {
      toast(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchListingDetails();
  }, [params]);
  return (
    <div className="px-4 md:px-32 lg:px-56 my-3">
      <div className="flex justify-center">
        <Slider imageList={listing?.listingImages} />
      </div>
      {listing && <ListingDetails listing={listing} />}
      <AgentDetail listing={listing} />
    </div>
  );
};
export default ViewListing;
