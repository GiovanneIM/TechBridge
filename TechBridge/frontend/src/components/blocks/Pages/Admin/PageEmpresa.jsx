import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";

export default function PageEmpresa () {
    let content;

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Empresa"
            />

            {content}
        </div>
    );
}