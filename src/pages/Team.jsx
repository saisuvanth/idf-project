import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import rishi from '../assets/kaushik_rishi.png';
import mahaboob from '../assets/mahaboob_shaik.png';
import faisal from '../assets/faisal.png';
import shardul from '../assets/shardul.png';
import suvanth from '../assets/suvanth.png';
import Diwan from '../assets/core/Diwan.jpg';
import Abhinav from '../assets/core/Abhinav.jpg';
import Prabhjot from '../assets/core/Prabhjot.jpg';
import Kasiviswanathan from '../assets/core/Kasiviswanathan.jpeg';
import { BsLinkedin, BsGithub } from "react-icons/bs";


const Team = () => {

	const devTeamData = [
		{
			name: "Kaushik Rishi",
			title: "Developer",
			linkedIn: 'https://www.linkedin.com/in/kaushikrishi',
			github: 'https://www.github.com/kaushik-rishi',
			image: rishi
		},
		{
			name: 'Shardul Kurdukar',
			title: "Developer",
			linkedIn: 'https://www.linkedin.com/in/fresauce/',
			github: 'https://github.com/fresauce',
			image: shardul
		},
		{
			name: "Mohd Faisal Khan",
			title: 'Developer',
			linkedIn: 'https://www.linkedin.com/in/mohd-faisal-khan-a7539b20b/',
			github: 'https://github.com/faisal-kn',
			image: faisal
		},
		{
			name: 'V Sai Suvanth',
			title: "Developer",
			linkedIn: 'https://www.linkedin.com/in/v-sai-suvanth-539ba8203/',
			github: 'https://github.com/Sashi445',
			image: suvanth
		},
		{
			name: 'Mahaboob Shaik',
			title: "Developer",
			linkedIn: 'https://www.linkedin.com/in/mahaboobshaik-developer',
			github: "https://www.github.com/bannu0snake",
			image: mahaboob
		},
	];

	const coreTeamData = [
		{
			name: "Prof. K. S. Kasiviswanathan",
			title: "Principal Investigator ",
			subtitle: "Dept. of WRD&M, IIT Roorkee",
			image: Kasiviswanathan
		},
		{
			name: "Abhinav Wadhwa",
			title: "Post Doctoral Fellow",

			image: Abhinav
		},
		{
			name: "Diwan Mohaideen",
			title: "Post Doctoral Fellow",

			image: Diwan
		},
		{
			name: "Prabhjot Singh",
			title: "M.Tech Student",

			image: Prabhjot
		}
	];

	return (
		<div className="container py-5">

			<div className="container mb-5">
				<div className='py-5 text-center' >
					<h2 className="logoFont">Core Team</h2>
				</div>
				<div className="row justify-content-center align-items-stretch">
					{coreTeamData.map((i, indx) => (<div className='m-2 col-lg-2 col-md-6 card shadow-6 py-2' key={indx}>
						<div className="text-center">
							<img src={i.image} alt="" className="rounded" style={{
								width: "200px",
								height: "200px"
							}} />
							<div className="py-3">
								<h4>
									{i.name}
								</h4>
								<p className="fs-6" style={{ color: 'red' }} >{i.title}</p>

								<p className="fs-6">{i.subtitle}</p>

							</div>
						</div>
					</div>))}
				</div>
			</div>

			<hr />

			<div className="container mb-10">
				<div className='py-5 text-center' >
					<h2 className="logoFont">Development Team</h2>
				</div>
				<div className="row justify-content-center align-items-stretch">
					{devTeamData.map((i, indx) => (<div className='m-2 col-lg-2 col-md-6 card shadow-6 py-2' key={indx}>
						<div className="text-center">
							<img src={i.image} alt="" className="rounded" />
							<div className="py-3">
								<h4>
									{i.name}
								</h4>
								<p className="fs-6">{i.title}</p>
								<p className="fs-6" style={{ color: 'blue' }}>{i.subtitle}</p>
								<div className="my-2 d-flex align-items-center justify-content-center">
									<div>
										<a className='me-2' style={{ color: 'black' }} href={i.linkedIn}><BsLinkedin color='#0e76a8' size={25} /></a>
										<a className='me-2' style={{ color: 'black' }} href={i.github}><BsGithub size={25} /></a>
									</div>
								</div>
							</div>
						</div>
					</div>))}
				</div>
			</div>
		</div>
	);
};

export default Team;