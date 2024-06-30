// @ts-nocheck
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BathIcon, BedDouble, CarFront, Ruler } from "lucide-react";

const FilterSection = ({
  bedroomCount,
  setBedroomCount,
  bathroomCount,
  setBathroomCount,
  parkingCount,
  setParkingCount,
  propertyType,
  setPropertyType,
}) => {
  return (
    <div className="px-3 pb-2 grid grid-cols-2 md:flex gap-2">
      <Select
        onValueChange={(value) =>
          value == "All" ? setBedroomCount(null) : setBedroomCount(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bedroom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>

          <SelectItem value="2">
            <h2 className="flex gap-2">
              <BedDouble className="h-5 w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <BedDouble className="h-5 w-5" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <BedDouble className="h-5 w-5" />
              4+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          value == "All" ? setBathroomCount(null) : setBathroomCount(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bathroom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>

          <SelectItem value="2">
            <h2 className="flex gap-2">
              <BathIcon className="h-5 w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <BathIcon className="h-5 w-5" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <BathIcon className="h-5 w-5" />
              4+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          value == "All" ? setParkingCount(null) : setParkingCount(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>

          <SelectItem value="2">
            <h2 className="flex gap-2">
              <CarFront className="h-5 w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <CarFront className="h-5 w-5" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <CarFront className="h-5 w-5" />
              4+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          value == "All" ? setPropertyType(null) : setPropertyType(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Single Family home">Single Family home</SelectItem>
          <SelectItem value="Town House">Town House</SelectItem>
          <SelectItem value="Condo">Condo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FilterSection;
