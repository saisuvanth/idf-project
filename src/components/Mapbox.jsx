import {
  MapContainer,
  TileLayer,
  LayersControl,

} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import LocationMarker from "./LocationMarker";

const position = [20.5937, 78.9629];


const Mapbox = ({ mapType, year, colormap, activeRange }) => {

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "100vh", width: '100vw' }}
    >
      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer checked name='OpenStreetMap'>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Topo View' >
          <TileLayer
            url='https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Image View'>
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'
            maxZoom={20}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Grey View'>
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png'
            maxZoom={20}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Watercolor'>
          <TileLayer
            url='http://a.tile.stamen.com/watercolor/{z}/{x}/{y}.png'
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Data Layer">
          <TileLayer
            opacity={0.9}
            url={`http://localhost:5000/singleband/${mapType}/${year}/{z}/{x}/{y}.png?colormap=${colormap}&stretch_range=${JSON.stringify(
              activeRange
            )}`}
          />
        </LayersControl.Overlay>
      </LayersControl>
      {/* <LocationMarker mapType={mapType} year={year} /> */}
    </MapContainer>
  );
};

export default Mapbox;
