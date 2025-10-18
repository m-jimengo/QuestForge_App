"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "../../Interfaces/User/user-interface";
import { IMAGES } from "../../Constants/Images/Images";

const mockUser: User = {
	id: 1,
	name: "Lucía Fernández",
	image: "/images/users/lucia.png",
	quote: "Dreams are maps for the brave.",
	playStyles: ["Tabletop"],
	rolTypes: ["Dungeons & Dragons"],
	location: "Sevilla",
	availability: ["Friday night", "Sunday morning"],
	age: 0,
	gender: "",
	email: "",
	bio: ""
};

const UserService = {
	getUser: async (): Promise<User> => {
		// Simula una llamada a API con un pequeño retardo
		return new Promise((resolve) => {
			setTimeout(() => resolve(mockUser), 500);
		});
	},
};

const Navbar: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		UserService.getUser().then(setUser);
	}, []);

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Image
					src={IMAGES.NAVBAR_LOGO}
					alt="Logo"
					width={100}
					height={100}
					className="navbar-logo"
					quality={100}
				/>
			</div>

			<div className="navbar-right">
				<div className="navbar-center">
					<a href="/Features/Board" className="navbar-link">
						<Image
							src={IMAGES.PEOPLE_ICON}
							alt="People"
							width={28}
							height={28}
							className="navbar-icon"
						/>
						<span>People</span>
					</a>
					<a href="/papyrus" className="navbar-link">
						<Image
							src={IMAGES.PAPYRUS_ICON}
							alt="Papyrus"
							width={28}
							height={28}
							className="navbar-icon"
						/>
						<span>PlayRooms</span>
					</a>
				</div>

				{user && (
					<div className="navbar-user-photo">
							<Link href="/Features/UserProfile">
							<Image
								src={user.image}
								alt={user.name}
								width={40}
								height={40}
								className="navbar-user-img"
							/>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
