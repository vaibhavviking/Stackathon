import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pages.css";


import createNotification, { demo } from '../../Notification'
// import CustomModal from "../components/CustomModal";
// import { RiAirplayLine } from "react-icons/ri";

function Home() {
	const [employees, setEmployes] = useState([]);
	const [isError, setIsError] = useState(false);
	const [empDetails, setEmpDetails] = useState();
	const [currdata, setcurdata] = useState();
	const host = "https://api-stackathon.herokuapp.com/";

	const payrollAccept = async (_id, id) => {
		axios.get(host + "payrollrequest/" + _id + "/accept");
		createNotification({
			title: "Accpeted!!",
			message: "Payroll request accepted",
			type: "info",
		})
		ChangePayrollData(id);
	};

	const payrollReject = async (_id, id) => {
		axios.get(host + "payrollrequest/" + _id + "/reject");
		createNotification({
			title: "Rejected!!",
			message: "Payroll request rejected",
			type: "danger",
		})
		ChangePayrollData(id);
	};

	const leaveAccept = async (_id, id) => {
		axios.get(host + "leaverequest/" + _id + "/accept");
		createNotification({
			title: "Accepted",
			message: "Leave request accepted",
			type: "info",
		})
		ChangeLeaveData(id);
	};

	const leaveReject = async (_id, id) => {
		axios.get(host + "leaverequest/" + _id + "/reject");
		createNotification({
			title: "Rejected",
			message: "Leave request rejected",
			type: "danger",
		})
		ChangeLeaveData(id);
	};

	const ChangePayrollData = async (id) => {
		axios.get(host + "payrollrequest/" + id).then((res) => {
			console.log('res', id, res);
			if (Number(res["data"].length) === 0) {
				setcurdata(
					<tr>
						<td data-title="DESCRIPTION">No Pending Requests</td>
						<td data-title="ACCEPT">-</td>
						<td data-title="REJECT">-</td>
					</tr>
				);
			} else {
				let temp = [];
				temp.push(
					res["data"].map(({ description, Status, _id }) => {
						if (String(Status) === "Pending") {
							return (
								<tr>
									<td data-title="DESCRIPTION">{description}</td>
									<td data-title="ACCEPT">
										<button onClick={() => payrollAccept(_id, id)} type="button" className="btn btn-success">
											Accept
										</button>
									</td>
									<td data-title="REJECT">
										<button onClick={() => payrollReject(_id, id)} type="button" className="btn btn-danger">
											Reject
										</button>
									</td>
								</tr>
							);
						} else if (String(Status) === "Accepted") {
							return (
								<tr>
									<td data-title="DESCRIPTION">{description}</td>
									<td data-title="ACCEPT">Accepted</td>
									<td data-title="REJECT">-</td>
								</tr>
							);
						} else {
							return (
								<tr>
									<td data-title="DESCRIPTION">{description}</td>
									<td data-title="ACCEPT">-</td>
									<td data-title="REJECT">Rejected</td>
								</tr>
							);
						}
					})
				);
				setcurdata(temp);
			}
		});
	};

	const ChangeLeaveData = async (id) => {
		axios.get(host + "leaverequest/" + id).then((res) => {
			console.log(res);
			if (Number(res["data"].length) === 0) {
				setcurdata(
					<tr>
						<td data-title="START">No Pending Requests</td>
						<td data-title="DURATION">-</td>
						<td data-title="DESCRIPTION">-</td>
						<td data-title="ACCEPT">-</td>
						<td data-title="REJECT">-</td>
					</tr>
				);
			} else {
				let temp = [];
				temp.push(
					res["data"].map(({ duration, start, description, Status, _id }) => {
						if (String(Status) === "Pending") {
							return (
								<tr>
									<td data-title="START">{start.slice(0, 10)}</td>
									<td data-title="DURATION">{duration}</td>
									<td data-title="DESCRIPTION">{description}</td>
									<td data-title="ACCEPT">
										<button onClick={() => leaveAccept(_id, id)} type="button" className="btn btn-success">
											Accept
										</button>
									</td>
									<td data-title="REJECT">
										<button onClick={() => leaveReject(_id, id)} type="button" className="btn btn-danger">
											Reject
										</button>
									</td>
								</tr>
							);
						} else if (String(Status) === "Accepted") {
							return (
								<tr>
									<td data-title="START">{start.slice(0, 10)}</td>
									<td data-title="DURATION">{duration}</td>
									<td data-title="DESCRIPTION">{description}</td>
									<td data-title="ACCEPT">Accepted</td>
									<td data-title="REJECT">-</td>
								</tr>
							);
						} else {
							return (
								<tr>
									<td data-title="START">{start.slice(0, 10)}</td>
									<td data-title="DURATION">{duration}</td>
									<td data-title="DESCRIPTION">{description}</td>
									<td data-title="ACCEPT">-</td>
									<td data-title="REJECT">Rejected</td>
								</tr>
							);
						}
					})
				);
				setcurdata(temp);
			}
		});
	};

	useEffect(() => {
		const fetchEmployees = async () => {
			axios
				.get(host + "employee")
				.then((emp) => {
					createNotification({
						message: "Fetching all requests!!",
						type: "warning",
						time: 1000
					})
					console.log(emp["data"]);
					const fetchedEmployees = emp["data"];
					let temp = [];
					temp.push(
						fetchedEmployees.map(({ _id, name, email, attendance, Salary }) => {
							return (
								<tr key={_id}>
									<td data-title="NAME">{name}</td>
									<td data-title="EMAIL">{email}</td>
									<td data-title="ATTENDANCE">{attendance}</td>
									<td data-title="SALARY">{Salary}</td>
									{/* <td><button className="btn btn-warning" onClick={() => handleClick(name, _id)}>Check</button></td> */}
									<td data-title="LEAVE REQUESTS">
										<button
											onClick={() => ChangeLeaveData(_id)}
											type="button"
											className="btn btn-warning"
											data-toggle="modal"
											data-target="#exampleModal2"
										>
											Check
										</button>{" "}
									</td>
									<td data-title="PAYROLL REQUESTS">
										<button
											onClick={() => ChangePayrollData(_id)}
											type="button"
											className="btn btn-warning"
											data-toggle="modal"
											data-target="#exampleModal1"
										>
											Check
										</button>{" "}
									</td>
								</tr>
							);
						})
					);
					setEmployes(temp);
					createNotification({
						message: "All requests fetched successfully!!",
						time: 2000
					})
				})
				.catch((err) => {
					createNotification({
						title: "",
						message: err.message,
						type: "warning",
						time: 1000

					});
					setIsError(true);
				});
		};
		fetchEmployees();
		demo(["Welcome to the Requests page, Here you can manage all the leave requests and payroll requests by the employees", "Try accepting or rejecting some requests, if available!"])
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isError) {
			setEmpDetails(<h1>Something went wrong</h1>);
		} else {
			setEmpDetails(employees);
		}
	}, [isError, employees]);
	return (
		<div>
			<h2 className="pageTitle">Leave and Payroll Requests</h2>
			<div id="no-more-tables">
				<table className="table table-hover table-bordered mt-5">
					<caption>List of Requests</caption>
					<thead className="thead-dark">
						<tr>
							<th className="text-uppercase">name</th>
							<th className="text-uppercase">email</th>
							<th className="text-uppercase">attendance</th>
							<th className="text-uppercase">Salary</th>
							<th className="text-uppercase">Leave Requests</th>
							<th className="text-uppercase">Payroll Requests</th>
						</tr>
					</thead>
					<tbody>{empDetails}</tbody>
				</table>
			</div>
			<div
				className="modal fade bd-example-modal-xl"
				id="exampleModal1"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl " role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Payroll Requests
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div id="no-more-tables">
								<table className="table table-hover table-bordered mt-5">
									<thead className="thead-dark">
										<tr>
											<th className="text-uppercase">Description</th>
											<th className="text-uppercase">Accept</th>
											<th className="text-uppercase">Reject</th>
										</tr>
									</thead>
									<tbody>{currdata}</tbody>
								</table>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade bd-example-modal-xl"
				id="exampleModal2"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl " role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Leave Requests
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div id="no-more-tables">
								<table className="table table-hover table-bordered mt-5">
									<thead className="thead-dark">
										<tr>
											<th className="text-uppercase">Start</th>
											<th className="text-uppercase">Duration</th>
											<th className="text-uppercase">Description</th>
											<th className="text-uppercase">Accept</th>
											<th className="text-uppercase">Reject</th>
										</tr>
									</thead>
									<tbody>{currdata}</tbody>
								</table>
							</div>
						</div>
						{/* </div> */}
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
