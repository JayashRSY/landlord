"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/client";
import Listing from "./Listing";
import MapComponent from "./MapComponent";
import { toast } from "sonner";

const ListingMapView = ({ type }) => {
  const [address, setAddress] = useState(null);
  const [loader, setLoader] = useState(false);
  const [bedroomCount, setBedroomCount] = useState(null);
  const [bathroomCount, setBathroomCount] = useState(null);
  const [parkingCount, setParkingCount] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      setLoader(true);
      let query = supabase
        .from("listing")
        .select("*, listingImages(listing_id, url)")
        .eq("isActive", true);
      // Apply filters based on input parameters

      if (type) {
        query = query.eq("type", type);
      }
      if (bedroomCount) {
        query = query.gte("bedroom", bedroomCount);
      }
      if (bathroomCount) {
        query = query.gte("bathroom", bathroomCount);
      }
      if (parkingCount) {
        query = query.gte("parking", parkingCount);
      }
      if (address) {
        query = query.like("address", `%${address.display_name}%`);
      }
      if (propertyType) {
        query = query.eq("propertyType", propertyType);
      }

      // Sort the results
      query = query.order("id", { ascending: false });

      // Execute the query
      const { data, error } = await query;
      setListings(data);
      if (error) {
        toast(error.message);
      }
    } catch (error) {
      toast(error);
    } finally {
      setLoader(false);
    }
  };
  const onSearch = async () => {
    fetchListings();
  };
  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Listing
        loader={loader}
          listings={listings}
          address={address}
          setAddress={setAddress}
          onSearch={onSearch}
          bedroomCount={bedroomCount}
          setBedroomCount={setBedroomCount}
          bathroomCount={bathroomCount}
          setBathroomCount={setBathroomCount}
          parkingCount={parkingCount}
          setParkingCount={setParkingCount}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
      </div>
      <div className="flex justify-center">
        <MapComponent lat={address?.lat} lon={address?.lon} />
      </div>
    </div>
  );
};
export default ListingMapView;
