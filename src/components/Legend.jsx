import React, { useEffect, useState } from 'react'
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import Colormap from 'colormap';
import { useMap } from 'react-leaflet';
import L from 'leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen';

const Legend = ({ color, range }) => {
	const [rangeArr, setRangeArr] = useState([]);
	const map = useMap();

	useEffect(() => {
		// if (map) {
		// 	L.control.fullscreen({
		// 		position: 'topleft',
		// 		content: null,
		// 	}).addTo(map);

		// const legend = L.control({ position: 'bottomleft' })

		// legend.onAdd = (map) => {
		// 	const g = L.DomUtil.create('div', '', <Legend color={colormap} range={range} />)
		// 	return g;
		// }

		// legend.addTo(map);
		// }
	}, [map]);


	const colormap = Colormap({
		colormap: color,
		nshades: 50,
		format: 'hex',
	});

	useEffect(() => {
		let arr = [range[0].toFixed(2)];
		let diff = ((range[1] - range[0]) / colormap.length).toFixed(2)
		let temp = arr[0];
		colormap.forEach(col => {
			temp = (parseFloat(temp) + parseFloat(diff)).toFixed(2);
			arr.push(temp);
		})
		setRangeArr(arr);
	}, [range]);


	return (
		<>
			{/* <FullscreenControl /> */}
			<div className='leaflet-bottom leaflet-right'>
				<div className='leaflet-control leaflet-bar'>
					<Container fluid className='d-flex flex-row' style={{
						// position: 'absolute',
						backgroundColor: 'white',
						// bottom: '20px',
						// right: '55px',
						height: '300px',
						// width: '100px',
						zIndex: 10001,
					}}>
						<Col className='d-flex flex-column' style={{ height: 'inherit', width: '45px' }}>
							{
								colormap.map((colr, ind) => (
									<OverlayTrigger key={ind} placement='right' delay={{ show: 250, hide: 300 }} overlay={<Tooltip > {rangeArr[ind]}</Tooltip>}>
										<Row style={{
											backgroundColor: `${colr}`, height: 'inherit', width: 'inherit', '&:hover': {

											}
										}}>
										</Row>
									</OverlayTrigger>
								))
							}
						</Col>
						<div className='d-flex flex-column justify-content-between'>
							<div>{range[0].toFixed(2)}</div>
							<div>{range[1].toFixed(2)}</div>
						</div>
					</Container>
				</div>
			</div>
		</>
	)
}

export default Legend