import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FormMac() {
    return (
        <DialogContent className="sm:max-w-sm">
            <DialogHeader>
                <DialogTitle>Adicionar técnico</DialogTitle>
            </DialogHeader>

            <FieldGroup>
                <Field>
                    <Label htmlFor="name-1">Nome</Label>
                    <Input id="name"/>
                </Field>

                <Field>
                    <Label htmlFor="username-1">Email</Label>
                    <Input id="email"/>
                </Field>
                <Field>
                    <Label htmlFor="username-1">Empresa</Label>
                    <Input id="empresa"/>
                </Field>
            </FieldGroup>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    )
}