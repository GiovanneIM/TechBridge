'use client'

import { BriefcaseBusiness, Mail, MapPin, PlusCircle, User2, Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useEmpresa } from "@/hooks/useEmpresa";
import { Separator } from "@/components/ui/separator";

export default function PageEmpresasAdd() {
    // HOOK EMPRESA
    const { criarEmpresa, loading, error, mensagem } = useEmpresa();

    // ESTADO DE EMPRESA
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

    // ESTADO DE GERENTE
    const [gerente, setGerente] = useState({
        nome: '',
        email: '',
        tipo_usuario: 2
    })

    // LOADING - CEP
    const [loadingCep, setLoadingCep] = useState(false)

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
        <Card className="p-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="
                            text-lg font-semibold
                            flex items-center
                            gap-4 border py-2 px-4 rounded-t-lg
                        ">
                            <Warehouse size={18} />
                            Dados da empresa
                        </p>

                        <div className="border border-t-0 grid grid-cols-2 gap-4 p-4">
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.razao_social}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.nome_fantasia}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.cnpj}</FieldError>
                            </Field>
                        </div>
                    </div>

                    <div>
                        <p className="
                            text-lg font-semibold
                            flex items-center
                            gap-4 border py-2 px-4 rounded-t-lg
                        ">
                            <BriefcaseBusiness size={18} />
                            Gerente
                        </p>

                        <div className="border border-t-0 grid grid-cols-2 gap-4 p-4">
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
                                <FieldError>{error.criarEmpresa?.zod?.gerente?.nome}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.gerente?.email}</FieldError>
                            </Field>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="
                        text-lg font-semibold
                        flex items-center
                        gap-4 border py-2 px-4 rounded-t-lg
                    ">
                        <MapPin size={18} />
                        Endereço da empresa
                    </p>

                    <div className="border border-t-0 grid grid-cols-2 gap-4 p-4">
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.cep}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.estado}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.rua}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.cidade}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.bairro}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.numero}</FieldError>
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
                                <FieldError>{error.criarEmpresa?.zod?.empresa?.endereco?.complemento}</FieldError>
                            </Field>
                        </div>

                    </div>
                </div>

            </div>

            <Separator />

            <div className="flex justify-between">
                <div className="text-red-500 font-semibold">{error.criarEmpresa?.mensagem}</div>
                <div className="text-emerald-600 font-semibold">{mensagem?.criarEmpresa}</div>

                <Button className="px-6 bg-techbridge text-white"
                    onClick={() => {
                        criarEmpresa({ empresa, gerente })
                    }}
                    disabled={loading.criarEmpresa}
                >
                    <PlusCircle className="inline" />
                    Registrar empresa
                </Button>
            </div>

        </Card>
    </>)


    return (
        <div className="flex-1 flex flex-col">
            {/* HEADER DA PÁGINA */}
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