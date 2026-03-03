"use client"

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
						<Button className="bg-techbridge text-white hover:animate-wiggle hover:text-background">Entrar em contato</Button>
						<Button className="bg-secondary text-foreground hover:animate-wiggle hover:text-background">Conheça nosso serviço</Button>
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
				
			</div>
		</div>
	);
}
