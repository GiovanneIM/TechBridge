import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";

export default function PageEmpresas() {
    let content;

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