// @ts-nocheck
"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/client";
import Image from "next/image";
import { BathIcon, BedDouble, Ruler, Trash } from "lucide-react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MyListings = () => {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    user && getUserListing();
  }, [user]);

  const getUserListing = async () => {
    try {
      const { data, error } = await supabase
        .from("listing")
        .select("*, listingImages(url, listing_id)")
        .eq("createdBy", user.primaryEmailAddress.emailAddress)
        .order("id", { ascending: false });
      if (data) {
        setListings(data);
      }
      if (error) {
        toast(error);
      }
    } catch (error) {
      toast(error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col justify-center px-10 md:px-20">
      <h2 className="font-bold text-2xl mb-8">Manage Your Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {listings &&
          listings.map((item, index) => (
            <div className="m-3 p-3 border rounded-lg">
              <Image
                src={
                  item.listingImages[0]?.url ||
                  "https://d27p8o2qkwv41j.cloudfront.net/wp-content/uploads/2022/03/NEARLY2.jpg"
                }
                alt=""
                width={800}
                height={150}
                className="rounded-lg object-cover h-[170px]"
              />
              <div className="flex mt-2 flex-col gap-2">
                <h2 className="font-bold text-xl">&#8377; {item.price}</h2>
                <h2 className="flex gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {item.address}
                </h2>
                <div className="flex gap-2 justify-between mt-2">
                  <h2 className="w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <BedDouble className="h-4 w-4 " />
                    {item.bedroom}
                  </h2>
                  <h2 className="w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <BathIcon className="h-4 w-4 " />
                    {item.bathroom}
                  </h2>
                  <h2 className="w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Ruler className="h-4 w-4 " />
                    {item.area}
                  </h2>
                </div>
              </div>
              <div className="flex gap-2 py-4">
                <Button size="sm" variant="outline" className="w-full">
                  <Link href={"/view-listing/" + item.id}>View</Link>
                </Button>
                <Button size="sm" className="w-full">
                  <Link href={"/edit-listing/" + item.id}>Edit</Link>
                </Button>
                <Button size="sm" variant="destructive" className="w-full">
                  {/* <Link href={"" + item.id}> */}
                    <Trash />
                  {/* </Link> */}
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MyListings;
