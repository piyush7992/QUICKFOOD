import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// THIS WILL MOVE MAP WHEN RIDER MOVES
function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function LiveMap({ orderId }) {

  const [riderLocation, setRiderLocation] = useState({
    lat: 22.5726,
    lng: 88.3639
  });

  useEffect(() => {
socket.emit("join-order-room", orderId);  
    const handleLocationUpdate = (data) => {

      if (data.orderId === orderId) {
        setRiderLocation({
          lat: data.lat,
          lng: data.lng
        });
      }

    };

    socket.on("riderLocationUpdate", handleLocationUpdate);

    // CLEANUP (IMPORTANT)
    return () => {
      socket.off("riderLocationUpdate", handleLocationUpdate);
    };

  }, [orderId]);

  return (
    <MapContainer
      center={[riderLocation.lat, riderLocation.lng]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >

      <ChangeMapView
        center={[riderLocation.lat, riderLocation.lng]}
      />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[riderLocation.lat, riderLocation.lng]}>
        <Popup>
          Rider is coming 🚴
        </Popup>
      </Marker>

    </MapContainer>
  );
}