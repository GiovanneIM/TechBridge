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
import { useState } from "react";

export default function Suporte() {

    const LIMITE = 300;
    const [comentario, setComentario] = useState('')

    return (
        <div className="flex grid-col md:grid-col-2 justify-center gap-4 m-5 md:mx-20 lg:mx-10 xl:mx-50 mb-15 mt-5">

            <div className="flex flex-col gap-4">
                {/* Perguntas frequentes */}
                <Card className={'min-w-180 border-none shadow-2xl'}>
                    <CardHeader>
                        <CardTitle className={'text-2xl font-semibold'}>Perguntas Frequentes</CardTitle>
                        <CardDescription className={'text-gray-400 text-md'}>
                            Perguntas comuns feitas por nossos clientes
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Accordion
                            type="single" collapsible defaultValue="plans"
                        >
                            {items.map((item) => (
                                <AccordionItem key={item.value} value={item.value} className="w-full">
                                    <AccordionTrigger className={'p-4 font-bold text-lg shadow-2xl mb-4'}>{item.trigger}</AccordionTrigger>
                                    <AccordionContent>{item.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                {/* Perguntas frequentes */}
                <Card className={'min-w-180 border-none shadow-2xl'}>
                    <CardHeader>
                        <CardTitle className={'text-2xl font-semibold'}>Perguntas Frequentes</CardTitle>
                        <CardDescription className={'text-gray-400 text-md'}>
                            Perguntas comuns feitas por nossos clientes
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Accordion
                            type="single" collapsible defaultValue="plans"
                        >
                            {items.map((item) => (
                                <AccordionItem key={item.value} value={item.value} className="w-full">
                                    <AccordionTrigger className={'p-4 font-bold text-lg shadow-2xl mb-4'}>{item.trigger}</AccordionTrigger>
                                    <AccordionContent>{item.content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

            </div>

            <div className="flex flex-col gap-4">
                {/* Solicitar suporte */}
                <Card className={'min-w-150 border-none shadow-2xl'}>
                    <CardHeader>
                        <CardTitle className={'text-3xl font-semibold'}>Solicitar suporte</CardTitle>
                        <CardDescription className={'text-gray-400 text-md'}>
                            Entre em contato para que possamos ajuda-lo
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        {/* Nome */}
                        <InputGroup className={'min-h-12'}>
                            <InputGroupInput placeholder="Nome" />
                            <InputGroupAddon >
                            </InputGroupAddon>
                        </InputGroup>

                        {/* E-mail */}
                        <InputGroup className={'min-h-12'}>
                            <InputGroupInput type="email" placeholder="E-mail" />
                            <InputGroupAddon>
                            </InputGroupAddon>
                        </InputGroup>

                        {/* Empresa */}
                        <InputGroup className={'min-h-12'}>
                            <InputGroupInput placeholder="Empresa" />
                            <InputGroupAddon>
                            </InputGroupAddon>
                        </InputGroup>

                        {/* Comentário */}
                        <InputGroup>
                            <InputGroupTextarea
                                id="textarea-code-32"
                                placeholder="Descreva o motivo do contato"
                                className="min-h-50"
                            />
                            <InputGroupText>{LIMITE - comentario.length} caracteres restantes</InputGroupText>
                        </InputGroup>
                        <Button className={'h-10 text-md font-semibold'}>Enviar mensagem</Button>
                    </CardContent>
                </Card>

                <Card className={'min-h-5 border-none shadow-2xl justify-center gap-0 pb-0'}>
                    <div className="justify-center items-center flex">
                    <Image
                        src="/TechBridge/Logo.svg"
                        width={90}
                        height={40}
                        alt="Imagem logo"
                    />
                    </div>
                    {/* Background (onda) */}
                    <div className="inset-x-0 bottom-0 z-0 pointer-events-none">
                        <svg
                            className="w-full rounded-xl h-10"
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
                </Card>
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





