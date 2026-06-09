'use client'

import { useState } from "react"
import { Plus, Mail, User } from "lucide-react"
import { useEmpresa } from "@/hooks/useEmpresa"
import { useAuth } from "@/context/AuthContext"

import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"

export default function ModalNovoTecnico() {
    const { user } = useAuth()
    const { criarMembro, loading } = useEmpresa()

    const [isOpen, setIsOpen] = useState(false)

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "123456",
        cod_usuario: "",
        telefone: ""
    })

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    async function handleSubmit() {
        const payload = {
            ...form,
            tipo_usuario: 4,
            telefone: form.telefone.replace(/\D/g, "") // 🔥 obrigatório
        }

        const ok = await criarMembro(user.id_empresa, payload)

        if (ok) {
            setIsOpen(false)
            setForm({
                nome: "",
                email: "",
                senha: "123456",
                cod_usuario: "",
                telefone: ""
            })
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="bg-techbridge">
                <Plus className="inline" /> Novo técnico
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>Registrar Técnico</DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="space-y-4">

                        <Field>
                            <FieldLabel>Nome</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    value={form.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                />
                                <InputGroupAddon><User /></InputGroupAddon>
                            </InputGroup>
                        </Field>

                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                                <InputGroupAddon><Mail /></InputGroupAddon>
                            </InputGroup>
                        </Field>

                        <Field>
                            <FieldLabel>Código</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    value={form.cod_usuario}
                                    onChange={(e) => handleChange("cod_usuario", e.target.value.toUpperCase())}
                                />
                            </InputGroup>
                        </Field>

                        <Field>
                            <FieldLabel>Telefone</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    value={form.telefone}
                                    onChange={(e) => handleChange("telefone", e.target.value)}
                                    placeholder="11999999999"
                                />
                            </InputGroup>
                        </Field>

                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>

                        <Button
                            onClick={handleSubmit}
                            disabled={loading.criarMembro}
                            className="bg-techbridge"
                        >
                            Registrar
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}