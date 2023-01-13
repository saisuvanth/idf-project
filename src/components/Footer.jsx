import logo1 from "./../assets/logos/dept_logo_rb.png";
import logo3 from "./../assets/logos/nsert.png";
import logo2 from "./../assets/logo2.png";

const SponsorComponent = () => {
	return (
		<>
			<div className="container my-10 py-2">
				<div className="my-5">
					<h2 className="text-center logoFont" >Developed by</h2>
				</div>
				<div className="d-flex align-items-center justify-content-around">
					<div>
						<div style={{ height: '200px' }} >
							<img className="imageStyling" src={logo1} alt="" />
						</div>
					</div>
					<div className="">
						<div style={{ height: '150px' }} >
							<img className="imageStyling" src={logo2} alt="" />
						</div>
					</div>
					<div>
						<div style={{ height: '150px' }} >
							<img className="imageStyling" src={logo3} alt="" />
						</div>
					</div>
				</div>
			</div><div className="bg-secondary py-5 position-static bottom-0">
				<div className="container my-5">
					<div className="row">
						<div className="col-lg-4 col">
							<h1 className='logoFont mb-1'>HydroMetLab</h1>
						</div>
					</div>
				</div>
			</div>
		</>);
}

export default SponsorComponent;