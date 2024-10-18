import { axiosInstance } from "@/api/axios";

export const getCountryDetails = async (countryName: string) => {
  try {
    console.log("countryName", countryName);
    const response = await axiosInstance.get(`/${countryName}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
