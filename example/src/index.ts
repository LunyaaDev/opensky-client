import 'dotenv/config'
import { OpenSkyApi } from 'opensky'
;(async () => {
  const opensky = new OpenSkyApi({
    clientId: process.env.OPENSKY_CLIENT_ID!,
    clientSecret: process.env.OPENSKY_CLIENT_SECRET!,
  })

  // get states with bounding box covering Switzerland:
  const states = await opensky.getStates({
    boundingBox: {
      latitudeMin: 45.8389,
      latitudeMax: 47.8229,
      longitudeMin: 5.9962,
      longitudeMax: 10.5226,
    },
  })

  // print states of the aircrafts
  console.log(states)

  // print the remaining credits
  console.log(opensky.getRemainingCredits())
})()
