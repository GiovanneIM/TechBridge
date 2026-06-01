import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { User2 } from "lucide-react"

export function CardUsuario({ user }) {

    return (
        <div className="
            border rounded-2xl p-4
            bg-muted/20
            flex flex-col sm:flex-row
            gap-5
            transition hover:border-primary/30 hover:shadow-sm
        ">
            {/* FOTO */}
            <div className="
                relative w-28 h-28
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
                        src={`http://localhost:3000/uploads/imagens/usuarios/${user.id}/${user.foto_perfil}`}
                        alt={`${user.nome} perfil`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User2 size={50} className="text-muted-foreground" />
                )}
            </div>

            {/* INFORMAÇÕES */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* NOME */}
                    <div className="rounded-xl border bg-background p-3">
                        <p className="text-sm text-muted-foreground">
                            Nome
                        </p>

                        <p className="font-semibold">
                            {user?.nome ?? '(--) ----------'}
                        </p>
                    </div>

                    {/* NOME */}
                    <div className="rounded-xl border bg-background p-3">
                        <p className="text-sm text-muted-foreground">
                            cargo
                        </p>

                        <p className="font-semibold">
                            {user?.cargo ?? '(--) ----------'}
                        </p>
                    </div>

                    {/* EMAIL */}
                    <div className="rounded-xl border bg-background p-3">
                        <p className="text-sm text-muted-foreground">
                            E-mail
                        </p>

                        <p className="font-semibold break-all">
                            {user.email ?? '- - - - -'}
                        </p>
                    </div>

                    {/* TELEFONE */}
                    <div className="rounded-xl border bg-background p-3">
                        <p className="text-sm text-muted-foreground">
                            Telefone
                        </p>

                        <p className="font-semibold">
                            {user?.telefone ?? '(--) ----------'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
