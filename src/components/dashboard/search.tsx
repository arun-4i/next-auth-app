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

const formSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
});

export function InputWithLabel() {
  const [responseData, setResponseData] = useState(null); // To store the response

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await getCountryDetails(data.country);
      setResponseData(response);
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  };

  return (
    <div className="relative flex justify-end p-2">
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
                  <Input placeholder="Search Country" type="text" {...field} />
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

      {/* Display the API response if available */}
      {responseData && (
        <div className="mt-4">
          <h2>Country Details:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
