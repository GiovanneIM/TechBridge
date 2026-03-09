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
							xmlns="data:image/png;base64,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"
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
