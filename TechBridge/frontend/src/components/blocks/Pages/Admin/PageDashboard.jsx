import { Grid2X2 } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";

export default function PageDashboard() {
    let content;

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Grid2X2}
                title="Dashboard"
            />

            {content}
        </div>
    );
}