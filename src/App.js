import React, { useEffect, useRef } from "react";
import "./App.css";
import Mapbox from "./components/Mapbox";
import { FormControl, InputLabel, MenuItem, Select, Box, Typography, Card } from '@mui/material'
import { useState } from "react";
// import Legend from "./components/Legend";
import VerticalHandle from "./components/VerticalHandle";


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

function App() {
  const [mapType, setMapType] = useState("cwu");
  const [year, setYear] = useState("2001");
  const [colormap, setColormap] = useState("inferno");
  const [activeRange, setActiveRange] = useState([0, 1]);
  const [width, setWidth] = useState(400);

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
    <div className="App">
      <Mapbox
        mapType={mapType}
        year={year}
        activeRange={activeRange}
        colormap={colormap}
        defaultWidth={width}
      />
      <>
        <VerticalHandle
          boxWidth={width}
          onDrag={setWidth}
          minSize={200}
          minMapSize={40 / 100 * window.innerWidth}
        />
        <Card style={{
          // position: "absolute",
          // right: '0px',
          // minWidth: width,
          // zIndex: 1000,
          // display: 'flex',
          // height: '100vh',
          // flexDirection: 'column',
          // backgroundColor: 'white',
          // padding: '10px',
        }}>
          <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            border: '2px solid gray'
          }}>
            <Box px={4} display={'flex'} flexDirection='row' justifyContent={'space-between'}>
              <FormControl sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Select Map Type</Typography>
                <Select size={'small'} value={mapType} onChange={(ev) => setMapType(ev.target.value)}>
                  <MenuItem value={'cwu'}>CWU</MenuItem>
                  <MenuItem value={'gpp'}>GPP</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <Typography fontWeight={700}>Select Year</Typography>
                {mapType === 'cwu' ?
                  <Select size="small" value={year} onChange={(ev) => setYear(ev.target.value)}>

                    {cwu_year_arr.map((yr, ind) => (
                      <MenuItem key={ind} value={yr}>{yr}</MenuItem>
                    ))}
                  </Select> :
                  <Select size="small" value={year} onChange={(ev) => setYear(ev.target.value)}>
                    {gpp_year_arr.map((yr, ind) => (
                      <MenuItem key={ind} value={yr}>{yr}</MenuItem>
                    ))}
                  </Select>
                }
              </FormControl>
            </Box>
            <FormControl sx={{ px: 4 }}>
              <Typography fontWeight={700}>Select Colormap</Typography>
              <Select size="small" value={colormap} onChange={ev => setColormap(ev.target.value)}>
                {colormaps.map((col, ind) => (
                  <MenuItem key={ind} value={col.value}>{col.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>
        </Card>
      </>
    </div>
  );
}

export default App;
