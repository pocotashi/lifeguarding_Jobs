/** @format */

import JobListItem from './joblist';

export default function JobListView(props) {
	return (
		<div>
			<ul>
				{props.jobList.map((jobs_list) => (
					<JobListItem jobs_list={jobs_list} />
				))}
			</ul>
		</div>
	);
}
