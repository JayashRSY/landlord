import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const api_key = "pk.84defb7e7d3805ecb85c38a7af7b0822";

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://tiles.locationiq.com/v3/streets/vector.json?features=boundaries%2Croads%2Cbuildings%2Cwater&key=${api_key}`,
      zoom: 12,
      center: [-122.42, 37.779],
    });

    //Add Geocoder control to the map
    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: api_key,
    //     mapboxgl: maplibregl,
    //     limit: 5,
    //     dedupe: 1,
    //     marker: {
    //       color: "red",
    //     },
    //     flyTo: {
    //       screenSpeed: 7,
    //       speed: 4,
    //     },
    //   }),
    //   "top-left"
    // );

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapComponent;
