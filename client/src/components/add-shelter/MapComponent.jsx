// components/MapComponent.jsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({ coords, onCoordsChange }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const onCoordsChangeRef = useRef(onCoordsChange);
  const initialMarkerPosRef = useRef(coords || [33.8547, 35.8623]);

  useEffect(() => {
    onCoordsChangeRef.current = onCoordsChange;
  }, [onCoordsChange]);

  useEffect(() => {
    if (!mapRef.current) return;
    const markerPos = initialMarkerPosRef.current;

    // Initialize map
    const map = L.map(mapRef.current).setView(markerPos, 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add marker
    const marker = L.marker(markerPos).addTo(map);
    markerRef.current = marker;

    // Map click handler to place marker
    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;

      // Update marker
      marker.setLatLng([lat, lng]);
      marker.setPopupContent(
        `<div style="font-size:12px">
          <strong>Lat:</strong> ${lat.toFixed(4)}<br/>
          <strong>Lng:</strong> ${lng.toFixed(4)}
        </div>`,
      );

      // Call callback with new coordinates
      if (onCoordsChangeRef.current) {
        onCoordsChangeRef.current({
          latitude: lat.toFixed(4),
          longitude: lng.toFixed(4),
        });
      }
    };

    map.on("click", handleMapClick);

    // Marker popup
    marker.bindPopup(
      `<div style="font-size:12px">
        <strong>Lat:</strong> ${markerPos[0].toFixed(4)}<br/>
        <strong>Lng:</strong> ${markerPos[1].toFixed(4)}<br/>
        <em style="color:#888;font-size:11px">Click map to move</em>
      </div>`,
    );
    marker.openPopup();

    // Cleanup function
    return () => {
      map.off("click", handleMapClick);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        marginTop: "8px",
      }}
    />
  );
}
