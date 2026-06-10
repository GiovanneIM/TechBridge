'use client'

import { useEmpresa } from "@/hooks/useEmpresa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import HeaderPage from "../../Header/HeaderPage";

import { ArrowLeftCircle, ArrowRightCircle, Building2, Calendar, CheckCircle2, Cpu, MinusCircle, Pencil, Siren, User2, Warehouse, XCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { useHeader } from "@/context/HeaderContext";

export default function PageEmpresaEdit() {
    const params = useParams();
    const id_empresa = params.id;

    // EMPRESA
    const {
        loading, error, mensagem,
        empresa, obterEmpresa,
        atualizarEmpresa, atualizarLogo
    } = useEmpresa()

    useEffect(() => {
        if (!empresa) obterEmpresa(id_empresa)
    }, [empresa, obterEmpresa])

    // LOGO
    const [imgLogo, setIMGLogo] = useState(null)
    const [fileLogo, setFileLogo] = useState(null)

    // HANDLE DA LOGO
    function handleChangeLogo(e) {
        const arquivo = e.target.files[0]

        if (arquivo) {
            setFileLogo(arquivo)
            setIMGLogo(URL.createObjectURL(arquivo))
        }
    }

    // DADOS EMPRESA
    const [novosDados, setNovosDados] = useState({
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

    // COPIANDOS OS DADOS DA EMPRESA PARA OS NOVOS DADOS
    useEffect(() => {
        if (empresa) {
            setNovosDados({
                razao_social: empresa.razao_social || '',
                nome_fantasia: empresa.nome_fantasia || '',
                cnpj: empresa.cnpj || '',
                endereco: {
                    cep: empresa.cep || '',
                    rua: empresa.rua || '',
                    bairro: empresa.bairro || '',
                    cidade: empresa.cidade || '',
                    estado: empresa.estado || '',
                    numero: empresa.numero || '',
                    complemento: empresa.complemento || '',
                }
            })

            setIMGLogo(empresa.logo
                ? API_URL + `/uploads/imagens/empresas/${empresa.id}/logo/${empresa.logo}`
                : ''
            )
        }
    }, [empresa])

    // HANDLE DOS DADOS
    function handleChange(e) {
        const { name, value } = e.target

        setNovosDados((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // HANDLE DO ENDEREÇO
    function handleChangeEndereco(e) {
        const { name, value } = e.target

        setNovosDados((prev) => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value
            }
        }))
    }

    // BUSCAR ENDEREÇO VIA CEP
    async function buscarCEP(cep) {
        const cepLimpo = cep.replace(/\D/g, '')

        if (cepLimpo.length !== 8) return

        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            const data = await res.json()

            if (data.erro) return

            setNovosDados(prev => ({
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
        }
    }

    // FUNÇÃO QUE ATUALIZA OS DADOS
    async function salvarAlteracoes() {
        try {
            // ATUALIZA DADOS
            await atualizarEmpresa(id_empresa, novosDados)

            // ATUALIZA A LOGO SE TIVER MUDADO
            if (imgLogo) {
                await atualizarLogo(id_empresa, fileLogo)
            }

            // OBTER EMPRESA ATUALIZADA
            await obterEmpresa(id_empresa)
        } catch (err) {
            console.error(err)
        }
    }



    // CONTEÚDO
    let content;

    if (empresa) {
        content = (<>
            <div className="p-4 flex-1 flex flex-col gap-4">


                {/* DADOS DA EMPRESA */}
                <Card className="
                    w-full border p-4
                    flex flex-col 2xl:flex-row
                    gap-6
                    overflow-hidden
                ">
                    {/* LOGO */}
                    <div
                        className="flex flex-col justify-center items-center"
                    >
                        <div className="
                            w-full sm:w-100 aspect-square
                            border rounded-t-xl bg-muted
                            shrink-0
                            mx-auto
                            flex items-center justify-center
                            overflow-hidden
                        ">
                            {imgLogo
                                ? (<img
                                    src={imgLogo}
                                    className="object-cover w-full h-full"
                                    alt={empresa.nome_fantasia}
                                />)
                                : (<Building2 size={100} className="text-muted-foreground" />)
                            }
                        </div>
                        <Input
                            className="rounded-t-none w-full sm:w-100"
                            type="file" onChange={handleChangeLogo}
                        />
                    </div>

                    {/* DADO */}
                    <div className="
                        flex-1
                        min-w-0
                        grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-rows-4
                        gap-4
                    ">
                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Razão Social
                            </p>

                            <Input
                                name="razao_social"
                                placeholder={empresa?.razao_social}
                                value={novosDados.razao_social}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Nome Fantasia
                            </p>

                            <Input
                                name="nome_fantasia"
                                placeholder={empresa?.nome_fantasia}
                                value={novosDados.nome_fantasia}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                CNPJ
                            </p>

                            <Input
                                name="cnpj"
                                placeholder={empresa?.cnpj}
                                value={novosDados.cnpj}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* ENDEREÇO */}
                    <div className="
                        flex-2
                        min-w-0
                        grid grid-cols-1 sm:grid-cols-2
                        gap-4
                    ">
                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                CEP
                            </p>

                            <Input
                                name="cep"
                                placeholder={empresa?.cep}
                                value={novosDados.endereco.cep}
                                onChange={(e) => {
                                    handleChangeEndereco(e)
                                    buscarCEP(e.target.value)
                                }}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Rua
                            </p>

                            <Input
                                name="rua"
                                placeholder={empresa?.rua}
                                value={novosDados.endereco.rua}
                                onChange={handleChangeEndereco}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Número
                            </p>

                            <Input
                                name="numero"
                                placeholder={empresa?.numero}
                                value={novosDados.endereco.numero}
                                onChange={handleChangeEndereco}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Complemento
                            </p>

                            <Input
                                name="complemento"
                                placeholder={empresa?.complemento}
                                value={novosDados.endereco.complemento}
                                onChange={handleChangeEndereco}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Bairro
                            </p>

                            <Input
                                name="bairro"
                                placeholder={empresa?.bairro}
                                value={novosDados.endereco.bairro}
                                onChange={handleChangeEndereco}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Cidade
                            </p>

                            <Input
                                name="cidade"
                                placeholder={empresa?.cidade}
                                value={novosDados.endereco.cidade}
                                onChange={handleChangeEndereco}
                            />
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground mb-2">
                                Estado
                            </p>

                            <Input
                                name="estado"
                                placeholder={empresa?.estado}
                                value={novosDados.endereco.estado}
                                onChange={handleChangeEndereco}
                            />
                        </div>
                    </div>
                </Card>

                <Card className="
                    w-full border p-4
                    flex justify-between flex-col 2xl:flex-row
                    gap-3
                    overflow-hidden
                ">
                    <div className="
                        flex-1
                        flex-col justify-between gap-3 items-center
                        rounded-xl border bg-muted/30 p-3
                    ">
                        <div className="text-red-600 font-semibold">{error.atualizarEmpresa}</div>
                        <div className="text-red-600 font-semibold">{error.atualizarLogo}</div>
                        <div className="text-green-700 font-semibold">{mensagem.atualizarEmpresa}</div>
                        <div className="text-green-700 font-semibold">{mensagem.atualizarLogo}</div>
                    </div>

                    <div className="
                        flex justify-between gap-3 items-center
                        rounded-xl border bg-muted/30 p-3
                    ">
                        <Button className="bg-techbridge hover:bg-techbridge/85 w-42 sm:w-50" asChild>
                            <Link href={`/admin/empresas/${id_empresa}`}>
                                <ArrowLeftCircle /> Voltar para a empresa
                            </Link>
                        </Button>
                        <Button
                            onClick={salvarAlteracoes}
                            disabled={loading.atualizarEmpresa || loading.atualizarLogo}
                            className="bg-green-700 hover:bg-green-600 w-42 sm:w-50"
                        >
                            <CheckCircle2 /> Salvar alterações
                        </Button>
                    </div>
                </Card>
            </div>
        </>)
    }


    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: Pencil,
            title: `[#${id_empresa}] ${empresa?.nome_fantasia} - Editar`
        });
    }, [setHeader, empresa]);

    // RETORNO
    return content;
}