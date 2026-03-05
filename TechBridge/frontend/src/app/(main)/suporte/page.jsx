// PÁGINA DE SUPORTE PARA O USUÁRIO

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    CheckIcon,
    MailIcon,
    SearchIcon,
    Factory,
    MessageCircleMore,
} from "lucide-react"

export default function Suporte() {
    return (<>
        <div className="grid grid-cols-2 mx-50">

            {/* Perguntas frequentes */}
            <div>
                <div className="font-bold text-2xl">Perguntas Frequentes</div>
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                    className="max-w-lg"
                >
                    {items.map((item) => (
                        <AccordionItem key={item.value} value={item.value}>
                            <AccordionTrigger>{item.trigger}</AccordionTrigger>
                            <AccordionContent>{item.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div></div>

            <div></div>

            {/* Solicitar suporte */}
            <div>
                <div className="font-bold text-2xl">Solicitar Suporte</div>
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
                    <InputGroupAddon align="inline-end">
                        <CheckIcon />
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

                        <InputGroupText>300 caracteres restantes</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </div>

        </div>
    </>)
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





