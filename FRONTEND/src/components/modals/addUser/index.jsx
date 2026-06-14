import { useState } from "react"
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

export default function ModalAddUser({ children, id_empresa }) {
    const [isOpen, setIsOpen] = useState(false);

    const [membro, setMembro] = useState({
        nome: '',
        cargo: '',
        email: '',
        cod_usuario: '',
    })

    // HOOK
    const { loading, error, mensagem, criarMembro } = useMembros();

    // LIMPANDO OS DADOS CASO O MODAL SEJA FECHADO
    useEffect(() => {
        setSetor({
            nome: '',
            cargo: '',
            email: '',
            cod_usuario: '',
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
                            <InputGroupInput placeholder="Nome" value={setor.nome}
                                onChange={(e) => { setSetor(prev => ({ ...prev, nome: e.target.value })) }}
                            />
                        </InputGroup>
                        <FieldError>{error.criarMembro?.zod?.nome}</FieldError>
                    </Field>

                    <Field>
                        <FieldLabel className="font-semibold text-secondary-foreground">Código</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Código" value={setor.cod_setor}
                                onChange={(e) => {
                                    const codigo = e.target.value.replace(' ', '_').toUpperCase()
                                    setSetor(prev => ({ ...prev, cod_setor: codigo }))
                                }}
                            />
                        </InputGroup>
                        <FieldError>{error.criarSetor?.zod?.cod_setor}</FieldError>
                    </Field>

                    <Field>
                        <FieldLabel className="font-semibold text-secondary-foreground">Descrição</FieldLabel>
                        <Textarea placeholder="Descrição do setor" className='h-24'
                            value={setor.descricao}
                            onChange={(e) => { setSetor(prev => ({ ...prev, descricao: e.target.value })) }}
                        />
                        <FieldError>{error.criarSetor?.zod?.descricao}</FieldError>
                    </Field>

                    <Field className="grid grid-cols-3">
                        <div className="flex flex-col gap-2">
                            <FieldLabel className="font-semibold text-secondary-foreground">Fundo</FieldLabel>
                            <Input
                                type="color" className="w-full p-1"
                                value={'#' + setor.cor_fundo}
                                onChange={(e) => {
                                    const novaCor = e.target.value.replace('#', '');

                                    setSetor(prev => ({
                                        ...prev,
                                        cor_fundo: novaCor
                                    }));
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <FieldLabel className="font-semibold text-secondary-foreground">Texto</FieldLabel>
                            <Input
                                type="color" className="w-full p-1"
                                value={'#' + setor.cor_texto}
                                onChange={(e) => {
                                    const novaCor = e.target.value.replace('#', '');

                                    setSetor(prev => ({
                                        ...prev,
                                        cor_texto: novaCor
                                    }));
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <FieldLabel className="font-semibold text-secondary-foreground">Ícone</FieldLabel>
                            <SelectIconSetor alterarIcone={(icon) => { setSetor(prev => ({ ...prev, icone: icon })) }} />
                        </div>
                    </Field>

                    <FieldError>{error.criarSetor?.zod?.cor_fundo}</FieldError>
                    <FieldError>{error.criarSetor?.zod?.cor_texto}</FieldError>
                    <FieldError>{error.criarSetor?.zod?.icone}</FieldError>

                </FieldGroup>

                <Separator />

                <div className="bg-secondary p-2 border rounded">
                    <p className="text-lg font-semibold text-secondary-foreground mb-3">
                        Setor
                    </p>
                    <CardSetor setor={{ ...setor, status: true }} botao={false} />
                </div>

                <Separator />

                {error.criarSetor && <FieldError>{error.criarSetor.mensagem}</FieldError>}
                {mensagem.criarSetor && <div className="text-green-600 font-semibold">{mensagem.criarSetor}</div>}

                <DialogFooter>

                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <Button className="bg-techbridge text-white"
                        onClick={() => { criarSetor(id_empresa, setor) }}
                        disabled={loading.criarSetor}
                    >
                        Registrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}