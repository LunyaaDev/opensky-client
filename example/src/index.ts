import 'dotenv/config'
import { OpenSkyClient } from 'opensky'
;(async () => {
  const opensky = new OpenSkyClient({
    clientId: process.env.OPENSKY_CLIENT_ID!,
    clientSecret: process.env.OPENSKY_CLIENT_SECRET!,
  })

  // Get states with bounding box covering Switzerland
  const states = await opensky.getStates({
    boundingBox: {
      latitudeMin: 45.8389,
      latitudeMax: 47.8229,
      longitudeMin: 5.9962,
      longitudeMax: 10.5226,
    },
  })

  // Print all state vectors (aircraft positions)
  console.log(states)

  // Print the remaining credits
  console.log(opensky.getRemainingCredits())
})()
