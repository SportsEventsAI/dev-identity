import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faBookReader, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { NavLink } from 'react-router-dom';
import { LogoutFunction } from '../../authProviders/authProvider';
import ObjectDump from './ObjectDump';
import { useUserStore } from './UserStoreContext';

export type HeaderProps = {
	accountInfo: IAccountInfo;
	logout: LogoutFunction;
};

export const Header: FC<HeaderProps> = ({ accountInfo, logout }) => {
	const { readonly, setReadonly } = useUserStore();
	const [showUserRawInfo, setShowUserRawInfo] = useState(false);

	function handleShowUserRawInfo(): void {
		setShowUserRawInfo(!showUserRawInfo);
	}

	function handleReadonly(): void {
		setReadonly(!readonly);
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
				<span className="navbar-brand">React demo</span>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/items">
								Items
							</NavLink>
						</li>
					</ul>
					<div className="form-inline my-2 my-lg-0">
						<FontAwesomeIcon icon={faAddressCard} size="lg" />

						<span className="nav-link" onClick={handleShowUserRawInfo}>
							{accountInfo.account.name}
						</span>

						{readonly ? <FontAwesomeIcon icon={faBookReader} size="lg" /> : <FontAwesomeIcon icon={faPencilAlt} size="lg" />}

						<button className="btn btn-outline-info mx-2" onClick={handleReadonly}>
							Switch to {readonly ? 'R/W' : 'RO'}
						</button>
						<button className="btn btn-outline-success" onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			</nav>
			{showUserRawInfo && (
				<div className="card mh-25">
					<h5 className="card-header">User detail</h5>
					<div className="card-body">
						<div className="card-text">
							<ObjectDump value={accountInfo} style={{ height: '200px' }} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
