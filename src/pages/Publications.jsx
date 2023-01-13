import React from 'react';
import publication1 from "./../assets/publications/publication1.jpeg";
import publication2 from "./../assets/publications/publication2.jpeg";


const Publications = () => {
	return <div className="container mb-5 py-5">
		<h2 className='logoFont'>Publications</h2>
		<div className="container-fluid row justify-content-center py-2">
			<div className='col-lg-6 col pe-2'>
				<div className="card shadow-4" style={{ height: "100%" }}>
					<div className="">
						<img src={publication1} alt="" className="card-img imageStyling" />
					</div>
				</div>
			</div>
			<div className="col-lg-6 col pe-2">
				<div className="card shadow-4" style={{ height: "100%" }}>
					<div className="">
						<img src={publication2} alt="" className="card-img imageStyling" />
					</div>
				</div>
			</div>
		</div>
	</div>;
};

export default Publications;
