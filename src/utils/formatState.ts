import { StateVector } from '../interfaces/StateVector'

export const formatStateVector = (
  stateVector: [
    string, // icao24 string
    string, // callsign string
    string, // origin_country string
    number, // time_position int
    number, // last_contact int
    number, // longitude float
    number, // latitude float
    number, // baro_altitude float
    boolean, // on_ground boolean
    number, // velocity float
    number, // true_track float
    number, // vertical_rate float
    number[], // sensors int[]
    number, // geo_altitude float
    string, // squawk string
    boolean, // spi boolean
    number, // position_source int
    number, // category int
  ],
): StateVector => {
  return {
    icao24: stateVector[0],
    callsign: stateVector[1],
    originCountry: stateVector[2],
    timePosition: stateVector[3],
    lastContact: stateVector[4],
    longitude: stateVector[5],
    latitude: stateVector[6],
    baroAltitude: stateVector[7],
    onGround: stateVector[8],
    velocity: stateVector[9],
    trueTrack: stateVector[10],
    verticalRate: stateVector[11],
    sensors: stateVector[12],
    geoAltitude: stateVector[13],
    squawk: stateVector[14],
    spi: stateVector[15],
    positionSource: stateVector[16],
    category: stateVector[17],
  }
}
