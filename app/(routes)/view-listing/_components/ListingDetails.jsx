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


const ListingDetails = ({ listing }) => {
  return (
    <div className="my-6 flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center pb-2 border-b-2">
        <div>
          <h1 className="text-2xl font-bold">&#8377; {listing?.price}</h1>
          <p className="flex gap-2">
            <MapPin />
            {listing?.address}
          </p>
        </div>
        <div>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
      <h2 className="text-xl font-bold">Key Features</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4  text-purple-500  py-4">
        <div class="font-bold flex gap-2 items-center justify-center text-purple-500 bg-purple-100 rounded-md p-2">
          <BedDouble />
          <span>{listing?.propertyType}</span>
        </div>
        <div class="font-bold flex gap-2 items-center bg-purple-100 justify-center  text-purple-500 rounded-md p-2">
          <Drill />
          <span>Built In {listing?.builtIn}</span>
        </div>
        <div class="font-bold flex gap-2 items-center bg-purple-100 justify-center  text-purple-500 rounded-md p-2">
          <Ruler />
          <span>{listing?.area} sqft</span>
        </div>
        <div class="font-bold flex gap-2 items-center bg-purple-100 justify-center  text-purple-500 rounded-md p-2">
          <BedDouble />
          <span>{listing?.bedroom} Bedrooms</span>
        </div>
        <div class="font-bold flex gap-2 items-center bg-purple-100 justify-center  text-purple-500 rounded-md p-2">
          <BathIcon />
          <span>{listing?.bathroom} Bathrooms</span>
        </div>
        <div class="font-bold flex gap-2 items-center bg-purple-100 justify-center  text-purple-500 rounded-md p-2">
          <CarFront />
          <span>{listing?.parking} Parking</span>
        </div>
      </div>

      <div className="my-6">
        <h2 className="text-xl font-bold">What's Special?</h2>
        <p>{listing?.description || "..."}</p>
      </div>

      <div className="my-6 flex flex-col gap-6 items-center">
        <h2 className="text-xl font-bold">Find On Map</h2>
        <MapComponent
          lat={listing.coordinates.lat}
          lon={listing.coordinates.lat}
        />
      </div>
    </div>
  );
};
export default ListingDetails;
