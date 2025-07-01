/**
 * @see https://openskynetwork.github.io/opensky-api/rest.html#response
 */
export enum AircraftCategory {
  /** No information at all */
  NO_INFORMATION = 0,
  /** No ADS-B Emitter Category Information */
  NO_ADS_B_EMITTER_CATEGORY_INFORMATION = 1,
  /** Light (< 15500 lbs) */
  LIGHT = 2,
  /** Small (15500 to 75000 lbs) */
  SMALL = 3,
  /** Large (75000 to 300000 lbs) */
  LARGE = 4,
  /** High Vortex Large (aircraft such as B-757) */
  HIGH_VORTEX_LARGE = 5,
  /** Heavy (> 300000 lbs) */
  HEAVY = 6,
  /** High Performance (> 5g acceleration and 400 kts) */
  HIGH_PERFORMANCE = 7,
  /** Rotorcraft */
  ROTORCRAFT = 8,
  /** Glider / sailplane */
  GLIDER_SAILPLANE = 9,
  /** Lighter-than-air */
  LIGHTER_THAN_AIR = 10,
  /** Parachutist / Skydiver */
  PARACHUTIST_SKYDIVER = 11,
  /** Ultralight / hang-glider / paraglider */
  ULTRALIGHT_HANG_GLIDER_PARAGLIDER = 12,
  /** Reserved */
  RESERVED = 13,
  /** Unmanned Aerial Vehicle */
  UNMANNED_AERIAL_VEHICLE = 14,
  /** Space / Trans-atmospheric vehicle */
  SPACE_TRANS_ATMOSPHERIC_VEHICLE = 15,
  /** Surface Vehicle – Emergency Vehicle */
  SURFACE_VEHICLE_EMERGENCY_VEHICLE = 16,
  /** Surface Vehicle – Service Vehicle */
  SURFACE_VEHICLE_SERVICE_VEHICLE = 17,
  /** Point Obstacle (includes tethered balloons) */
  POINT_OBSTACLE = 18,
  /** Cluster Obstacle */
  CLUSTER_OBSTACLE = 19,
  /** Line Obstacle */
  LINE_OBSTACLE = 20,
}
