"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { useState } from "react";
import { getCountryDetails } from "@/services/service";
// import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
});

export function SearchBar() {
  const [responseData, setResponseData] = useState<any>({});
  const [flag, setFlag] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await getCountryDetails(data.country);
      setResponseData(response[0]);
      setFlag(response[0].flags.png);
    } catch (error:any) {
      toast.error(error.message);
      console.error("Error fetching country details:", error);
    }
  };

  // useEffect(() => {
  //   console.log("responseData: ", responseData.flags);
  // }, [responseData]);

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* Search Bar */}
      <div className="flex justify-end">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex relative"
          >
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search Country"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"ghost"}
              className="absolute right-0"
              size="icon"
            >
              <SearchIcon className="p-1" />
            </Button>
          </form>
        </Form>
      </div>
      {/* Table and Flag */}
      {responseData.name && responseData.flags ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex justify-center items-center">
            <Image
              src={flag}
              alt="Flag"
              className="rounded-md"
              width={520} // Specify the width
              height={400}
            />
          </div>
          <div>
            <Table className="border border-gray-300 rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-dark">Field</TableHead>
                  <TableHead className="text-dark">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Official Name</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.name?.official || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Common Name</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.name?.common || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Capital</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.capital?.[0] || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Region</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.region || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Subregion</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.subregion || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Continent</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.continents?.[0] || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Area</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.area ? `${responseData.area} km²` : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Population</TableCell>
                  <TableCell className="text-muted-foreground">
                    {responseData.population || "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ) : null}{" "}
      {/* Renders nothing when responseData is null */}
    </div>
  );
}
