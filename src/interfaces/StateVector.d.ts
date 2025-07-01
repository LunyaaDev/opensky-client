import { AircraftCategory } from '../enums/AircraftCategory'
import { PositionSource } from '../enums/PositionSource'

/**
 * @see https://openskynetwork.github.io/opensky-api/rest.html#response
 */
export interface StateVector {
  /** Unique ICAO 24-bit address of the transponder in hex string representation. */
  icao24: string
  /** Callsign of the vehicle (8 chars). Can be null if no callsign has been received. */
  callsign: string
  /** Country name inferred from the ICAO 24-bit address. */
  originCountry: string
  /** Unix timestamp (seconds) for the last position update. Can be null if no position report was received by OpenSky within the past 15s. */
  timePosition: number | null
  /** Unix timestamp (seconds) for the last update in general. This field is updated for any new, valid message received from the transponder. */
  lastContact: number
  /** WGS-84 longitude in decimal degrees. Can be null */
  longitude: number | null
  /** WGS-84 latitude in decimal degrees. Can be null. */
  latitude: number | null
  /** Barometric altitude in meters. Can be null. */
  baroAltitude: number | null
  /** Boolean value which indicates if the position was retrieved from a surface position report. */
  onGround: boolean
  /** Velocity over ground in m/s. Can be null. */
  velocity: number | null
  /** True track in decimal degrees clockwise from north (north=0°). Can be null. */
  trueTrack: number | null
  /** Vertical rate in m/s. A positive value indicates that the airplane is climbing, a negative value indicates that it descends. Can be null. */
  verticalRate: number | null
  /** IDs of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request. */
  sensors: number[] | null
  /** Geometric altitude in meters. Can be null. */
  geoAltitude: number | null
  /** The transponder code aka Squawk. Can be null. */
  squawk: string | null
  /** Whether flight status indicates special purpose indicator. */
  spi: boolean
  /**
   * Origin of this state’s position.
   * @see PositionSource
   */
  positionSource: PositionSource
  /**
   * Aircraft category.
   * @see AircraftCategory
   */
  category: AircraftCategory
}
