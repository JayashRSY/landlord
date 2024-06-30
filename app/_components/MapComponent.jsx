import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapComponent = ({ lat, lon }) => {
  const mapContainerRef = useRef(null);
  const api_key = "pk.84defb7e7d3805ecb85c38a7af7b0822";

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://tiles.locationiq.com/v3/streets/vector.json?features=boundaries%2Croads%2Cbuildings%2Cwater&key=${api_key}`,
      zoom: 12,
      center:
        lon && lat ? [parseFloat(lon), parseFloat(lat)] : [-122.42, 37.779],
    });

    // Add a marker on the location
    // new maplibregl.Marker()
    //   .setLngLat(
    //     (lon && lat)
    //       ? [parseFloat(lon), parseFloat(lat)]
    //       : [-122.42, 37.779]
    //   )
    //   .addTo(map);

    return () => {
      map.remove();
    };
  }, [lon, lat]);

  return (
    <div
      ref={mapContainerRef}
      className="w-[400px] h-[300px] cursor-grab transition-all duration-300 active:cursor-grabbing"
    />
  );
};

export default MapComponent;
