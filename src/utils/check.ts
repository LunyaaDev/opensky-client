/**
 * Check if latitude is valid
 *
 * @param lon latitude
 */
export const checkLatitude = (latitude: number) => {
  if (latitude < -90 || latitude > 90)
    throw new Error(`Invalid latitude ${latitude}. Must be within -90 to 90`)
}

/**
 * Check if longitude is valid
 *
 * @param longitude longitude
 */
export const checkLongitude = (longitude: number) => {
  if (longitude < -180 || longitude > 180)
    throw new Error(
      `Invalid longitude ${longitude}. Must be within -180 to 180`,
    )
}
