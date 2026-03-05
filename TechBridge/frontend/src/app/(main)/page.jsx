"use client"

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="w-full">
			{/* Hero Section */}
			<div className="h-fit flex justify-center items-center gap-24 pt-8">

				<div className="w-160">
					<p className="font-genty text-4xl">Bem vindo à Tech<span className="text-techbridge">Bridge</span></p>

					<p className="text-xl text-gray-500 font-semibold mb-2">
						Otimizamos o tempo e facilitamos a comunicação no ambiente industrial criando pontes entre pessoas
					</p>

					<div className="flex gap-3">
						<Button className="bg-techbridge text-white cursor-pointer hover:animate-wiggle hover:text-background">Entrar em contato</Button>
						<Button variant="outline" className="bg-secondary text-foreground cursor-pointer hover:bg-foreground hover:text-background hover:animate-wiggle">Conheça nosso serviço</Button>
					</div>
				</div>

				<Image
					src="/TechBridge/Logo.svg"
					width={400}
					height={400}
					alt="Logo TechBridge"
					className="animate-wiggle"
				/>

			</div>

			{/* Onda */}
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

			{/* Como funciona? */}
			<div>
				<p className="font-genty text-4xl text-background bg-techbridge">Como nosso seviço funciona?</p>

				<div className="flex my-3">

					{/* Cards 1*/}
					<Card className="relative mx-auto w-full max-w-sm pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src="https://transmaq.com.br/wp-content/uploads/2018/07/maintenance-1.jpg"
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">Featured</Badge>
							</CardAction>
							<CardTitle className="text-techbridge">Manutenção de máquina</CardTitle>
							<CardDescription>
								Conjunto de ações feitas para garantir o bom funcionamento dos equipamentos, como limpeza, ajustes e troca de peças. Seu objetivo é evitar falhas, aumentar a vida útil da máquina e manter sua eficiência.
							</CardDescription>
						</CardHeader>
					</Card>

					{/* Cards 2*/}
					<Card className="relative mx-auto w-full max-w-sm pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src="https://www.produttivo.com.br/blog/wp-content/uploads/2019/05/manutencao-preventiva.jpg"
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">Featured</Badge>
							</CardAction>
							<CardTitle className="text-techbridge">Manutenção preventiva</CardTitle>
							<CardDescription>
								Realização de inspeções, ajustes e trocas de peças de forma planejada para evitar falhas nas máquinas. Seu objetivo é prevenir problemas, aumentar a vida útil do equipamento e garantir seu funcionamento eficiente.
							</CardDescription>
						</CardHeader>
					</Card>

					{/* Cards 3*/}
					<Card className="relative mx-auto w-full max-w-sm pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdlmLGbUHGXxcdb17K6uR4rM0EsimJXPZAZw&s"
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">Featured</Badge>
							</CardAction>
							<CardTitle className="text-techbridge">Design systems meetup</CardTitle>
							<CardDescription>
								Ações realizadas para consertar uma máquina ou equipamento que apresentou defeito ou falha. O objetivo é restaurar seu funcionamento normal por meio da substituição ou ajuste de peças danificadas.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</div>
		</div>
	);
}
