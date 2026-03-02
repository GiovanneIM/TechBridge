"Use client"


import Image from "next/image";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { EyeOffIcon } from "lucide-react"


export default function Home() {
	// const [isVisible, setIsVisible] = useState(false)

	return (
		<div className="w-vw h-svh flex justify-center content-center flex-wrap">
			<div className="absolute z-0 bottom-0">
				<img
					src="/TechBridge/Background2.svg"
				/>
			</div>
			<div className="w-full max-w-md h-fit z-10 ">
				<form>
					<FieldGroup className="border p-4 rounded-md bg-white">
						<div className="w-full flex justify-center">
							<Image
								src="/TechBridge/TechBridgeText.svg"
								width={240}
								height={24}
								alt="TechBridge"
							/>
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

			{/* <button onClick={document.documentElement.classList.toggle('dark')}>
				Alternar tema
			</button> */}
		</div>
	);
}
