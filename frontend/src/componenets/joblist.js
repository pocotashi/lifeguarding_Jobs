/** @format */

import axios from 'axios';
import React from 'react';

function JobListItem(props) {
	const deleteJobListHandler = (title) => {
		axios
			.delete(`http://localhost:8000/api/jobs_list/${title}`)
			.then((res) => console.log(res.data));
	};

	return (
		<div>
			<p>
				<span style={{ fontWeight: 'bold, underline' }}>
					{props.jobs_list.title} :{' '}
				</span>{' '}
				{props.jobs_list.description}
				<button
					onClick={() => deleteJobListHandler(props.jobs_list.title)}
					className='btn btn-outline-danger my-2 mx-2'
					style={{ borderRadius: '50px' }}>
					X
				</button>
				<hr></hr>
			</p>
		</div>
	);
}

export default JobListItem;
