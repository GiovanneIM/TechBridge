"use client"

// PÁGINA DE SUPORTE PARA O USUÁRIO

import { CircleQuestionMark, Mail, User } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "../ui/separator";

export default function PageSuporte() {
    return (
        <div className='flex-1 flex flex-col'>
            {/* Header da página */}
            <div
                className="
                flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] 
                ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
            "
            >
                <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                    <CircleQuestionMark className="-ml-1" />

                    <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-6" />

                    <h1 className="text-base font-genty">Suporte</h1>
                </div>
            </div>

            <div className="w-full flex flex-col xl:flex-row justify-center items-center xl:items-stretch gap-4 mb-12 mt-4 px-2 sm:px-4">

                <div className="w-full xl:w-1/2 flex flex-col gap-4">
                    {/* Perguntas frequentes */}
                    <Card className="w-full py-5 px-4">
                        <CardHeader className="m-0 p-0">
                            <CardTitle className={'text-2xl font-genty font-normal'}>Perguntas Frequentes</CardTitle>
                            <CardDescription className={'text-muted-foreground text-md font-genty'}>
                                Perguntas frequentemente feitas por nossos clientes
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="m-0 p-0">
                            <Accordion
                                type="single" collapsible defaultValue="plans"
                            >
                                {items.map((item) => (
                                    <AccordionItem key={item.value} value={item.value} className="w-full">
                                        <AccordionTrigger className={'p-4 font-bold text-sm shadow-sm hover:shadow-md mb-4'}>{item.trigger}</AccordionTrigger>
                                        <AccordionContent className={'px-2'}>{item.content}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* Perguntas frequentes */}
                    <Card className="w-full py-5 px-4">
                        <CardHeader className="m-0 p-0">
                            <CardTitle className={'text-2xl font-genty font-normal'}>Central de Ajuda</CardTitle>
                            <CardDescription className={'text-muted-foreground text-md font-genty'}>
                                Encontre orientações e saiba como resolver problemas de forma rápida e prática.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="m-0 p-0">
                            <Accordion
                                type="single" collapsible defaultValue="plans"
                            >
                                {items2.map((item) => (
                                    <AccordionItem key={item.value} value={item.value} className="w-full">
                                        <AccordionTrigger className={'p-4 font-bold text-sm shadow-sm hover:shadow-md mb-4'}>{item.trigger}</AccordionTrigger>
                                        <AccordionContent className={'px-2'}>{item.content}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full xl:w-1/2 flex flex-col gap-4">
                    {/* Solicitar suporte */}

                    <Card className="w-full py-5 px-4">
                        <CardHeader className="m-0 p-0">
                            <CardTitle className={'text-2xl font-genty font-normal'}>Solicitar suporte</CardTitle>
                            <CardDescription className={'text-muted-foreground text-md font-genty'}>
                                Entre em contato para que possamos ajuda-lo
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="m-0 p-0">
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
                                    <FieldLabel className="font-genty text-muted-foreground">Mensagem</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            id="block-start-textarea"
                                            placeholder="Estou entrando em contato para..."
                                            className="font-mono text-sm h-30"
                                        />
                                    </InputGroup>
                                </Field>

                                <Button className="
                                w-full md:w-sm bg-techbridge font-bold text-white cursor-pointer
                                hover:bg-techbridge/75 transition-all duration-200 active:scale-95
                            "
                                >Entrar em contato</Button>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* <Card className={'relative flex-1 shadow-2xl justify-center p-0 overflow-hidden'}>
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 border-3 rounded-full border-card">
                        <Image
                            src="/TechBridge/Logo.svg"
                            width={100}
                            height={100}
                            alt="Imagem logo"
                        />
                    </div>

                    <div className="flex-1 flex justify-end items-end">
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
                    </div>
                </Card> */}
                </div>

            </div>
        </div>
    )
}





const items = [
    {
        value: "item-1",
        trigger: "Como altero minha senha?",
        content:
            "Entre em contato com o administrador responsável pela sua área e solicite a recuperação da sua senha. Após isso, enviaremos um link para redefinição, que será válido por 24 horas.",
    },
    {
        value: "item-2",
        trigger: "Problemas com seu acesso?",
        content:
            "Solicite suporte ao administrador responsável ou entre em contato conosco para que possamos orientá-lo na resolução do seu problema.",
    },
    {
        value: "item-3",
        trigger: "Como entro em contato com o suporte?",
        content:
            "Você pode entrar em contato com nossa equipe de suporte pelos canais oficiais disponíveis na plataforma. Nossa equipe está pronta para ajudá-lo com qualquer dúvida ou problema.",
    },
]

const items2 = [
    {
        value: "item-1",
        trigger: "Seus dashboards estão sem dados?",
        content:
            "Caso seus dashboards estejam em branco, tente recarregar a página algumas vezes. Se os itens ainda não aparecerem, faça logout e entre novamente em sua conta. Caso o problema persista, entre em contato com o suporte.",
    },
    {
        value: "item-2",
        trigger: "Como alterar minha conta?",
        content:
            "Caso você já esteja logado em qualquer página do site, localize na barra lateral (sidebar) o botão vermelho “Logout”. Ao clicar nele e confirmar a ação, você será redirecionado para a página inicial, onde poderá realizar o login novamente.",
    },
]
