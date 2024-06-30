// @ts-nocheck
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ imageList }) => {
  return (
    <Carousel>
      <CarouselContent>
        {imageList?.map((item, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <Image
              src={item.url}
              alt={item.url}
              width={800}
              height={300}
              className="rounded-xl object-cover h-[300px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default Slider;
