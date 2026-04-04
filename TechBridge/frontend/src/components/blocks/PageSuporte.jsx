"use client"

// PÁGINA DE SUPORTE PARA O USUÁRIO

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
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Mail, User } from "lucide-react";

export default function PageSuporte() {
    return (
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
                                    <AccordionContent>{item.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                {/* Perguntas frequentes */}
                <Card className="w-full py-5 px-4">
                    <CardHeader className="m-0 p-0">
                        <CardTitle className={'text-2xl font-genty font-normal'}>Perguntas Frequentes</CardTitle>
                        <CardDescription className={'text-muted-foreground text-md font-genty'}>
                            Perguntas comuns feitas por nossos clientes
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="m-0 p-0">
                        <Accordion
                            type="single" collapsible defaultValue="plans"
                        >
                            {items.map((item) => (
                                <AccordionItem key={item.value} value={item.value} className="w-full">
                                    <AccordionTrigger className={'p-4 font-bold text-sm shadow-sm hover:shadow-md mb-4'}>{item.trigger}</AccordionTrigger>
                                    <AccordionContent>{item.content}</AccordionContent>
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
    )
}





const items = [
    {
        value: "item-1",
        trigger: "How do I reset my password?",
        content:
            "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
    },
    {
        value: "item-2",
        trigger: "Can I change my subscription plan?",
        content:
            "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
    },
    {
        value: "item-3",
        trigger: "What payment methods do you accept?",
        content:
            "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    },
]





