// "use client";

// import ErrorPage from '../../HolderPages/ErrorPage';
// import LoadingPage from '../../HolderPages/LoadingPage';
// import HeaderPage from '../../Header/HeaderPage';

// import { BriefcaseBusiness, Network, PaintRoller, Warehouse, Wrench, RotateCw } from "lucide-react"
// import { Separator } from "../../../ui/separator"
// import { useSetores } from "@/hooks/useSetores"

// const icones = {
//     "Wrench": <Wrench className="h-20 w-20 text-white" />,
//     "PaintRoller": <PaintRoller className="h-20 w-20 text-white" />,
//     "BriefcaseBusiness": <BriefcaseBusiness className="h-15 w-20 text-white" />,
//     "Network": <Network className="h-20 w-20 text-white" />
// }

// export default function PageSetores({
//     setoresIniciais = []
// }) {

//     const {
//         setores,
//         loadingSetores,
//         errorSetores,
//         refetchSetores
//     } = useSetores({
//         setoresIniciais: setoresIniciais,
//         fetchOnMount: setoresIniciais?.length === 0
//     })


//     const icones = {
//         "Wrench": <Wrench className="h-20 w-20 text-white" />,
//         "PaintRoller": <PaintRoller className="h-20 w-20 text-white" />,
//         "BriefcaseBusiness": <BriefcaseBusiness className="h-20 w-20 text-white" />,
//         "Network": <Network className="h-20 w-20 text-white" />
//     }

//     return (
//         <div className="flex-1 flex flex-col bg-gray-50">
//             {/* Header */}
//             <div className="flex h-14 items-center border-b bg-white/80 backdrop-blur px-6">
//                 <div className="flex items-center gap-3">
//                     <Warehouse className="w-5 h-5 text-gray-700" />
//     // Verificando se a página está sendo carregada pela primeira vez
//     const isFirstLoad = loadingSetores.fetch && (setores ?? []).length === 0;

//     // Conteúdo da página
//     let content;

//     // Se estiver sendo carregada pela 1ª vez
//     if (isFirstLoad) {
//         content = (
//             <LoadingPage
//                 loadingTitle="Carregando Setores"
//                 loadingSubtitle={["Aguarde alguns segundos"]}
//             />
//         )
//     }

//     // Se houve erro ao carregar
//     else if (errorSetores.fetch) {
//         content = (
//             <ErrorPage
//                 errorTitle={"Erro ao carregar setores"}
//                 errorSubtitle={[
//                     "Houve um erro ao carregar setores",
//                     "Por favor recarregue a página para tentar novamente"
//                 ]}
//             />
//         )
//     }

//     // Se estiver recarregando os dados
//     else if (loadingSetores.fetch) {
//         content = (<></>)
//     }

//     // Dados carregados e sem erro
//     else (
//         <div className='flex-1 flex flex-col'>
//             {/* Header da página */}
//             <div
//                 className="
// 						flex h-12 shrink-0 items-center gap-2 border-b 
// 						transition-[width,height] ease-linear 
// 						group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
// 					"
//             >
//                 <div className="w-full flex items-center justify-between gap-3 px-4 lg:px-6">
//                     <div className='flex gap-1 lg:gap-2'>
//                         <Warehouse className="-ml-1" />

//                     <Separator orientation="vertical" className="h-6" />

//                     <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
//                         Setores
//                     </h1>
//                 </div>
//             </div>

//             {/* Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
//                 {setores.map((setor, i) => (
//                     <div
//                         key={i}
//                         className="
//                     group rounded-2xl overflow-hidden
//                     bg-white shadow-sm hover:shadow-2xl
//                     transition-all duration-300 hover:-translate-y-2
//                     border border-gray-100
//                 "
//                         onClick={() => window.location.href = `/setores/${setor.id}`}
//                         style={{ '--i': i }}
//                     >
//                         {/* Header */}
//                         <div
//                             className={`
//                         p-6 min-h-45 flex flex-col gap-5 text-white
//                         bg-linear-to-r ${setor.cor}
//                     `}
//                         >
//                             {/* Ícone */}
//                             <div className="text-4xl opacity-90 transition-transform">
//                                 {icones[setor.icone]}
//                             </div>

//                             {/* Título + Badge */}
//                             <div className="flex items-start justify-between">
//                                 <h2 className="text-2xl font-bold leading-tight">
//                                     {setor.nome}
//                                 </h2>

//                                 {setor.badge && (
//                                     <span className="
//                                 bg-white/20 backdrop-blur
//                                 text-xs font-medium px-3 py-1
//                                 rounded-full border border-white/30
//                             ">
//                                         {setor.badge}
//                             {/* Título */}
//                             <div className="text-3xl justify-between flex font-bold pb-4">
//                                 {setor.nome}

//                                 {/* Badge */}
//                                 {setor.descricao && (
//                                     <span className="self-end bg-white/20 text-xs px-3 py-1 rounded-full">
//                                         {setor.descricao}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Conteúdo */}
//                         <div className="p-6">
//                             <p className="text-lg font-semibold text-gray-800">
//                                 {setor.nome}
//                             </p>

//                             <p className="mt-3 text-gray-600 leading-relaxed">
//                                 {setor.descricao}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )


//     return (
//         <div className="flex-1 flex flex-col">
//             {/* Header da página */}
//             <HeaderPage
//                 icon={<Warehouse />}
//                 title="Setores"
//                 actions={[
//                     loadingSetores.fetch
//                         ? {
//                             icon: <RotateCw />,
//                             text: "Carregando",
//                             disabled: true,
//                         }
//                         : {
//                             icon: <RotateCw />,
//                             text: "Recarregar Setores",
//                             onClick: () => { refetchSetores() },
//                         },
//                 ]}
//             />

//             {content}
//         </div>
//     );
// }