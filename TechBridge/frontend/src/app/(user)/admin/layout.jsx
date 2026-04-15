// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import SidebarBase from "@/components/Sidebar";
import SidebarNavAdmin from "@/components/Sidebar/nav/navAdmin";



export default function LayoutAdmin({ children }) {
    return (<>
        {/* Sidebar */}
        <Sidebar className="top-[61px] h-[calc(100vh-61px)] border-none" collapsible="icon">
            <SidebarContent>
                <SidebarBase>
                    <SidebarNavAdmin />
                </SidebarBase>
            </SidebarContent>
        </Sidebar>

        {/* Conteúdo */}
        <main className=" flex-1 flex border-x">
            {children}
        </main>
    </>);
}





// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
// import { jwtVerify } from 'jose'

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// export default async function AdminLayout({ children }) {
//   const token = cookies().get('token')?.value
//   if (!token) redirect('/login')

//   const { payload } = await jwtVerify(token, SECRET)

//   if (payload.cargo !== 'admin') {
//     redirect('/acesso-negado')
//   }

//   return <>{children}</>
// }
