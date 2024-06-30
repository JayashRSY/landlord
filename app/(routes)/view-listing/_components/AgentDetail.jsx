// @ts-nocheck
import { Button } from "@/components/ui/button";
import Image from "next/image";

const AgentDetail = ({ listing }) => {
  return (
    <>
      <h2 className="text-xl font-bold">Contact Agent</h2>
      <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border">
        <div className="flex items-center gap-6">
          <Image
            src={listing?.profileImage}
            alt="profileImage"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">{listing?.AgentName}</h2>
            <h2 className="text-gray-500">{listing?.createdBy}</h2>
          </div>
        </div>
        <Button>Send Message</Button>
      </div>
    </>
  );
};
export default AgentDetail;
