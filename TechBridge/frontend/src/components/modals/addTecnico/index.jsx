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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Plus, User } from "lucide-react"
import { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export default function ModalNovoTecnico() {
    const [isOpen, setIsOpen] = useState(false);


    return (<>
        <Button
            onClick={() => setIsOpen(true)}
            className="bg-techbridge font-genty text-md cursor-pointer"
            size='lg'
        >
            <Plus className='inline' /> Novo tecnico
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="font-genty font-normal">Registrar Técnico</DialogTitle>
                </DialogHeader>

                <FieldGroup className='flex items-center gap-4'>
                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">Nome</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Nome" />
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field>
                        <FieldLabel className="font-genty text-muted-foreground">E-mail</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="E-mail para contato" />
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
                    <Button className="bg-techbridge ">Registrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </>)
}