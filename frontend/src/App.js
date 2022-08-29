/** @format */

import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobListView from './componenets/joblistview';

function App() {
	const [jobList, setJobList] = useState([{}]);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');

	useEffect(() => {
		axios.get('http://localhost:8000/api/jobs_list').then((res) => {
			console.log('tashi jobs');

			setJobList(res.data);
		});
	}, []);
	const addJobListHandler = () => {
		axios
			.post('http://localhost:8000/api/jobs_list/', {
				title: title,
				description: desc,
			})
			.then((res) => console.log(res));
	};

	return (
		<div className='App'>
			<div
				className='App list-group-item justify-content-center align-items-center mx-auto'
				style={{ width: '400px', backgroundColor: 'white', marginTop: '15px' }}>
				<h1
					className='card text-white bg-primary mb-1'
					styleName='max-wdith:20rem;'>
					Jobs List
				</h1>
				<h6 className='card text-white bg-primary mb-3'>
					FASTAPI - React - MongoDB
				</h6>
				<div className='card-body'>
					<h5 className='card text-white bg-dark mb-3'>Add Your Job Post</h5>
					<span className='card-text'>
						<input
							className='mb-2 form-control titleIn'
							onChange={(event) => setTitle(event.target.value)}
							placeholder='Title'
						/>
						<input
							className='mb-2 form-control desIn'
							onChange={(event) => setDesc(event.target.value)}
							placeholder='Description'
						/>
						<button
							className='btn btn-outline-primary mx-2 mb-3'
							style={{ borderRadius: '50px', 'font-weight': 'bold' }}
							onClick={addJobListHandler}>
							Add Job Post
						</button>

						<h5 className='card text-white bg-dark mb-3'>Your Job Posts</h5>
						<div>
							<JobListView jobList={jobList} />
						</div>
					</span>
				</div>
			</div>
			<h6 className='card text-dark bg-warning py-1 mb-0'>
				Copyright 2022, All rights reserved &copy;
			</h6>
		</div>
	);
}

export default App;
