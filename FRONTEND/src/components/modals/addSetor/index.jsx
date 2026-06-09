'use client'

import { useState } from "react"
import { Plus } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useEmpresa } from "@/hooks/useEmpresa"

import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import {
    BriefcaseBusiness, Network, PaintRoller, Warehouse, Wrench
} from "lucide-react"

// Valores aceitos pelo banco
const ICONES = [
    { valor: "Wrench",            label: "Ferramentas",  icone: <Wrench className="h-5 w-5" /> },
    { valor: "PaintRoller",       label: "Pintura",      icone: <PaintRoller className="h-5 w-5" /> },
    { valor: "BriefcaseBusiness", label: "Gestão",       icone: <BriefcaseBusiness className="h-5 w-5" /> },
    { valor: "Network",           label: "Rede",         icone: <Network className="h-5 w-5" /> },
    { valor: "default",           label: "Depósito",     icone: <Warehouse className="h-5 w-5" /> },
]

const CORES = [
    { valor: "Vermelho", classe: "bg-red-500" },
    { valor: "Azul",     classe: "bg-blue-500" },
    { valor: "Verde",    classe: "bg-emerald-500" },
    { valor: "Amarelo",  classe: "bg-amber-400" },
    { valor: "Roxo",     classe: "bg-purple-500" },
    { valor: "Cinza",    classe: "bg-slate-500" },
]

export default function ModalAddSetor() {
    const { user } = useAuth();
    const { loading, error, criarSetor } = useEmpresa();

    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        cod_setor: "",
        descricao: "",
        cor: "Azul",
        icone: "Wrench",
    });

    function handleChange(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit() {
        const sucesso = await criarSetor(user.id_empresa, form);
        if (sucesso) {
            setIsOpen(false);
            setForm({ nome: "", cod_setor: "", descricao: "", cor: "Azul", icone: "Wrench" });
        }
    }

    const erroMensagem = error.criarSetor?.mensagem;
    const errosZod = error.criarSetor?.zod;

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-techbridge text-md cursor-pointer mt-5"
                size="lg"
            >
                <Plus className="inline" /> Novo setor
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-genty font-normal text-2xl">
                            Registrar Setor
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">

                        {/* NOME */}
                        <Field>
                            <FieldLabel className="font-genty text-muted-foreground">Nome</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Ex: Manutenção"
                                    value={form.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                />
                            </InputGroup>
                            {errosZod?.nome && <p className="text-xs text-red-500 mt-1">{errosZod.nome}</p>}
                        </Field>

                        {/* CÓDIGO */}
                        <Field>
                            <FieldLabel className="font-genty text-muted-foreground">Código</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Ex: MNT"
                                    value={form.cod_setor}
                                    onChange={(e) => handleChange("cod_setor", e.target.value.toUpperCase())}
                                />
                            </InputGroup>
                            {errosZod?.cod_setor && <p className="text-xs text-red-500 mt-1">{errosZod.cod_setor}</p>}
                        </Field>

                        {/* DESCRIÇÃO */}
                        <Field>
                            <FieldLabel className="font-genty text-muted-foreground">Descrição</FieldLabel>
                            <Textarea
                                placeholder="Descreva o setor..."
                                value={form.descricao}
                                onChange={(e) => handleChange("descricao", e.target.value)}
                            />
                            {errosZod?.descricao && <p className="text-xs text-red-500 mt-1">{errosZod.descricao}</p>}
                        </Field>

                        {/* ÍCONE */}
                        <Field>
                            <FieldLabel className="font-genty text-muted-foreground">Ícone</FieldLabel>
                            <div className="flex gap-2 flex-wrap">
                                {ICONES.map((item) => (
                                    <button
                                        key={item.valor}
                                        type="button"
                                        onClick={() => handleChange("icone", item.valor)}
                                        title={item.label}
                                        className={`
                                            p-2 rounded-lg border-2 transition-all
                                            ${form.icone === item.valor
                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                                : "border-gray-200 dark:border-slate-700 hover:border-gray-400"
                                            }
                                        `}
                                    >
                                        {item.icone}
                                    </button>
                                ))}
                            </div>
                            {errosZod?.icone && <p className="text-xs text-red-500 mt-1">{errosZod.icone}</p>}
                        </Field>

                        {/* COR */}
                        <Field>
                            <FieldLabel className="font-genty text-muted-foreground">Cor</FieldLabel>
                            <div className="flex gap-2 flex-wrap">
                                {CORES.map((item) => (
                                    <button
                                        key={item.valor}
                                        type="button"
                                        onClick={() => handleChange("cor", item.valor)}
                                        title={item.valor}
                                        className={`
                                            h-8 w-8 rounded-full border-2 transition-all
                                            ${item.classe}
                                            ${form.cor === item.valor
                                                ? "border-gray-900 dark:border-white scale-110"
                                                : "border-transparent hover:scale-105"
                                            }
                                        `}
                                    />
                                ))}
                            </div>
                            {errosZod?.cor && <p className="text-xs text-red-500 mt-1">{errosZod.cor}</p>}
                        </Field>

                    </div>

                    {erroMensagem && (
                        <p className="text-sm text-red-500 text-center mt-2">{erroMensagem}</p>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button
                            className="bg-techbridge"
                            onClick={handleSubmit}
                            disabled={loading.criarSetor}
                        >
                            {loading.criarSetor ? "Registrando..." : "Registrar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}