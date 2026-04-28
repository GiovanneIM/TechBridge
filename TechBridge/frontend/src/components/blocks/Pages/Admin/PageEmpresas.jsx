import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { Button } from "@/components/ui/button";
import { useEmpresas } from "@/hooks/useEmpresas";

export default function PageEmpresas() {
    let content;

    const { empresas } = useEmpresas({
        empresasIniciais: [],
        
    })

    content = (<>
        <div className="p-4 lg:p-6">
            <div className="flex flex-col bg-secondary p-2 w-sm justify-center rounded gap-2">
                <label className="font-semibold">Código da registro</label>
                <input placeholder="Código" className="border bg-muted p-1 rounded" />

                <Button>Procurar</Button>

            </div>

            <div>

            </div>
        </div>
    </>)

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Procurar Empresa"
            />

            {content}
        </div>
    );
}