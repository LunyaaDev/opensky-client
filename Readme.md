# 🛫 Opensky Client

A lightweight and easy-to-use library to interact with the [OpenSky Network API](https://www.opensky-network.org).

## ✨ Features

- Uses the new [OAuth2 Client Credentials Flow](https://openskynetwork.github.io/opensky-api/rest.html#oauth2-client-credentials-flow)
- Normalizes API responses into simple, user-friendly formats
- Supports fetching
  - [State Vectors](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors)
  - _(More endpoints coming soon!)_

## 🚀 Example usage

Unauthenticated call to the API to get all states

```ts
import { OpenSkyClient } from 'opensky-client'

const opensky = new OpenSkyClient()

// Get all states
const states = await opensky.getStates()

// Print all state vectors (aircraft infos)
console.log(states)
```

📂 [Authenticated Example](./example/src/index.ts)

## 📊 OpenSky API Rate Limits

| **User Type** | **API Credits** | **Requirement** |
| --- | --- | --- |
| **Unauthenticated** | 400 credits/day | No authentication needed |
| **Default** | 4,000 credits/day | Requires OpenSky account |
| **Active Contributing** | 8,000 credits/day | Requires active ADS-B receiver ≥30% uptime monthly |

Check [Limitations](https://openskynetwork.github.io/opensky-api/rest.html#limitations) for more details about rate limits and other API limitations.

## ⚠️ Disclaimer

This library is in no way officially affiliated with or endorsed by the OpenSky Network.

By using this library, you agree to the [OpenSky Network's Terms of Use and Data License Agreement](https://www.opensky-network.org/terms).
