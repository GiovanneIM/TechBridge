import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function CardTecnico({nome, empresa, email, imagem}) {

    return (
        <Card className="relative w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video" />
            <div className="flex justify-center py-5">
                <img
                    src={imagem}
                    alt="Event cover"
                    className="relative z-20 w-20 h-20 md:w-32 md:h-32 object-cover rounded-full"
                />
            </div>
            <CardHeader>
                <CardTitle>{nome}</CardTitle>
                <CardDescription>
                    {empresa}
                </CardDescription>
                <CardDescription>
                    {email}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
