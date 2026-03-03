"Use client"


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


export default function Login() {
	// const [isVisible, setIsVisible] = useState(false)

	return (
		<div className="w-vw h-svh flex justify-center content-center flex-wrap">
			{/* Background */}
			<div className="absolute w-full z-0 bottom-0">
				{/* <img
					src="/TechBridge/Background2.svg"
				/> */}
				<svg class="wave" viewBox="0 0 1440 320">
					<path fill="#5170ff" fill-opacity="1"
						d="M0,160 
								C180,240 360,80 540,160 
								C720,240 900,80 1080,160 
								C1260,240 1440,160 1440,160 
								L1440,320 L0,320 Z
							"
					>
					</path>
				</svg>
				{/* <img
					src="/TechBridge/Bridge.svg"
					className="absolute bottom-0 left-1/2 -translate-x-1/2 h-180"
				/> */}
			</div>

			{/* Formulario */}
			<div className="w-full max-w-md h-fit z-10 opacity-95">
				<form>
					<FieldGroup className="border p-4 rounded-md bg-background">
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

						<FieldSeparator />

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
										required
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
									/>
								</Field>

							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

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
