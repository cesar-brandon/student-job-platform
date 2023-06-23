import React from "react";
import SinginButton from "./SigninButton";
import Button from "./common/Button";

const AppBar = () => {
		return (
				<header className="flex items-center justify-between p-4">
						<SinginButton />
						<Button text="Empresas" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full" />
				</header>
		)
};

export default AppBar;
