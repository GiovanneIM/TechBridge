'use client';

import { conexaoKanban } from "@/hooks/conexaoKanban";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"


export default function PainelControle() {

	const { chamados } = conexaoKanban({
		conectOnMount: true
	});

	function formatarTempo (tempoMinutos) {
		const horas = Math.floor(tempoMinutos / 60);
		const minutos = tempoMinutos % 60;

		if (horas >= 24) {
			const dias = Math.floor(horas / 24);
			return `${dias} dias`	
		}

		if (horas > 1) {
			return `${horas} horas`
		}

		return `${minutos} minutos`
	}

	return (<>
		<div className="relative flex-1 flex min-h-screen bg-linear-to-b from-white to-blue-50 overflow-hidden">

			{/* Background (onda) */}
			<div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none">
				<svg
					className="w-full h-48 md:h-120"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
				>
					<path
						fill="#5170ff"
						fillOpacity="1"
						d="M0,160 
					C180,240 360,80 540,160 
					C720,240 900,80 1080,160 
					C1260,240 1440,160 1440,160 
					L1440,320 L0,320 Z"
					/>
				</svg>
			</div>

			{/* TABELA */}
			<div className="flex-1 flex gap-6 p-6 z-10 bg-black/85 border-bg-muted m-4 rounded">
				<Table className="font-genty text-2xl text-secondary">
					<TableHeader>
						<TableRow>
							<TableHead className="w-10 text-center"></TableHead>
							{/* <TableHead className="text-secondary">IDENTIFICADOR</TableHead> */}
							<TableHead className="w-1/5 text-secondary">SETOR</TableHead>
							<TableHead className="w-1/5 text-secondary">MAQUINA</TableHead>
							<TableHead className="w-1/2 text-secondary">TEMPO EM ESPERA</TableHead>
							<TableHead className="w-1/5 text-secondary">TECNICO</TableHead>
							<TableHead className="text-secondary text-right w-[150px] overflow-x-hidden">STATUS</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{chamados.map((c, i) => (
							<TableRow className="h-16" key={i}>
								<TableCell><div className={`w-6 h-6 rounded-full bg-(--color-${c.estado})`}/></TableCell>
								<TableCell>{c.nome_setor}</TableCell>
								<TableCell>{c.nome_maquina}</TableCell>
								<TableCell>{formatarTempo(c.temp_espera)}</TableCell>
								<TableCell>{c.nome_tecnico}</TableCell>
								<TableCell className="text-right text-secondary-foreground">
									<span className={`px-3 py-1 rounded-full bg-(--color-${c.estado})`}>
										{c.estado}
									</span>
								</TableCell>
							</TableRow>
						))}
						{/* <TableRow className="h-16">
							<TableCell><div className="w-6 h-6 rounded-full bg-(--color-aberto)" /></TableCell>
							<TableCell>Ferramentaria</TableCell>
							<TableCell>Máquina de solda</TableCell>
							<TableCell>00:30</TableCell>
							<TableCell></TableCell>
							<TableCell className="text-right text-secondary-foreground">
								<span className="px-3 py-1 rounded-full bg-(--color-aberto)">
									AGUARDANDO
								</span>
							</TableCell>
						</TableRow>
						<TableRow className="h-16">
							<TableCell><div className="w-6 h-6 rounded-full bg-(--color-andamento)" /></TableCell>
							<TableCell>Pintura</TableCell>
							<TableCell>Balança</TableCell>
							<TableCell>00:15</TableCell>
							<TableCell>João de Souza Silva</TableCell>
							<TableCell className="text-right text-secondary-foreground">
								<span className="px-3 py-1 rounded-full bg-(--color-andamento)">
									EM ANDAMENTO
								</span>
							</TableCell>
						</TableRow>
						<TableRow className="h-16">
							<TableCell><div className="w-6 h-6 rounded-full bg-(--color-cancelado)" /></TableCell>
							<TableCell>Pintura</TableCell>
							<TableCell>Mixer de tintas</TableCell>
							<TableCell>01:30</TableCell>
							<TableCell>Maria Julia Nogueira</TableCell>
							<TableCell className="text-right text-secondary-foreground">
								<span className="px-3 py-1 rounded-full bg-(--color-cancelado)">
									CANCELADO
								</span>
							</TableCell>
						</TableRow>
						<TableRow className="h-16">
							<TableCell><div className="w-6 h-6 rounded-full bg-(--color-concluido)" /></TableCell>
							<TableCell>Ferramentaria</TableCell>
							<TableCell>Máquina de solda</TableCell>
							<TableCell>00:20</TableCell>
							<TableCell>Dwayne The Rock</TableCell>
							<TableCell className="text-right text-secondary-foreground">
								<span className="px-3 py-1 rounded-full bg-(--color-concluido)">
									CONCLUÍDO
								</span>
							</TableCell>
						</TableRow> */}
					</TableBody>
				</Table>
			</div>
		</div>
	</>
	);
}