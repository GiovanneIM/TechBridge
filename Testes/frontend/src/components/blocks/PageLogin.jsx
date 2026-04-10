"use client"

// PÁGINA DE LOGIN 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { KeyRound, Mail } from "lucide-react";




export default function PageLogin() {
	const router = useRouter()

	// Obtendo o usuário e a função de login
	const {
		user,
		loading,
		error,
		login,
	} = useAuth()

	// Se houver um usuário logado, o redireciona até a página dashboard
	useEffect(() => {
		if (user) {
			router.push('/dashboard');
		}
	}, [user, router]);

	// Controlando o estado dos inputs
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

				{/* Logo da TechBridge*/}
				<div className="w-full flex justify-center">
					<Link href="/" className="flex flex-col items-center gap-2">
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
					} catch { }
				}}>
					<FieldGroup className="">
						<FieldSet>
							<FieldLegend variant="" className="text-2xl font-genty">Login</FieldLegend>

							<FieldGroup className="px-4">
								<Field >
									<FieldLabel htmlFor="emailLogin" className="font-genty text-muted-foreground">
										E-mail
									</FieldLabel>
									<InputGroup className='w-1/2'>
										<InputGroupInput
											id="emailLogin"
											placeholder="E-mail"
											type="email"
											disabled={loading.login}
											required

											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<InputGroupAddon>
											<Mail />
										</InputGroupAddon>
									</InputGroup>
								</Field>

								<Field>
									<FieldLabel htmlFor="senhaLogin" className="font-genty text-muted-foreground">
										Senha
									</FieldLabel>
									<InputGroup className='w-1/2'>
										<InputGroupInput
											id="senhaLogin"
											placeholder="Senha"
											type="password"
											disabled={loading.login}
											required

											value={senha}
											onChange={(e) => setSenha(e.target.value)}
										/>
										<InputGroupAddon>
											<KeyRound />
										</InputGroupAddon>
									</InputGroup>
								</Field>
							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						{/* Mensagem de erro */}
						{error.login && <p className="text-red-500 font-bold text-center">{error.login}</p>}

						{/* Botão de Login */}
						<Field orientation="horizontal" className="justify-center">
							<Button
								type="submit" size="lg" disabled={loading.login}
								className="bg-techbridge text-white w-35 font-bold text-md"
							>
								Entrar
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}
