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
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../ui/input-group";
import { KeyRound, Mail } from "lucide-react";

export default function PageLogin() {
	const router = useRouter()

	// HOOK
	const {
		user,
		loading,
		error,
		login,
		isAuthenticated
	} = useAuth()

	// SE HOUVER UM USUÁRIO LOGADO, O DIRECIONA PARA O DASHBOARD
	useEffect(() => {
		if (isAuthenticated && user?.cargo) {
			router.replace(`/${user.cargo}/dashboard`);
		}
	}, [user, isAuthenticated, router]);

	// VARIÁVEIS DOS DADOS DE LOGIN
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	// FUNÇÃO DE ENVIO DO FORMULÁRIO
	const fazerLogin = async (e) => {
		e.preventDefault();

		const dadosLogin = { email, senha }

		try {
			await login(dadosLogin);
		} catch (err) {
			console.error(err);
		}
	}


	// SE HOUVER UM USUÁRIO LOGADO
	if (isAuthenticated) return null;

	// EXIBINDO O FORMULÁRIO
	return (
		<div className="w-vw h-svh flex justify-center items-center flex-wrap">
			{/* BACKGROUND */}
			<div className="absolute w-full z-0 bottom-0">
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

			{/* CARD */}
			<div className="w-full max-w-md h-fit z-10 opacity-95 border p-4 rounded-md bg-card">

				{/* LOGO*/}
				<div className="w-full flex justify-center">
					<Link href="/" className="flex flex-col items-center gap-1">
						<img
							src="/TechBridge/Logo.svg"
							className=" h-18"
							alt="TechBridge logo"
						/>

						<img
							src="/TechBridge/TechBridgeText.svg"
							className="h-12"
							alt="TechBridge logo"
						/>
					</Link>
				</div>

				<Separator className="my-4" />

				{/* FORMULÁRIO */}
				<form onSubmit={fazerLogin}>
					<FieldGroup className="px-2 gap-4">
						<FieldSet>
							<FieldLegend variant="" className="text-2xl font-bold">
								Login
							</FieldLegend>

							<FieldGroup className="px-4">
								{/* INPUT EMAIL */}
								<Field >
									<FieldLabel htmlFor="email" className="font-semibold text-muted-foreground">
										E-mail
									</FieldLabel>

									<InputGroup>
										<InputGroupInput
											id="email"
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

								{/* INPUT SENHA */}
								<Field>
									<FieldLabel htmlFor="senha" className="font-semibold text-muted-foreground">
										Senha
									</FieldLabel>

									<InputGroup>
										<InputGroupInput
											id="senha"
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

						{/* MENSAGEM DE ERRO */}
						{error.login && <p className="text-red-500 font-bold text-center">{error.login}</p>}

						{/* BOTÃO - LOGIN */}
						<Field orientation="horizontal" className="justify-center">
							<Button
								type="submit"
								size="lg"
								disabled={loading.login}
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
