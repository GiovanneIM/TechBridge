import { useState } from "react"

import {
    Mail,
    Plus,
    User
} from "lucide-react"

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    Dialog,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SelectIconSetor } from "@/components/Form/IconSetor"

export default function ModalAddSetor() {
    const [isOpen, setIsOpen] = useState(false);


    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")


    return (<>
        <Button
            onClick={() => setIsOpen(true)}
            className="bg-techbridge text-md cursor-pointer"
            size='lg'
        >
            <Plus className='inline' /> Novo tecnico
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="font-genty font-normal text-2xl">
                        Registrar Setor
                    </DialogTitle>
                </DialogHeader>

                <FieldGroup className='flex items-center gap-4'>
                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">Nome</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Nome" />
                        </InputGroup>
                    </Field>

                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">Código</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Código" />
                        </InputGroup>
                    </Field>

                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">Descrição</FieldLabel>
                        <Textarea />
                    </Field>

                    <Field className="flex flex-row">
                        <div className="flex gap-4">
                            <FieldLabel className="font-genty text-muted-foreground">Cor</FieldLabel>
                            <Input type="color" className="w-12 p-1"/>
                        </div>

                        <div className="flex gap-4">
                            <FieldLabel className="font-genty text-muted-foreground">Ícone</FieldLabel>
                            <SelectIconSetor />
                        </div>
                    </Field>

                </FieldGroup>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button className="bg-techbridge">Registrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </>)
}