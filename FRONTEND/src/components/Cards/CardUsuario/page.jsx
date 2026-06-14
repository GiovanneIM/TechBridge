import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { API_URL } from "@/lib/api"
import { ArrowRightCircle, User2 } from "lucide-react"
import Link from "next/link"

export function CardUsuario({ user }) {

    return (
        <div className="
            border rounded-2xl p-4
            bg-muted/20
            flex flex-col
            gap-3
            transition hover:border-primary/30 hover:shadow-sm
        ">
            <div className="flex gap-3">
                {/* FOTO */}
                <div className="
                        relative w-30 h-30
                        shrink-0
                        rounded-2xl
                        overflow-hidden
                        border
                        bg-muted
                        flex items-center justify-center
                        mx-auto sm:mx-0
                    ">
                    {user?.foto_perfil ? (
                        <img
                            src={API_URL + `/uploads/imagens/usuarios/${user.id}/${user.foto_perfil}`}
                            alt={`${user.nome} perfil`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User2 size={50} className="text-muted-foreground" />
                    )}
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    {/* NOME */}
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Nome
                        </p>

                        <p className="font-semibold border py-1 px-2 rounded bg-muted">
                            {user?.nome ?? '(--) ----------'}
                        </p>
                    </div>

                    {/* CARGO */}
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                            Cargo
                        </p>

                        <p className="font-semibold border py-1 px-2 rounded bg-muted">
                            {user?.cargo ?? '(--) ----------'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
                {/* CÓDIGO */}
                {/* <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                        Código de identificação
                    </p>

                    <p className="font-semibold break-all border py-1 px-2 rounded bg-muted">
                        # {user.cod_usuario ?? '- - - - -'}
                    </p>
                </div> */}

                {/* EMAIL */}
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                        E-mail
                    </p>

                    <p className="font-semibold break-all border py-1 px-2 rounded bg-muted">
                        {user.email ?? '- - - - -'}
                    </p>
                </div>

                {/* TELEFONE */}
                <div>
                    <p className="text-sm text-muted-foreground">
                        Telefone
                    </p>

                    <p className="font-semibold border py-1 px-2 rounded bg-muted">
                        {user?.telefone ?? '(--) ----------'}
                    </p>
                </div>
            </div>

            <Button className="button-background border" asChild>
                <Link href={`/admin/empresas/${user.id_empresa}/membros/${user.cod_usuario}`}>Ver usuario <ArrowRightCircle /></Link>
            </Button>
        </div>
    )
}