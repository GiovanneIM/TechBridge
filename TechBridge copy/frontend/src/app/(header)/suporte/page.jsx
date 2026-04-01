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
import {
    CheckIcon,
    MailIcon,
    SearchIcon,
    Factory,
    MessageCircleMore,
} from "lucide-react";
import { useState } from "react";

export default function Suporte() {

    const [comentario, setComentario] = useState('')

    return (
        <div className="lg:grid grid-cols-2 gap-4 m-5 md:mx-20 lg:mx-10 xl:mx-50">

            {/* Perguntas frequentes */}
            <Card>
                <CardHeader>
                    <CardTitle>Perguntas Frequentes</CardTitle>
                    <CardDescription>
                        Perguntas comuns feitas por nossos clientes
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Accordion
                        type="single" collapsible defaultValue="plans"
                    >
                        {items.map((item) => (
                            <AccordionItem key={item.value} value={item.value} className="w-full">
                                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                                <AccordionContent>{item.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            <div></div>

            <div></div>

            {/* Solicitar suporte */}
            <Card>
                <CardHeader>
                    <CardTitle>Solicitar suporte</CardTitle>
                    <CardDescription>
                        Entre em contato para que possamos ajuda-lo
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    {/* Nome */}
                    <InputGroup>
                        <InputGroupInput placeholder="Nome" />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    {/* E-mail */}
                    <InputGroup>
                        <InputGroupInput type="email" placeholder="E-mail" />
                        <InputGroupAddon>
                            <MailIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Empresa */}
                    <InputGroup>
                        <InputGroupInput placeholder="Empresa" />
                        <InputGroupAddon>
                            <Factory />
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Comentário */}
                    <InputGroup>
                        <InputGroupTextarea
                            id="textarea-code-32"
                            placeholder="Descreva o motivo do contato"
                            className="min-h-50"
                        />

                        <InputGroupAddon align="block-start" className="border-b flex justify-between flex-wrap">
                            <InputGroupText className="font-mono font-medium">
                                <MessageCircleMore />
                                Comentário
                            </InputGroupText>

                            <InputGroupText>{300 - comentario.lenght} caracteres restantes</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </CardContent>
            </Card>

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





