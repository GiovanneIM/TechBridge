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

export default function Home() {
	return (
		<div className="w-full max-w-md">
			<form>
				<FieldGroup className="border p-4 rounded-b-md">
					<FieldSet>
						<FieldLegend>Payment Method</FieldLegend>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="checkout-7j9-card-name-43j">
									Email
								</FieldLabel>
								<Input
									id="checkout-7j9-card-name-43j"
									placeholder="Evil Rabbit"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="checkout-7j9-card-number-uw1">
									Senha
								</FieldLabel>
								<Input
									id="checkout-7j9-card-number-uw1"
									placeholder="1234 5678 9012 3456"
									required
								/>
							</Field>
						</FieldGroup>
					</FieldSet>

					<FieldSeparator />

					{/* Botão de Login */}
					<Field orientation="horizontal">
						<Button type="submit">Login</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}




