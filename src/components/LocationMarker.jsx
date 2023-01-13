import axios from 'axios';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet'

const LocationMarker = ({ mapType, year }) => {
	const [val, setVal] = useState(null);
	const icon = L.icon({ iconUrl: `${window.location.origin}/marker-icon.png`, className: 'leaflet-dev-icon', iconSize: L.Point(60, 70) })

	const map = useMapEvents({
		click(event) {
			console.log('click', event);
			const { lat, lng } = event.latlng;
			axios.post(`http://localhost:3002/fetchval/${mapType}/${year}`,
				{ lat, long: lng }
			).then(json => {
				console.log(json.data);
				setVal(json.data);
			})
		}
	});

	if (val) {
		return (
			<>
				<Card
					style={{
						width: "300px",
						height: "150px",
						padding: "10px",
						position: "absolute",
						top: "350px",
						right: "10px",
						zIndex: 1000,
						opacity: 0.9,
						fontWeight: 600,
						fontSize: '15px'
					}}
				>
					<Table>
						<tbody>
							<tr>
								<td className='head-col'>Latitute</td>
								<td className='val-col'>{val.lat.toFixed(3)}</td>
							</tr>
							<tr>
								<td className='head-col'>Longitude</td>
								<td className='val-col'>{val.long.toFixed(3)}</td>
							</tr>
							<tr>
								<td className='head-col'>Value</td>
								<td className='val-col'>{val.val.toFixed(3)}</td>
							</tr>
						</tbody>
					</Table>
				</Card>
				<Marker position={[val.lat.toFixed(3), val.long.toFixed(3)]} icon={icon}>
					<Popup>
						<span>hehe</span>
					</Popup>
				</Marker>
			</>
		)
	}
	else return null;
}

export default LocationMarker