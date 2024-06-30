// @ts-nocheck
import { BathIcon, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import LocationAutocomplete from "./LocationAutocomplete";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Listing = ({
  loader,
  listings,
  address,
  setAddress,
  onSearch,
  bedroomCount,
  setBedroomCount,
  bathroomCount,
  setBathroomCount,
  parkingCount,
  setParkingCount,
  propertyType,
  setPropertyType,
}) => {
  const path = usePathname()
  return (
    <div>
      <div className="p-3 flex gap-4">
        <LocationAutocomplete address={address} setAddress={setAddress} />
        <Button className="flex gap-2" onClick={onSearch}>
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      <div>
        <FilterSection
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
      {address && (
        <div className="px-3">
          <h2 className="text-lg">
            Found <span className="font-bold">{listings?.length}</span> results
            in{" "}
            <span className="font-bold text-cyan-500">
              {address?.display_name}
            </span>
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loader
          ? [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))
          : ""}
        {!loader && listings?.length ? (
          listings?.map((item, index) => (
            <Link href={"/view-listing/" + item.id} key={index}>
              <div className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg">
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
              </div>
            </Link>
          ))
        ) : (
          <h2 className="text-gray-500">No listing found for {path=='/rent'? 'rent': 'sell'}.</h2>
        )}
      </div>
    </div>
  );
};
export default Listing;
