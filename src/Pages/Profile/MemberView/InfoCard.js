import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import './profile-modifier.css';
import Footer from '../../../Components/Footer/Footer.js';
import PrintRequest from './PrintRequest';
import { editUser } from '../../../APIFunctions/User';
import { connectToDiscord } from '../../../APIFunctions/User';
const pic = require('./getPicBySeason');
const bcrypt = require('bcryptjs');

export default function ProfileCard(props) {
	const [ password, setPassword ] = useState('New Password');
	const [ confirmPass, setConfirmPass ] = useState('Confirming New Password');
	const [ user, setUser ] = useState('');
	const discordLogo = 'https://www.freeiconspng.com/uploads/discord-black-icon-1.png';

	async function changePassword() {
		// hash pass
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = password.trim() === '' ? user.password : bcrypt.hashSync(password, salt);

		// async function changePassword() {
		// 	// hash pass
		// 	const salt = bcrypt.genSaltSync(10);
		// 	const hashedPassword = password.trim() === '' ? user.password : bcrypt.hashSync(password, salt);

		// 	if (password === confirmPass) {
		// 		const apiResponse = await editUser(
		// 			{
		// 				...user,
		// 				password: hashedPassword
		// 			},
		// 			user.token
		// 		);
		// 		if (!apiResponse.error) {
		// 			setPassword('');
		// 			window.alert('Success!!');
		// 		}
		// 	}
		// }

		async function handleDiscordAuth() {
			const response = await connectToDiscord(props.user.email, props.user.token);
			window.open(response.responseData);
		}

		return (
			<div id="enclose">
				<img id="clip" alt="side" src={pic.getPictureByMonth()} />
				<img id="clip2" alt="side" src={pic.getPictureByMonth()} />
				<div id="profile-box">
					{props.fields.map((field, ind) => (
						<h3 key={ind} id="inner-text-top">
							<b>{field.title}:</b>{' '}
							{
								<span className={field.value && field.value.includes('Valid') ? 'invalid' : ''}>
									{field.value}
								</span>
							}
						</h3>
					))}
					<Button className="discord-button" onClick={handleDiscordAuth}>
						<div className="center-text">
							<img alt="discordLogo" src={discordLogo} />
							{props.fields[4].value === 'Not Linked' ? 'Connect to Discord' : 'Change Discord Account'}
						</div>
					</Button>
					<h3 id="inner-text-top">
						New Password:{' '}
						<Input
							onChange={(e) => {
								setUser(props.user);
								setPassword(e.target.value);
							}}
							type="password"
						/>
					</h3>
					<h3 id="inner-text-top">
						Confirm Password:{' '}
						<Input
							onChange={(e) => {
								setUser(props.user);
								setConfirmPass(e.target.value);
							}}
							type="password"
						/>
						<Button
							id="changePasswd"
							color="info"
							style={buttonStyle()}
							onClick={() => {
								changePassword();
							}}>
							Change Password
						</Button>
						<PrintRequest email={props.user.email} />
					</h3>
				</div>
				<Footer />
			</div>
		);
	}
}
