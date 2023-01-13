import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Colormap from 'colormap';

const Legend = ({ color, range }) => {
	const [rangeArr, setRangeArr] = useState([]);

	const colormap = Colormap({
		colormap: color,
		nshades: 50,
		format: 'hex',
	});
	console.log(range);

	useEffect(() => {
		let arr = [range[0]];
		colormap.forEach(col => {
		})
		setRangeArr(arr);
	}, [range]);

	return (
		<Container className='d-flex flex-column'>
			<span>Scale</span>
			<Col style={{ height: 300 }}>
				{colormap.map((color, index) => (
					<Row key={index} style={{ padding: '0', backgroundColor: color }}></Row>
				))
				}
			</Col>
		</Container>
	)
}

export default Legend