"use client";

// PÁGINA DE PERFIL 

import { useUsers } from "@/hooks/useUsers";

export default function PagePerfil({ tecnicosIniciais = [] }) {

    const { tecnicos, loading, error, refetchTecnicos } =
        useUsers({
            tecnicosIniciais: tecnicosIniciais,
            fetchOnMount: tecnicosIniciais?.length === 0,
        });

    return (<>
        {tecnicos.map((tecnico, i) => (
            <div key={i} className="mx-auto max-w-4xl space-y-6 px-4 py-10">
                <div
                    data-slot="card"
                    className="flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm"
                >
                    <div data-slot="card-content" className="px-6">
                        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                            <div className="relative">
                                <span
                                    data-slot="avatar"
                                    data-size="default"
                                    className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 h-24 w-24"
                                >
                                    <img src={tecnico.foto_perfil} alt="Img_user" className="justify-center items-center flex gap-0" />
                                </span>
                                <button
                                    data-slot="button"
                                    data-variant="outline"
                                    data-size="icon"
                                    className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 size-9 absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-camera"
                                        aria-hidden="true"
                                    >
                                        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                                        <circle cx={12} cy={13} r={3} />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <h1 className="text-2xl font-bold">{tecnico.nome}</h1>
                                    <span
                                        data-slot="badge"
                                        data-variant="secondary"
                                        className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3 bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90"
                                    >
                                        Pro Member
                                    </span>
                                </div>
                                <p className="text-muted-foreground">{tecnico.cargo}</p>
                                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-mail size-4"
                                            aria-hidden="true"
                                        >
                                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                            <rect x={2} y={4} width={20} height={16} rx={2} />
                                        </svg>
                                        {tecnico.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-map-pin size-4"
                                            aria-hidden="true"
                                        >
                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                            <circle cx={12} cy={10} r={3} />
                                        </svg>
                                        {tecnico.local_nasc}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-calendar size-4"
                                            aria-hidden="true"
                                        >
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <rect width={18} height={18} x={3} y={4} rx={2} />
                                            <path d="M3 10h18" />
                                        </svg>
                                        Efetivado em {tecnico.data_efetivacao.split('-')[2]+'/'}{tecnico.data_efetivacao.split('-')[1]+'/'}{tecnico.data_efetivacao.split('-')[0]}
                                    </div>
                                </div>
                            </div>
                            <button
                                data-slot="button"
                                data-variant="default"
                                data-size="default"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    dir="ltr"
                    data-orientation="horizontal"
                    data-slot="tabs"
                    className="group/tabs flex gap-2 data-[orientation=horizontal]:flex-col space-y-6"
                >
                    <div
                        role="tablist"
                        aria-orientation="horizontal"
                        data-slot="tabs-list"
                        data-variant="default"
                        className="group/tabs-list items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none bg-muted grid w-full grid-cols-4"
                        tabIndex={0}
                        data-orientation="horizontal"
                        style={{ outline: "none" }}
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-selected="true"
                            aria-controls="radix-_R_59bsnpfjb_-content-personal"
                            data-state="active"
                            id="radix-_R_59bsnpfjb_-trigger-personal"
                            data-slot="tabs-trigger"
                            className="relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                        >
                            Perssoal
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected="false"
                            aria-controls="radix-_R_59bsnpfjb_-content-account"
                            data-state="inactive"
                            id="radix-_R_59bsnpfjb_-trigger-account"
                            data-slot="tabs-trigger"
                            className="relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                        >
                            Conta
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected="false"
                            aria-controls="radix-_R_59bsnpfjb_-content-security"
                            data-state="inactive"
                            id="radix-_R_59bsnpfjb_-trigger-security"
                            data-slot="tabs-trigger"
                            className="relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                        >
                            Segurança
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected="false"
                            aria-controls="radix-_R_59bsnpfjb_-content-notifications"
                            data-state="inactive"
                            id="radix-_R_59bsnpfjb_-trigger-notifications"
                            data-slot="tabs-trigger"
                            className="relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                        >
                            Notificações
                        </button>
                    </div>
                    <div
                        data-state="active"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_59bsnpfjb_-trigger-personal"
                        id="radix-_R_59bsnpfjb_-content-personal"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none space-y-6"
                        style={{ animationDuration: "0s" }}
                    >
                        <div
                            data-slot="card"
                            className="flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm"
                        >
                            <div
                                data-slot="card-header"
                                className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                            >
                                <div data-slot="card-title" className="leading-none font-semibold">
                                    Informação Pessoal
                                </div>
                                <div
                                    data-slot="card-description"
                                    className="text-sm text-muted-foreground"
                                >
                                    Atualize suas informações pessoais
                                </div>
                            </div>
                            <div data-slot="card-content" className="px-6 space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label
                                            data-slot="label"
                                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                            htmlFor="firstName"
                                        >
                                            Nome
                                        </label>
                                        <input
                                            data-slot="input"
                                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                            id="firstName"
                                            defaultValue={tecnico.nome.split(' ')[0]}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            data-slot="label"
                                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                            htmlFor="lastName"
                                        >
                                            Sobrenome
                                        </label>
                                        <input
                                            data-slot="input"
                                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                            id="lastName"
                                            defaultValue={tecnico.nome.split(' ')[1]}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            data-slot="label"
                                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            data-slot="input"
                                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                            id="email"
                                            defaultValue={tecnico.email}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            data-slot="label"
                                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                            htmlFor="phone"
                                        >
                                            Telefone
                                        </label>
                                        <input
                                            data-slot="input"
                                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                            id="phone"
                                            defaultValue={tecnico.telefone}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            data-slot="label"
                                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                            htmlFor="jobTitle"
                                        >
                                            Cargo
                                        </label>
                                        <input
                                            data-slot="input"
                                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                            id="jobTitle"
                                            defaultValue={tecnico.cargo}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            data-slot="label"
                                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                            htmlFor="company"
                                        >
                                            Empresa
                                        </label>
                                        <input
                                            data-slot="input"
                                            className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                            id="company"
                                            defaultValue={tecnico.empresa+'.'}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        data-slot="label"
                                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                        htmlFor="bio"
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                        data-slot="textarea"
                                        className="flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
                                        id="bio"
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        defaultValue={
                                            tecnico.bio
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        data-state="inactive"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_59bsnpfjb_-trigger-account"
                        hidden=""
                        id="radix-_R_59bsnpfjb_-content-account"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none space-y-6"
                    />
                    <div
                        data-state="inactive"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_59bsnpfjb_-trigger-security"
                        hidden=""
                        id="radix-_R_59bsnpfjb_-content-security"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none space-y-6"
                    />
                    <div
                        data-state="inactive"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_59bsnpfjb_-trigger-notifications"
                        hidden=""
                        id="radix-_R_59bsnpfjb_-content-notifications"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none space-y-6"
                    />
                </div>
            </div>

        ))}
    </>);
}
