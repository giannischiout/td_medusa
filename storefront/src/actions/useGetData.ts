import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import axiosInstance from "../lib/axios"
import { endpoints } from "../lib/endpoints"

// Generic fetcher function using axios
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url)
  return response.data
}

// Generic hook for GET requests
export const useGetData = <T>(
  queryKey: (string | number)[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => fetcher<T>(url),
    ...options,
  })
}

// Specific hooks for common use cases
export const useGetProducts = (params?: Record<string, any>) => {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ""
  return useGetData(["products", queryParams], `/products${queryParams}`)
}

export const useGetProduct = (id: string) => {
  return useGetData(["product", id], `/products/${id}`)
}

export const useGetCategories = () => {
  return useGetData(["categories"], endpoints.categories.list)
}

export const useGetCollections = () => {
  return useGetData(["collections"], "/collections")
}

export const useGetOrders = (params?: Record<string, any>) => {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ""
  return useGetData(["orders", queryParams], `/orders${queryParams}`)
}

export const useGetOrder = (id: string) => {
  return useGetData(["order", id], `/orders/${id}`)
}

export const useGetCart = () => {
  return useGetData(["cart"], "/cart")
}

export const useGetUserProfile = () => {
  return useGetData(["user", "profile"], "/user/profile")
}

export const useGetProviderExperience = (id: string) => {
  return useGetData(
    ["provider", "experience", id],
    `/provider/experiences/${id}`
  )
}

export const useGetProviderBookings = (params?: Record<string, any>) => {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ""
  return useGetData(
    ["provider", "bookings", queryParams],
    `/provider/bookings${queryParams}`
  )
}
