// @ts-nocheck
"use client";
import { createContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EditListing = ({ params }) => {
  //   const params = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    user && verifyUser();
  }, [user]);

  const verifyUser = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(listing_id, url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);
    if (!data?.length) {
      router.replace("/");
    }
    setListing(data[0]);
  };
  const onSubmitHandler = async (formData) => {
    try {
      setLoader(true);
      if (formData) {
        const { data, error } = await supabase
          .from("listing")
          .update(formData)
          .eq("id", params.id)
          .select();
        if (data?.length) {
          toast("Listing updated successfully!.");
        }
        for (const image of images) {
          const file = image;
          const fileName = Date.now().toString();
          const fileExt = fileName.split(".").pop();
          const { data, error } = await supabase.storage
            .from("landlord")
            .upload(`property-images/pi${params.id}${fileName}`, file, {
              contentType: `images/${fileExt}`,
              upsert: false,
            });
          if (data) {
            const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + data.path;
            const { data: imgData, error: imgError } = await supabase
              .from("listingImages")
              .insert([
                {
                  listing_id: params?.id,
                  url: imageUrl,
                },
              ])
              .select();
            if (imgData?.length) {
              toast("Images uploaded successfully!.");
            }
            if (imgError) {
              toast(imgError.message);
            }
          }
          if (error) {
            toast(error.message);
          }
        }
        if (error) {
          toast(error.message);
        }
      }
    } catch (error) {
      toast(error.message);
    } finally {
      setLoader(false);
    }
  };

  const publishBtnHandler = async () => {
    try {
      setLoader(true);
      const { data, error } = await supabase
        .from("listing")
        .update({ isActive: true })
        .eq("id", params?.id)
        .select();
      if (data?.length) {
        toast("Listing published successfully!.");
      }
      if (error) {
        toast(error.message);
      }
    } catch (error) {
      toast(error);
    } finally {
      setLoader(false);
    }
  };

  //   const PropertyForm = () => {
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Please select rent or sell"),
    propertyType: Yup.string().required("Please select a property type"),
    bedroom: Yup.number()
      .positive("Bedroom must be a positive number")
      .required("Bedroom is required"),
    bathroom: Yup.number()
      .positive("Bathroom must be a positive number")
      .required("Bathroom is required"),
    builtIn: Yup.number()
      .positive("Built-in area must be a positive number")
      .required("Built-in area is required"),
    parking: Yup.number()
      .positive("Parking must be a positive number")
      .required("Parking is required"),
    lotSize: Yup.number()
      .positive("Lot size must be a positive number")
      .required("Lot size is required"),
    area: Yup.number()
      .positive("Area must be a positive number")
      .required("Area is required"),
    price: Yup.number()
      .positive("Selling price must be a positive number")
      .required("Selling price is required"),
    hoa: Yup.number()
      .positive("HOA must be a positive number")
      .required("HOA is required"),
    // description: Yup.string().required("Description is required"),
  });
  //   };
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <div className="p-8 rounded-lg shadow-md">
        <Formik
          initialValues={{
            type: "Rent",
            propertyType: "",
            bedroom: "",
            bathroom: "",
            builtIn: "",
            parking: "",
            lotSize: "",
            area: "",
            price: "",
            hoa: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmitHandler(values)}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500 align-middle">
                    Rent or Sell?
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="type"
                      value="Rent"
                      id="Rent"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="Rent" className="text-gray-700">
                      Rent
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="type"
                      value="Sell"
                      id="Sell"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="Sell" className="text-gray-700">
                      Sell
                    </label>
                  </div>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Field
                    as="select"
                    name="propertyType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Property Type</option>
                    <option value="Single Family House">
                      Single Family House
                    </option>
                    <option value="Town House">Town House</option>
                    <option value="Condo">Condo</option>
                  </Field>
                  <ErrorMessage
                    name="propertyType"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grids-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Field
                    type="number"
                    placeholder="Ex.2"
                    name="bedroom"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="bedroom"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <Field
                    type="number"
                    placeholder="Ex.2"
                    name="bathroom"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="bathroom"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Built In</h2>
                  <Field
                    type="number"
                    placeholder="Ex.1900 Sq.Ft"
                    name="builtIn"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="builtIn"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Parking</h2>
                  <Field
                    type="number"
                    placeholder="Ex.2"
                    name="parking"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="parking"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                  <Field
                    type="number"
                    placeholder="Ex.1900 "
                    name="lotSize"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="lotSize"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                  <Field
                    type="number"
                    placeholder="Ex.1900 "
                    name="area"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="area"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Selling Price (&#8377;)</h2>
                  <Field
                    type="number"
                    placeholder="Ex.20,00,000 "
                    name="price"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">HOA (Per Month) (&#8377;)</h2>
                  <Field
                    type="number"
                    placeholder="Ex.2000 "
                    name="hoa"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="hoa"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Description</h2>
                  <Textarea
                    placeholder="Description"
                    name="description"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <h2 className="text-gray-500">Upload Property Images</h2>

                <FileUpload
                  setImages={setImages}
                  listingImages={listing?.listingImages}
                />
              </div>
              <div className="flex gap-7 mt-5 justify-end">
                <Button
                  disabled={loader}
                  variant="outline"
                  className="text-primary border-primary"
                >
                  {loader ? <Loader className="animate-spin" /> : "Save"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={loader} type="button">
                      {loader ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Save & Publish"
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ready to Publish??</AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you really want to save and publish this listing?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={publishBtnHandler}>
                        {loader ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Continue"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default EditListing;
