"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./common/Button";

const ButtonSignin = () => {
		const {data:session} = useSession();  

		if(session && session.user){
				return (
						<div className="felx gap-4 ml-auto">
								<p className="text-sky-600">{session.user.name}</p>
								<Button onClick={() => signOut()} text="Serrar Sesion" className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full" />
						</div>
				);
		}

		return <Button onClick={() => signIn()} text="Mi cuenta" className="text-black font-semibold py-2 px-4 rounded-full" />
};

export default ButtonSignin;
