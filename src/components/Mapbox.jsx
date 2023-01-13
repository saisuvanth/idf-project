import {
  MapContainer,
  TileLayer,
  LayersControl,

} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import LocationMarker from "./LocationMarker";
import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'
import Legend from "./Legend";
const position = [20.5937, 78.9629];

const cwu_year_arr = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015']

const gpp_year_arr = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015']

const colormaps = [
  { name: 'Inferno', value: 'inferno' },
  { name: 'Viridis', value: 'viridis' },
  { name: 'Plasma', value: 'plasma' },
  { name: 'Magma', value: 'magma' },
  { name: 'Rainbow', value: 'rainbow' },
  { name: 'Spring', value: 'spring' },
  { name: 'Jet', value: 'jet' },
  { name: 'Summer', value: 'summer' },
  { name: 'Hot', value: 'hot' },
  { name: 'Greens', value: 'greens' }
]

const Mapbox = () => {
  const [mapType, setMapType] = useState("cwu");
  const [year, setYear] = useState("2001");
  const [colormap, setColormap] = useState("inferno");
  const [activeRange, setActiveRange] = useState([0, 1]);

  const changeMap = _ => {
    fetch(`http://localhost:5000/metadata/${mapType}/${year}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActiveRange([data.percentiles[4], data.percentiles[96]]);
      });
  };

  useEffect(() => {
    // setWidth(sideBarRef.current.offsetWidth);
    // changeMap();
  }, [mapType, year])

  return (
    <Container>
      <Form>
        {/* <Container className="px-3 d-flex flex-column justify-content-between" > */}
        <div className="d-flex align-items-end justify-content-center">
          <Form.Group className="m-3" >
            <div className="flex-grow-1 me-3">
              <Form.Label style={{ fontWeight: 700 }}>Select Map Type</Form.Label>
              <Form.Select value={mapType} onChange={(ev) => setMapType(ev.target.value)}>
                <option value={'cwu'}>CWU</option>
                <option value={'gpp'}>GPP</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="m-3">
            <div className="flex-grow-1 me-3">
              <Form.Label style={{ fontWeight: 700 }}>Select Year</Form.Label>
              {mapType === 'cwu' ?
                <Form.Select value={year} onChange={(ev) => setYear(ev.target.value)} style={{ width: "120px" }}>

                  {cwu_year_arr.map((yr, ind) => (
                    <option key={ind} value={yr}>{yr}</option>
                  ))}
                </Form.Select> :
                <Form.Select value={year} onChange={(ev) => setYear(ev.target.value)}>
                  {gpp_year_arr.map((yr, ind) => (
                    <option key={ind} value={yr}>{yr}</option>
                  ))}
                </Form.Select>
              }
            </div>
          </Form.Group>
          {/* </Container> */}
          <Form.Group className="m-3" >
            <div className="flex-grow-1 me-3">
              <Form.Label style={{ fontWeight: 700 }}>Select Colormap</Form.Label>
              <Form.Select value={colormap} onChange={ev => setColormap(ev.target.value)}>
                {colormaps.map((col, ind) => (
                  <option key={ind} value={col.value}>{col.name}</option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>
        </div>
      </Form>
      <div
        id='map'
        className='rounded p-3 border border-secondary shadow-5'
        style={{ height: '80vh', width: '100%' }}>
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "100%" }}
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
                url={`http://localhost:5001/singleband/${mapType}/${year}/{z}/{x}/{y}.png?colormap=${colormap}&stretch_range=${JSON.stringify(
                  activeRange
                )}`}
              />
            </LayersControl.Overlay>
          </LayersControl>
          {/* <FullscreenControl position="top-left" /> */}
          <Legend color={colormap} range={activeRange} />
        </MapContainer>
      </div>
    </Container>
  );
};

export default Mapbox;
