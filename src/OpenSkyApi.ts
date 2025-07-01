import { formatStateVector } from './utils/formatState'
import { checkLatitude, checkLongitude } from './utils/check'
import { StateVector } from './interfaces/StateVector'

export class OpenSkyApi {
  private clientId: string | null
  private clientSecret: string | null

  private accessToken: string | null = null
  private accessTokenExpiresIn: Date | null = null

  private remainingCredits: number | null = null

  private baseUrl = 'https://opensky-network.org/api'

  constructor(opts?: { clientId: string; clientSecret: string }) {
    this.clientId = opts?.clientId || null
    this.clientSecret = opts?.clientSecret || null

    this.updateAccessToken()
  }

  /**
   * Update the accessToken using clientId and ClientSecret (if set)
   */
  private updateAccessToken = async () => {
    // if clientId or secret not set - dont try to refresh the accessToken
    if (!this.clientId || !this.clientSecret) {
      this.accessToken = null
      this.accessTokenExpiresIn = null
      return
    }

    try {
      // build the requst to the auth server to get the accessToken
      const url =
        'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token'

      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      params.append('client_id', this.clientId)
      params.append('client_secret', this.clientId)

      // send request to auth server
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })

      // validate response
      if (res.status !== 200) {
        throw Error('Invalid Status')
      }

      const json = await res.json()

      // throw error if access_token is missing in response
      if (!json.access_token || !json.expires_in) {
        throw Error('access_token or expires_in missing')
      }

      // save access_token if existant
      this.accessToken = json.access_token
      this.accessTokenExpiresIn = json.expires_in
    } catch (error) {
      this.accessToken = null
      this.accessTokenExpiresIn = null
      throw error
    }
  }

  /**
   * fetch a resource with authentication if available
   * @returns
   */
  private fetch = async (url: string | URL, requestInit: RequestInit = {}) => {
    // check if token dosn't exist or expires within the next 5 min

    if (
      !this.accessToken ||
      !this.accessTokenExpiresIn ||
      this.accessTokenExpiresIn < new Date(new Date().getTime() - 1 * 60 * 1000)
    ) {
      // request a new token
      await this.updateAccessToken()
    }

    // if token is now set - add it to the request
    if (this.accessToken) {
      requestInit.headers = {
        ...requestInit.headers,
        Authorization: `Bearer ${this.accessToken}`,
      }
    }

    const res = await fetch(url, requestInit)

    // get remaining credits from api response
    const remainingCredits = res.headers.get('x-rate-limit-remaining')
    this.remainingCredits = parseInt(remainingCredits || '')

    return res
  }

  /**
   * Returns the remaining request credits that where reported on the last api call
   *
   * Uses the `x-rate-limit-remaining` response header from the last request
   *
   * @see https://openskynetwork.github.io/opensky-api/rest.html#limitations
   *
   * @returns remaining request credits
   */
  getRemainingCredits = () => {
    return this.remainingCredits
  }

  /**
   * Fetches state vectors for aircraft, optionally filtering by time, ICAO24 transponder address,
   * bounding box defined by latitude and longitude coordinates, or including aircraft category.
   *
   * @param {Object} opts - The options for the request.
   * @param {Date} [opts.time] - The Date and time to retrieve state vectors for. If omitted, the current time will be used.
   * @param {string[]} [opts.icao24] - An array of one or more ICAO24 transponder addresses (hex strings).
   *                                  If provided, only the state vectors for the specified ICAO24 addresses will be returned.
   *                                  If omitted, the state vectors for all aircraft are returned.
   * @param {Object} [opts.boundingBox] - An object specifying the bounding box with WGS84 coordinates.
   *                                       If provided, the state vectors of aircraft within this area will be returned.
   * @param {number} opts.boundingBox.latitudeMin - The lower bound for latitude in decimal degrees.
   * @param {number} opts.boundingBox.latitudeMax - The upper bound for latitude in decimal degrees.
   * @param {number} opts.boundingBox.longitudeMin - The lower bound for longitude in decimal degrees.
   * @param {number} opts.boundingBox.longitudeMax - The upper bound for longitude in decimal degrees.
   * @param {boolean} [opts.includeAircraftCategory=false] - Whether to include the category of aircraft in the response.
   *                                                          Set to `true` if aircraft category is required (default is `false`).
   *
   * @returns {Promise<StateVector[]>} A Promise that resolves with the API response containing the state vectors of aircraft.
   *
   * @see https://openskynetwork.github.io/opensky-api/rest.html#own-state-vectors
   *
   * @example
   * // Example query with time and aircraft ICAO24:
   * getStates({
   *   time: new Date(1458564121 * 1000),  // Unix timestamp converted to JavaScript Date object
   *   icao24: ['3c6444']
   * }).then(response => {
   *   console.log(response);
   * });
   *
   * @example
   * // Example query with bounding box covering Switzerland:
   * getStates({
   *   boundingBox: {
   *     latitudeMin: 45.8389,
   *     latitudeMax: 47.8229,
   *     longitudeMin: 5.9962,
   *     longitudeMax: 10.5226
   *   }
   * }).then(response => {
   *   console.log(response);
   * });
   *
   * @example
   * // Example query including aircraft category:
   * getStates({
   *   includeAircraftCategory: true
   * }).then(response => {
   *   console.log(response);
   * });
   */
  async getStates(
    opts: {
      time?: Date
      icao24?: string[]
      boundingBox?: {
        latitudeMin: number
        latitudeMax: number
        longitudeMin: number
        longitudeMax: number
      }
      includeAircraftCategory?: boolean
    } = {},
  ) {
    const url = new URL(`${this.baseUrl}/states/all`)

    // append time if set
    if (opts.time) url.searchParams.append('time', String(opts.time.getTime()))

    // append icao24 addresses if set
    if (opts.icao24) {
      opts.icao24.forEach((x) => {
        url.searchParams.append('icao24', x)
      })
    }

    // append and validate boundingBox if set
    if (opts.boundingBox) {
      checkLatitude(opts.boundingBox.latitudeMin)
      checkLatitude(opts.boundingBox.latitudeMax)
      checkLongitude(opts.boundingBox.longitudeMin)
      checkLongitude(opts.boundingBox.longitudeMax)

      url.searchParams.append('lamin', String(opts.boundingBox.latitudeMin))
      url.searchParams.append('lamax', String(opts.boundingBox.latitudeMax))
      url.searchParams.append('lomin', String(opts.boundingBox.longitudeMin))
      url.searchParams.append('lomax', String(opts.boundingBox.longitudeMax))
    }

    // append extended if set
    if (opts.includeAircraftCategory) url.searchParams.append('extended', '1')

    const res = await this.fetch(url)

    const json = await res.json()

    return <StateVector[]>json.states.map(formatStateVector)
  }
}
