"use client"

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import Image from "next/image";


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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Factory, Mail, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export default function Home() {
	const router = useRouter()
	const formRef = useRef(null)
	const comoRef = useRef(null)
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) { router.push('/dashboard') }

	return (
		<div className="w-full">
			{/* Hero Section */}
			<div className="h-fit flex flex-col-reverse lg:flex-row justify-center items-center gap-12 lg:gap-24 pt-8 px-4 sm:px-8">

				<div className="w-full md:w-160 flex flex-col gap-2">
					<p className="font-genty text-4xl">Bem vindo à Tech<span className="text-techbridge">Bridge</span></p>

					<p className="text-xl font-genty text-muted-foreground mb-2">
						Otimizamos o tempo e facilitamos a comunicação no ambiente industrial criando pontes entre pessoas.
					</p>

					<div className="flex flex-col sm:flex-row gap-3">
						<Button
							size="lg" className="bg-techbridge text-white cursor-pointer hover:animate-wiggle hover:text-background font-bold"
							onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
						>
							Entrar em contato
						</Button>
						<Button
							variant="outline" size="lg" className="bg-secondary text-foreground cursor-pointer hover:bg-foreground hover:text-background hover:animate-wiggle font-bold"
							onClick={() => comoRef.current?.scrollIntoView({ behavior: 'smooth' })}
						>
							Conheça nosso serviço
						</Button>
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
			<div className="justify-center align-middle" ref={comoRef}>
				<p className="align-middle justify-center text-center font-genty text-3xl text-foreground">Como nosso serviço funciona?</p>

				<Cards />
			</div>

			{/* Empresas que utlizam */}
			<div className="py-12">
				<div className="mb-8 text-center">
					<p className="align-middle justify-center text-center font-genty text-3xl text-foreground">
						Utilizado por empresas líderes
					</p>
					<p className="font-genty text-muted-foreground text-sm mt-4 ">
						Junte-se a empresas líderes de mercado que já utilizam nossos serviços
					</p>
				</div>

				<CardsEmpresas />
			</div>

			<Separator />

			{/* Entrar em contato */}
			<div className="w-full py-12 flex flex-col items-center" ref={formRef}>
				<div className="mb-8 text-center">
					<p className="align-middle justify-center text-center font-genty text-3xl text-foreground">
						Marque um atendimento
					</p>
					<p className="font-genty text-muted-foreground text-sm mt-4 ">
						Entre em contato para marcar uma consulta com um representante e conhecer mais do nosso serviço
					</p>
				</div>

				<Card className="w-full md:w-xl lg:w-xl xl:w-2xl py-5 px-4">
					<FieldGroup className='flex items-center gap-4'>
						<div className="w-full flex flex-col md:flex-row gap-4">
							<Field className="md:w-1/2">
								<FieldLabel className="font-genty text-muted-foreground">Nome</FieldLabel>
								<InputGroup>
									<InputGroupInput placeholder="Nome" />
									<InputGroupAddon>
										<User />
									</InputGroupAddon>
								</InputGroup>
							</Field>

							<Field className="md:w-1/2">
								<FieldLabel className="font-genty text-muted-foreground">E-mail</FieldLabel>
								<InputGroup>
									<InputGroupInput placeholder="E-mail para contato" />
									<InputGroupAddon>
										<Mail />
									</InputGroupAddon>
								</InputGroup>
							</Field>
						</div>

						<Field>
							<FieldLabel className="font-genty text-muted-foreground">Empresa</FieldLabel>
							<InputGroup className='w-1/2'>
								<InputGroupInput placeholder="Empresa" />
								<InputGroupAddon>
									<Factory />
								</InputGroupAddon>
							</InputGroup>
						</Field>

						<Field>
							<FieldLabel className="font-genty text-muted-foreground">Mensagem</FieldLabel>
							<InputGroup>
								<InputGroupTextarea
									id="block-start-textarea"
									placeholder="Estou entrando em contato para..."
									className="font-mono text-sm"
								/>
							</InputGroup>
						</Field>

						<Button className="w-full md:w-sm bg-techbridge font-bold text-white">Entrar em contato</Button>
					</FieldGroup>
				</Card>
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
			badge: 'Tecnologia',
			list: [
				'Transforme sua linha de produção com o Andon, um sistema visual inteligente que mostra o status das operações em tempo real.',
				'Identifique falhas rapidamente e tenha total visibilidade do que acontece na linha.',
				'Reduza paradas e aumente a eficiência com respostas imediatas da sua equipe.'
			]
		},
		{
			image: 'https://i0.wp.com/lanoticia.com/wp-content/uploads/2023/10/telefono-alerta.jpg?fit=1200%2C800&ssl=1',
			title: 'Alertas visuais e sonoros',
			badge: 'Comunicação',
			list: [
				'Receba notificações diretamente no celular sempre que houver qualquer ocorrência na operação.',
				'Com alertas instantâneos, sua equipe reage mais rápido diante de qualquer problema.',
				'Reduza o tempo de parada e mantenha o controle da operação de onde estiver.'
			]
		},
		{
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdjLEfniNWoxcgT6HXaRlxwcMNd61wHBepA&s',
			title: 'Sistemas personalizados',
			badge: 'Facilitação',
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
					<Card className="relative w-full max-w-sm overflow-hidden pt-0 pb-4 gap-4" key={i}>
						<div>
							{/* Overlay sobre a imagem */}
							<div className="absolute inset-0 z-30 aspect-video bg-techbridge/35 dark:bg-techbridge/35" />
							{/* Imagem */}
							<img
								src={cont.image}
								alt="Event cover"
								className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
							/>
						</div>

						<div>
							{/* Header do card */}
							<CardHeader className="px-4">
								<CardAction>
									<Badge variant="secondary" className="font-genty">{cont.badge}</Badge>
								</CardAction>

								<CardTitle className="text-techbridge font-genty text-2xl ">
									{cont.title}
								</CardTitle>
							</CardHeader>

							{/* Conteúdo do card */}
							<CardContent className="px-4">
								<ul className="text-muted-foreground text-justify font-genty text-sm">
									{cont.list.map((l, j) => {
										return (<li key={j} className="mt-3">{l}</li>)
									})}
								</ul>
							</CardContent>
						</div>
					</Card>
				)
			})}
		</div>
	</>)
}

function CardsEmpresas() {
	const empresas = [
		{ nome: 'Cadillac', logo: '/avulsos/cadillacSymbol.png' },
		{ nome: 'Chevrolet ', logo: '/avulsos/chevroletSymbol.png' },
		{ nome: 'General Motors', logo: '/avulsos/gmSymbol.png' },
		{ nome: 'GMC', logo: '/avulsos/gmcSymbol.png' },
		{ nome: 'Corvette', logo: '/avulsos/corvetteSymbol.png' }
	]
	return (<>
		<div className="flex flex-wrap justify-center items-center gap-8">
			{empresas.map((emp, i) => {
				return (
					<Card key={i}
						className="flex items-center justify-center p-2"
					>
						<Image
							src={emp.logo}
							alt={emp.nome}
							height={100}
							width={100}
						/>
					</Card>
				)
			})}
		</div>
	</>)
}