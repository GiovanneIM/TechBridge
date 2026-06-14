import { useEffect, useState } from "react"
import { useMembros } from "@/hooks/useMembros"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    Dialog,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupInput
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SelectIconSetor } from "@/components/Form/IconSetor"
import { CardSetor } from "@/components/Cards/CardSetores/page"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModalAddUser({ children, id_empresa, setFiltro }) {
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState({
        nome: '',
        tipo_usuario: 4,
        email: '',
    })

    // HOOK
    const { loading, error, mensagem, criarMembro } = useMembros();

    // LIMPANDO OS DADOS CASO O MODAL SEJA FECHADO
    useEffect(() => {
        setUser({
            nome: '',
            tipo_usuario: 4,
            email: '',
        })
    }, [isOpen])

    return (<>
        {/* BOTÃO PARA ABRIR MODAL */}
        <div onClick={() => setIsOpen(true)}>
            {children}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-svh overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="font-genty font-normal text-2xl">
                        Registrar Membro
                    </DialogTitle>
                </DialogHeader>

                <Separator />

                <FieldGroup className="flex items-center gap-4">
                    <Field>
                        <FieldLabel className="font-semibold text-secondary-foreground">Nome</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Nome" value={user.nome}
                                onChange={(e) => { setUser(prev => ({ ...prev, nome: e.target.value })) }}
                            />
                        </InputGroup>
                        <FieldError>{error.criarMembro?.zod?.nome}</FieldError>
                    </Field>

                    {/* CARGO */}
                    <Field>
                        <FieldLabel>Cargo</FieldLabel>

                        <Tabs
                            value={String(user.tipo_usuario)}
                            onValueChange={(value) =>
                                setUser((prev) => ({ ...prev, tipo_usuario: Number(value) }))
                            }
                            className="w-full bg-muted p-1 rounded-md"
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="2" className="flex-1">Gerente Principal</TabsTrigger>
                                <TabsTrigger value="3" className="flex-1">Gerente</TabsTrigger>
                                <TabsTrigger value="4" className="flex-1">Tecnico</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </Field>

                    <Field>
                        <FieldLabel className="font-semibold text-secondary-foreground">E-mail</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="E-mail" value={user.email}
                                onChange={(e) => { setUser(prev => ({ ...prev, email: e.target.value })) }}
                            />
                        </InputGroup>
                        <FieldError>{error.criarMembro?.zod?.email}</FieldError>
                    </Field>
                </FieldGroup>

                <Separator />

                {error.criarMembro && <FieldError>{error.criarMembro.mensagem}</FieldError>}
                {mensagem.criarMembro && <div className="text-green-600 font-semibold">{mensagem.criarMembro}</div>}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <Button className="bg-techbridge text-white"
                        onClick={async () => {
                            const sucesso = await criarMembro(id_empresa, user);

                            if (sucesso) {
                                setFiltro((prev) => ({
                                    ...prev,
                                    texto: user.email,
                                    status: 'ativa',
                                    page: 1,
                                }))
                            }
                        }}
                        disabled={loading.criarMembro}
                    >
                        Registrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}