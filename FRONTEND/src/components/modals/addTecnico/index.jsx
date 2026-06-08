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

export default function ModalNovoTecnico() {
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
                    <DialogTitle className="font-genty font-normal text-2xl">Registrar Técnico</DialogTitle>
                </DialogHeader>

                <FieldGroup className='flex items-center gap-4'>
                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">Nome</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Nome"
                                value={nome} onChange={(e) => { setNome(e.target.value) }}
                            />
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">E-mail</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="E-mail para contato"
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <InputGroupAddon>
                                <Mail />
                            </InputGroupAddon>
                        </InputGroup>
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