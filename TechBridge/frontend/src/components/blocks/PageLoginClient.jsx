"use client"

// PÁGINA DE LOGIN 

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";




export default function PageLoginClient() {

	const {
		user,
		loading,
		error,
		login,
	} = useAuth({
		initialUser: null,
		fetchOnMount: true
	})

	if (user) { window.location.href = `/dashboard` }

	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	return (
		<div className="w-vw h-svh flex justify-center items-center flex-wrap">
			{/* Background */}
			<div className="absolute w-full z-0 bottom-0">
				{/* Ondas */}
				<svg className="wave" viewBox="0 0 1440 320">
					<path fill="#5170ff" fillOpacity="1"
						d="M0,160 
								C180,240 360,80 540,160 
								C720,240 900,80 1080,160 
								C1260,240 1440,160 1440,160 
								L1440,320 L0,320 Z
							"
					>
					</path>
				</svg>
			</div>

			{/* Formulario */}
			<div className="w-full max-w-md h-fit z-10 opacity-95 border p-4 rounded-md bg-card">
				{/* Logo */}
				<div className="w-full flex justify-center">
					<Link href="/" className="flex items-center">
						<img
							src="/TechBridge/Logo.svg"
							className="mr-3 h-12"
							alt="TechBridge logo"
						/>
						<p className="text-3xl font-genty">
							Tech
							<span className="text-techbridge">Bridge</span>
						</p>
					</Link>
				</div>

				<Separator className="my-4" />

				{/* Formulário de login */}
				<form onSubmit={async (e) => {
					e.preventDefault();

					const dadosLogin = { email, senha }

					try {
						await login(dadosLogin);

						router.
					} catch { }
				}}>
					<FieldGroup className="">
						<FieldSet>
							<FieldLegend variant="" className="text-2xl">Login</FieldLegend>

							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="emailLogin">
										Email
									</FieldLabel>
									<Input
										id="emailLogin"
										placeholder="E-mail"
										type="email"
										required

										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Field>

								<Field>
									<FieldLabel htmlFor="senhaLogin">
										Senha
									</FieldLabel>
									<Input
										id="senhaLogin"
										placeholder="Senha"
										type="password"
										required

										value={senha}
										onChange={(e) => setSenha(e.target.value)}
									/>
								</Field>

							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						{error.login && <div className="text-red-500 font-bold text-center">{error.login}</div>}

						{/* Botão de Login */}
						<Field orientation="horizontal" className="justify-center">
							<Button type="submit" size="lg">Entrar</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}
