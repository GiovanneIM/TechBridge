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
				<p className="font-genty text-4xl text-foreground">Como nosso seviço funciona?</p>

				<div className="flex my-3 justify-center gap-20">

					{/* Cards 1*/}
					<Card className="relative w-full max-w-sm pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvS1J7gjXPRpzo3kU3i99PWtvVkw7FZXiUw&s"
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">Featured</Badge>
							</CardAction>
							<CardTitle className="text-techbridge font-extrabold text-2xl">Andon</CardTitle>
							<CardDescription>
								<ul>
									<li>Transforme sua linha de produção com o Andon, um sistema visual inteligente que mostra o status das operações em tempo real.</li>
									<li>Identifique falhas rapidamente e tenha total visibilidade do que acontece na linha.</li>
									<li>Reduza paradas e aumente a eficiência com respostas imediatas da sua equipe.</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>

					{/* Cards 2*/}
					<Card className="relative w-full max-w-sm pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src="https://i0.wp.com/lanoticia.com/wp-content/uploads/2023/10/telefono-alerta.jpg?fit=1200%2C800&ssl=1"
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">Featured</Badge>
							</CardAction>
							<CardTitle className="text-techbridge font-extrabold text-2xl">Alertas visuais e sonoros</CardTitle>
							<CardDescription>
								<ul>
									<li>Receba notificações diretamente no celular sempre que houver qualquer ocorrência na operação.</li>
									<li>Com alertas instantâneos, sua equipe reage mais rápido diante de qualquer problema.</li>
									<li>Reduza o tempo de parada e mantenha o controle da operação de onde estiver.</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>

					{/* Cards 3*/}
					<Card className="relative w-full max-w-sm pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35" />
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdjLEfniNWoxcgT6HXaRlxwcMNd61wHBepA&s"
							alt="Event cover"
							className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">Featured</Badge>
							</CardAction>
							<CardTitle className="text-techbridge font-extrabold text-2xl">Sistemas personalizados</CardTitle>
							<CardDescription className="mt-5">
								<ul>
									<li>Conte com sistemas personalizados desenvolvidos para atender exatamente às necessidades da sua operação.</li>
									<li>Soluções sob medida que se adaptam aos seus processos e desafios específicos.</li>
									<li>Aumente a eficiência e tenha tecnologia que evolui junto com o seu negócio.</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
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
					<a
						href="#"
						className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					>
						<svg
							className="h-10 w-auto"
							viewBox="0 0 100 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width={100} height={40} rx={6} className="fill-muted" />
							<text
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
								className="fill-muted-foreground"
								fontSize={12}
							>
								Logo 1
							</text>
						</svg>
						<span className="sr-only">Company 1</span>
					</a>
					<a
						href="#"
						className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					>
						<svg
							className="h-10 w-auto"
							viewBox="0 0 100 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width={100} height={40} rx={6} className="fill-muted" />
							<text
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
								className="fill-muted-foreground"
								fontSize={12}
							>
								Logo 2
							</text>
						</svg>
						<span className="sr-only">Company 2</span>
					</a>
					<a
						href="#"
						className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					>
						<svg
							className="h-10 w-auto"
							viewBox="0 0 100 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width={100} height={40} rx={6} className="fill-muted" />
							<text
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
								className="fill-muted-foreground"
								fontSize={12}
							>
								Logo 3
							</text>
						</svg>
						<span className="sr-only">Company 3</span>
					</a>
					<a
						href="#"
						className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					>
						<svg
							className="h-10 w-auto"
							viewBox="0 0 100 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width={100} height={40} rx={6} className="fill-muted" />
							<text
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
								className="fill-muted-foreground"
								fontSize={12}
							>
								Logo 4
							</text>
						</svg>
						<span className="sr-only">Company 4</span>
					</a>
					<a
						href="#"
						className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					>
						<svg
							className="h-10 w-auto"
							viewBox="0 0 100 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width={100} height={40} rx={6} className="fill-muted" />
							<text
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
								className="fill-muted-foreground"
								fontSize={12}
							>
								Logo 5
							</text>
						</svg>
						<span className="sr-only">Company 5</span>
					</a>
				</div>
			</div>
		</div>
	);
}
