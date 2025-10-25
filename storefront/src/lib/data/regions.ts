"use server"

import { HttpTypes } from "@medusajs/types"
import { sdk } from "lib/config"
import medusaError from "lib/util/medusa-error"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError)
}

// Default region ID - you can set this to your preferred region
const DEFAULT_REGION_ID =
  process.env.NEXT_PUBLIC_DEFAULT_REGION_ID || "reg_01HZ9XQZQZQZQZQZQZQZQZQZQZ"

let defaultRegion: HttpTypes.StoreRegion | null = null

export const getDefaultRegion = async () => {
  try {
    if (defaultRegion) {
      return defaultRegion
    }

    // Try to get the default region by ID first
    try {
      defaultRegion = await retrieveRegion(DEFAULT_REGION_ID)
      if (defaultRegion) {
        return defaultRegion
      }
    } catch (e) {
      // If specific region not found, get the first available region
    }

    // Fallback to first available region
    const regions = await listRegions()
    if (regions && regions.length > 0) {
      defaultRegion = regions[0]
      return defaultRegion
    }

    return null
  } catch (e: any) {
    return null
  }
}

// Keep the old function for backward compatibility, but it now returns the default region
export const getRegion = async (countryCode?: string) => {
  return getDefaultRegion()
}
