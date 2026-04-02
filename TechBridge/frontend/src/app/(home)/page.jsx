"use client"

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
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
			<div className="h-fit flex flex-col-reverse lg:flex-row justify-center items-center gap-12 lg:gap-24 pt-8 px-4 sm:px-8">

				<div className="w-full md:w-160 flex flex-col gap-2">
					<p className="font-genty text-4xl">Bem vindo à Tech<span className="text-techbridge">Bridge</span></p>

					<p className="text-xl text-gray-500 font-semibold mb-2">
						Otimizamos o tempo e facilitamos a comunicação no ambiente industrial criando pontes entre pessoas.					</p>

					<div className="flex gap-3">
						<Button className="bg-techbridge text-white cursor-pointer hover:animate-wiggle hover:text-background font-bold">Entrar em contato</Button>
						<Button variant="outline" className="bg-secondary text-foreground cursor-pointer hover:bg-foreground hover:text-background hover:animate-wiggle font-bold">Conheça nosso serviço</Button>
					</div>
				</div>

				{/* Imagem maior */}
				<Image
					src="/TechBridge/Logo.svg"
					width={400}
					height={400}
					alt="Logo TechBridge"
					className="animate-wiggle hidden lg:block"
					loading="eager"
				/>

				{/* Imagem menor */}
				<Image
					src="/TechBridge/Logo.svg"
					width={200}
					height={200}
					alt="Logo TechBridge"
					className="animate-wiggle lg:hidden"
					loading="eager"
				/>

			</div>

			{/* Onda */}
			<Onda />

			{/* Como funciona? */}
			<div className="justify-center align-middle">
				<p className="align-middle justify-center text-center font-genty text-4xl text-foreground">Como nossos serviços funcionam?</p>

				<Cards />
			</div>

			{/* Empresas que utlizam */}
			<div className="border-border border-b py-12">
				<div className="mb-8 text-center">
					<h2 className="mb-2 text-lg font-semibold justify-center">
						Utilizado por empresas líderes
					</h2>
					<p className="text-muted-foreground text-sm">
						Junte-se a empresas líderes de mercado que já utilizam nossos serviços
					</p>
				</div>
				<div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
					<div className="flex items-center justify-center">
						<Image
							src="/avulsos/cadillacSymbol.png"
							alt="simbolo gm"
							height={100}
							width={100}
						/>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src="/avulsos/chevroletSymbol.png"
							alt="simbolo gm"
							height={100}
							width={100}
						/>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src="/avulsos/gmSymbol.png"
							alt="simbolo gm"
							height={100}
							width={100}
						/>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src="/avulsos/gmcSymbol.png"
							alt="simbolo gm"
							height={100}
							width={100}
						/>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src="/avulsos/corvetteSymbol.png"
							alt="simbolo gm"
							height={100}
							width={100}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}


function Onda() {
	return (<>
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

		<svg className="wave rotate-180 -translate-y-1" viewBox="0 0 1440 250">
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
	</>)
}

function Cards() {
	const content = [
		{
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvS1J7gjXPRpzo3kU3i99PWtvVkw7FZXiUw&s',
			title: 'Andon',
			badge: 'Novidade',
			list: [
				'Transforme sua linha de produção com o Andon, um sistema visual inteligente que mostra o status das operações em tempo real.',
				'Identifique falhas rapidamente e tenha total visibilidade do que acontece na linha.',
				'Reduza paradas e aumente a eficiência com respostas imediatas da sua equipe.'
			]
		},
		{
			image: 'https://i0.wp.com/lanoticia.com/wp-content/uploads/2023/10/telefono-alerta.jpg?fit=1200%2C800&ssl=1',
			title: 'Alertas visuais e sonoros',
			badge: 'Incluso',
			list: [
				'Receba notificações diretamente no celular sempre que houver qualquer ocorrência na operação.',
				'Com alertas instantâneos, sua equipe reage mais rápido diante de qualquer problema.',
				'Reduza o tempo de parada e mantenha o controle da operação de onde estiver.</li>'
			]
		},
		{
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdjLEfniNWoxcgT6HXaRlxwcMNd61wHBepA&s',
			title: 'Sistemas personalizados',
			badge: 'Ferramentas',
			list: [
				'Conte com sistemas personalizados desenvolvidos para atender exatamente às necessidades da sua operação.',
				'Soluções sob medida que se adaptam aos seus processos e desafios específicos.',
				'Aumente a eficiência e tenha tecnologia que evolui junto com o seu negócio.'
			]
		},
	]

	return (<>
		<div className="w-full flex flex-wrap my-4 p-4 justify-center gap-20">
			{content.map((cont, i) => {
				return (
					<Card className="relative w-full max-w-sm pt-0" key={i}>
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src={cont.image}
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">{cont.badge}</Badge>
							</CardAction>
							<CardTitle className="text-techbridge font-extrabold text-2xl">
								{cont.title}
							</CardTitle>
							<CardDescription>

							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="dark:text-gray-300">
								{cont.list.map((l, j) => {
									return (<li key={j}>{l}</li>)
								})}
							</ul>
						</CardContent>
					</Card>
				)
			})}
		</div>
	</>)
}