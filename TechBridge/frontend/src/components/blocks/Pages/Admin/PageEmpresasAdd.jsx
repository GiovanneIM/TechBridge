'use client'

import { BriefcaseBusiness, Mail, MapPin, User2, Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

export default function PageEmpresasAdd() {

    const [empresa, setEmpresa] = useState({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        endereco: {
            cep: '',
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            numero: '',
            complemento: '',
        }
    })

    const [gerente, setGerente] = useState({
        nome: '',
        email: '',
    })

    const [loadingCep, setLoadingCep] = useState(false)

    // HANDLER EMPRESA
    function handleEmpresaChange(field, value) {
        setEmpresa(prev => ({ ...prev, [field]: value }))
    }

    // HANDLER ENDEREÇO
    function handleEnderecoChange(field, value) {
        setEmpresa(prev => ({
            ...prev,
            endereco: { ...prev.endereco, [field]: value }
        }))
    }

    // BUSCAR ENDEREÇO VIA CEP
    async function buscarCEP(cep) {
        const cepLimpo = cep.replace(/\D/g, '')

        if (cepLimpo.length !== 8) return

        try {
            setLoadingCep(true)

            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            const data = await res.json()

            if (data.erro) return

            setEmpresa(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    rua: data.logradouro || '',
                    bairro: data.bairro || '',
                    cidade: data.localidade || '',
                    estado: data.uf || '',
                }
            }))

        } catch (err) {
            console.error("Erro ao buscar CEP:", err)
        } finally {
            setLoadingCep(false)
        }
    }


    let content;

    content = (<>
        <Card className="p-6 space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-lg font-semibold flex items-center gap-2 border-b pb-2 px-4">
                        <Warehouse size={18} />
                        Dados da empresa
                    </p>

                    <div className="grid grid-cols-2 gap-4 px-2">
                        <Field className="gap-1">
                            <FieldLabel className="font-semibold text-md">Razão social</FieldLabel>
                            <InputGroup>
                                <InputGroupInput placeholder="Razão social"
                                    value={empresa.razao_social}
                                    onChange={(e) => {
                                        setEmpresa((prev) => ({ ...prev, razao_social: e.target.value }))
                                    }}
                                />
                            </InputGroup>
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel className="font-semibold text-md">Nome Fantasia</FieldLabel>
                            <InputGroup>
                                <InputGroupInput placeholder="Nome Fantasia"
                                    value={empresa.nome_fantasia}
                                    onChange={(e) => {
                                        setEmpresa((prev) => ({ ...prev, nome_fantasia: e.target.value }))
                                    }}
                                />
                            </InputGroup>
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel className="font-semibold text-md">CNPJ</FieldLabel>
                            <InputGroup>
                                <InputGroupInput placeholder="CNPJ"
                                    value={empresa.cnpj}
                                    onChange={(e) => {
                                        setEmpresa((prev) => ({ ...prev, cnpj: e.target.value }))
                                    }}
                                />
                            </InputGroup>
                        </Field>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-lg font-semibold flex items-center gap-2 border-b pb-2 px-4">
                        <MapPin size={18} />
                        Endereço da empresa
                    </p>

                    <div className="grid grid-cols-2 gap-4 px-2">
                        <div className="col-span-2 md:col-span-1">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">CEP</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="CEP"
                                        value={empresa.endereco.cep}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, cep: e.target.value
                                                }
                                            }))
                                            buscarCEP(e.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>

                        <div className="col-span-1">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">Estado</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="Estado"
                                        value={empresa.endereco.estado}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, estado: e.target.value
                                                }
                                            }))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>

                        <div className="col-span-2">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">Rua</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="Rua"
                                        value={empresa.endereco.rua}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, rua: e.target.value
                                                }
                                            }))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">Cidade</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="Cidade"
                                        value={empresa.endereco.cidade}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, cidade: e.target.value
                                                }
                                            }))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">Bairro</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="Bairro"
                                        value={empresa.endereco.bairro}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, bairro: e.target.value
                                                }
                                            }))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>



                        <div className="col-span-1">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">Número</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="Número"
                                        value={empresa.endereco.numero}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, numero: e.target.value
                                                }
                                            }))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Field className="gap-1">
                                <FieldLabel className="font-semibold text-md">Complemento</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput placeholder="Complemento"
                                        value={empresa.endereco.complemento}
                                        onChange={(e) => {
                                            setEmpresa((prev) => ({
                                                ...prev, endereco: {
                                                    ...prev.endereco, complemento: e.target.value
                                                }
                                            }))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </div>

                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-lg font-semibold flex items-center gap-2 border-b pb-2 px-4">
                        <BriefcaseBusiness size={18} />
                        Gerente
                    </p>

                    <div className="grid grid-cols-2 gap-4 px-2">
                        <Field className="gap-1">
                            <FieldLabel className="font-semibold text-md">Nome Completo</FieldLabel>
                            <InputGroup>
                                <InputGroupInput placeholder="Nome completo"
                                    value={gerente.nome}
                                    onChange={(e) => {
                                        setGerente((prev) => ({ ...prev, nome: e.target.value }))
                                    }}
                                />
                            </InputGroup>
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel className="font-semibold text-md">E-mail</FieldLabel>
                            <InputGroup>
                                <InputGroupInput placeholder="E-mail"
                                    value={gerente.email}
                                    onChange={(e) => {
                                        setGerente((prev) => ({ ...prev, email: e.target.value }))
                                    }}
                                />
                            </InputGroup>
                        </Field>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button className="px-6">Registrar</Button>
            </div>

        </Card>

        {/* <div className="flex gap-2 mt-4">
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto border">
                <p>EMPRESA</p>
                {JSON.stringify(empresa, null, 2)}
            </pre>

            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto border">
                <p>GERENTE</p>
                {JSON.stringify(gerente, null, 2)}
            </pre>
        </div> */}
    </>)


    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Registrar Empresa"
            />
            <div className="p-4">
                {content}
            </div>
        </div>
    );
}