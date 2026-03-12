

export default function TesteKaban() {
    return (<>
        <div className="@container/main p-(--content-padding) xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto">
            <div className="space-y-4">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight lg:text-2xl">
                        Kanban Board
                    </h1>
                    <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            <span
                                data-slot="avatar"
                                data-size="default"
                                className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                            >
                                <img
                                    data-slot="avatar-image"
                                    className="aspect-square size-full object-cover"
                                    alt="..."
                                    src="/images/avatars/05.png"
                                />
                            </span>
                            <span
                                data-slot="avatar"
                                data-size="default"
                                className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                            >
                                <img
                                    data-slot="avatar-image"
                                    className="aspect-square size-full object-cover"
                                    alt="..."
                                    src="/images/avatars/04.png"
                                />
                            </span>
                            <span
                                data-slot="avatar"
                                data-size="default"
                                className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                            >
                                <img
                                    data-slot="avatar-image"
                                    className="aspect-square size-full object-cover"
                                    alt="..."
                                    src="/images/avatars/03.png"
                                />
                            </span>
                            <span
                                data-slot="avatar"
                                data-size="default"
                                className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                            >
                                <span
                                    data-slot="avatar-fallback"
                                    className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full group-data-[size=sm]/avatar:text-xs text-xs"
                                >
                                    +5
                                </span>
                            </span>
                        </div>
                        <button
                            data-slot="dialog-trigger"
                            data-variant="outline"
                            data-size="default"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-_R_19av5ubt9fiudb_"
                            data-state="closed"
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
                                className="lucide lucide-user-plus"
                                aria-hidden="true"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx={9} cy={7} r={4} />
                                <line x1={19} x2={19} y1={8} y2={14} />
                                <line x1={22} x2={16} y1={11} y2={11} />
                            </svg>
                            <span className="hidden lg:inline">Add Assigne</span>
                        </button>
                    </div>
                </div>
                <div
                    dir="ltr"
                    data-orientation="horizontal"
                    data-slot="tabs"
                    className="group/tabs flex gap-2 data-[orientation=horizontal]:flex-col w-full"
                >
                    <div className="mb-2 flex justify-between gap-2">
                        <div
                            role="tablist"
                            aria-orientation="horizontal"
                            data-slot="tabs-list"
                            data-variant="default"
                            className="rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col bg-muted"
                            tabIndex={0}
                            data-orientation="horizontal"
                            style={{ outline: "none" }}
                        >
                            <button
                                type="button"
                                role="tab"
                                aria-selected="true"
                                aria-controls="radix-_R_2av5ubt9fiudb_-content-board"
                                data-state="active"
                                id="radix-_R_2av5ubt9fiudb_-trigger-board"
                                data-slot="tabs-trigger"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                                tabIndex={-1}
                                data-orientation="horizontal"
                                data-radix-collection-item=""
                            >
                                Board
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected="false"
                                aria-controls="radix-_R_2av5ubt9fiudb_-content-list"
                                data-state="inactive"
                                id="radix-_R_2av5ubt9fiudb_-trigger-list"
                                data-slot="tabs-trigger"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                                tabIndex={-1}
                                data-orientation="horizontal"
                                data-radix-collection-item=""
                            >
                                List
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected="false"
                                aria-controls="radix-_R_2av5ubt9fiudb_-content-table"
                                data-state="inactive"
                                id="radix-_R_2av5ubt9fiudb_-trigger-table"
                                data-slot="tabs-trigger"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100"
                                tabIndex={-1}
                                data-orientation="horizontal"
                                data-radix-collection-item=""
                            >
                                Table
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative hidden w-auto lg:block">
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
                                    className="lucide lucide-search absolute top-2.5 left-3 size-4 opacity-50"
                                    aria-hidden="true"
                                >
                                    <path d="m21 21-4.34-4.34" />
                                    <circle cx={11} cy={11} r={8} />
                                </svg>
                                <input
                                    data-slot="input"
                                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ps-8"
                                    placeholder="Search tasks..."
                                    defaultValue=""
                                />
                            </div>
                            <div className="none lg:hidden">
                                <button
                                    data-slot="popover-trigger"
                                    data-variant="outline"
                                    data-size="default"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                                    type="button"
                                    aria-haspopup="dialog"
                                    aria-expanded="false"
                                    aria-controls="radix-_R_keav5ubt9fiudb_"
                                    data-state="closed"
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
                                        className="lucide lucide-search"
                                        aria-hidden="true"
                                    >
                                        <path d="m21 21-4.34-4.34" />
                                        <circle cx={11} cy={11} r={8} />
                                    </svg>
                                </button>
                            </div>
                            <button
                                data-slot="popover-trigger"
                                data-variant="outline"
                                data-size="default"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="radix-_r_1d_"
                                data-state="closed"
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
                                    className="lucide lucide-sliders-horizontal"
                                    aria-hidden="true"
                                >
                                    <line x1={21} x2={14} y1={4} y2={4} />
                                    <line x1={10} x2={3} y1={4} y2={4} />
                                    <line x1={21} x2={12} y1={12} y2={12} />
                                    <line x1={8} x2={3} y1={12} y2={12} />
                                    <line x1={21} x2={16} y1={20} y2={20} />
                                    <line x1={12} x2={3} y1={20} y2={20} />
                                    <line x1={14} x2={14} y1={2} y2={6} />
                                    <line x1={8} x2={8} y1={10} y2={14} />
                                    <line x1={16} x2={16} y1={18} y2={22} />
                                </svg>
                                <span className="hidden lg:inline">Filters</span>
                            </button>
                            <button
                                data-slot="dialog-trigger"
                                data-variant="default"
                                data-size="default"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="radix-_R_14eav5ubt9fiudb_"
                                data-state="closed"
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
                                    className="lucide lucide-circle-plus"
                                    aria-hidden="true"
                                >
                                    <circle cx={12} cy={12} r={10} />
                                    <path d="M8 12h8" />
                                    <path d="M12 8v8" />
                                </svg>
                                <span className="hidden lg:inline">Add Board</span>
                            </button>
                        </div>
                    </div>
                    <div
                        data-state="active"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_2av5ubt9fiudb_-trigger-board"
                        id="radix-_R_2av5ubt9fiudb_-content-board"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none"
                        style={{}}
                    >
                        <div
                            aria-orientation="horizontal"
                            data-orientation="horizontal"
                            data-slot="kanban-board"
                            className="size-full flex-row flex w-full gap-4 overflow-x-auto pb-4"
                        >
                            <div
                                id="_R_ammav5ubt9fiudb_"
                                data-slot="kanban-column"
                                className="bg-muted flex size-full flex-col gap-2 rounded-lg p-2.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-dragging:cursor-grabbing w-[340px] min-w-[340px]"
                                style={{}}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">Backlog</span>
                                        <span
                                            data-slot="badge"
                                            data-variant="outline"
                                            className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
                                        >
                                            4
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <button
                                            data-slot="kanban-column-handle"
                                            data-variant="ghost"
                                            data-size="icon"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 select-none disabled:pointer-events-none disabled:opacity-50 cursor-grab data-dragging:cursor-grabbing"
                                            type="button"
                                            aria-controls="_R_ammav5ubt9fiudb_"
                                            role="button"
                                            tabIndex={0}
                                            aria-disabled="false"
                                            aria-roledescription="sortable"
                                            aria-describedby="_R_mav5ubt9fiudb_"
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
                                                className="lucide lucide-grip-vertical h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <circle cx={9} cy={12} r={1} />
                                                <circle cx={9} cy={5} r={1} />
                                                <circle cx={9} cy={19} r={1} />
                                                <circle cx={15} cy={12} r={1} />
                                                <circle cx={15} cy={5} r={1} />
                                                <circle cx={15} cy={19} r={1} />
                                            </svg>
                                        </button>
                                        <button
                                            data-slot="tooltip-trigger"
                                            data-variant="ghost"
                                            data-size="icon"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
                                            data-state="closed"
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
                                                className="lucide lucide-circle-plus"
                                                aria-hidden="true"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M8 12h8" />
                                                <path d="M12 8v8" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 p-0.5">
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_R_tammav5ubt9fiudb_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Set up automated backups
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Mia Avatar"
                                                            src="/images/avatars/05.png"
                                                        />
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Jack Avatar"
                                                            src="/images/avatars/06.png"
                                                        />
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="95.50441666912971"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    5%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    low
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>0</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>3</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_R_15ammav5ubt9fiudb_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Implement blog search functionality
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Olivia Avatar"
                                                            src="/images/avatars/07.png"
                                                        />
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Henry Avatar"
                                                            src="/images/avatars/08.png"
                                                        />
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="100.53096491487338"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    0%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    medium
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>1</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_r_17_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Dark mode toggle implementation
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Charlie Avatar"
                                                            src="/images/avatars/09.png"
                                                        />
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Ava Avatar"
                                                            src="/images/avatars/10.png"
                                                        />
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="60.31857894892403"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    40%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    high
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>2</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>6</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_r_1e_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Accessibility improvements
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <span
                                                            data-slot="avatar-fallback"
                                                            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs"
                                                        >
                                                            NT
                                                        </span>
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <span
                                                            data-slot="avatar-fallback"
                                                            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs"
                                                        >
                                                            EL
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="65.3451271946677"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    35%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    low
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>1</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="_R_immav5ubt9fiudb_"
                                data-slot="kanban-column"
                                className="bg-muted flex size-full flex-col gap-2 rounded-lg p-2.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-dragging:cursor-grabbing w-[340px] min-w-[340px]"
                                style={{}}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">In Progress</span>
                                        <span
                                            data-slot="badge"
                                            data-variant="outline"
                                            className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
                                        >
                                            3
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <button
                                            data-slot="kanban-column-handle"
                                            data-variant="ghost"
                                            data-size="icon"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 select-none disabled:pointer-events-none disabled:opacity-50 cursor-grab data-dragging:cursor-grabbing"
                                            type="button"
                                            aria-controls="_R_immav5ubt9fiudb_"
                                            role="button"
                                            tabIndex={0}
                                            aria-disabled="false"
                                            aria-roledescription="sortable"
                                            aria-describedby="_R_mav5ubt9fiudb_"
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
                                                className="lucide lucide-grip-vertical h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <circle cx={9} cy={12} r={1} />
                                                <circle cx={9} cy={5} r={1} />
                                                <circle cx={9} cy={19} r={1} />
                                                <circle cx={15} cy={12} r={1} />
                                                <circle cx={15} cy={5} r={1} />
                                                <circle cx={15} cy={19} r={1} />
                                            </svg>
                                        </button>
                                        <button
                                            data-slot="tooltip-trigger"
                                            data-variant="ghost"
                                            data-size="icon"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
                                            data-state="closed"
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
                                                className="lucide lucide-circle-plus"
                                                aria-hidden="true"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M8 12h8" />
                                                <path d="M12 8v8" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 p-0.5">
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_r_g_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Initial project setup
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <span
                                                            data-slot="avatar-fallback"
                                                            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs"
                                                        >
                                                            HL
                                                        </span>
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <span
                                                            data-slot="avatar-fallback"
                                                            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs"
                                                        >
                                                            BM
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-green-600!"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset={0}
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    100%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    medium
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>1</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>2</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_r_b_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Set up CI/CD pipeline
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <span
                                                            data-slot="avatar-fallback"
                                                            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs"
                                                        >
                                                            EC
                                                        </span>
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <span
                                                            data-slot="avatar-fallback"
                                                            className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs"
                                                        >
                                                            GR
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-green-600!"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset={0}
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    100%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    high
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>2</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>4</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_R_limmav5ubt9fiudb_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Database schema refactoring
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Liam Avatar"
                                                            src="/images/avatars/11.png"
                                                        />
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Isabella Avatar"
                                                            src="/images/avatars/12.png"
                                                        />
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-orange-500!"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="45.23893421169302"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    55%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    medium
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>3</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>2</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="_R_qmmav5ubt9fiudb_"
                                data-slot="kanban-column"
                                className="bg-muted flex size-full flex-col gap-2 rounded-lg p-2.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-dragging:cursor-grabbing w-[340px] min-w-[340px]"
                                style={{}}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">Done</span>
                                        <span
                                            data-slot="badge"
                                            data-variant="outline"
                                            className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
                                        >
                                            2
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <button
                                            data-slot="kanban-column-handle"
                                            data-variant="ghost"
                                            data-size="icon"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 select-none disabled:pointer-events-none disabled:opacity-50 cursor-grab data-dragging:cursor-grabbing"
                                            type="button"
                                            aria-controls="_R_qmmav5ubt9fiudb_"
                                            role="button"
                                            tabIndex={0}
                                            aria-disabled="false"
                                            aria-roledescription="sortable"
                                            aria-describedby="_R_mav5ubt9fiudb_"
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
                                                className="lucide lucide-grip-vertical h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <circle cx={9} cy={12} r={1} />
                                                <circle cx={9} cy={5} r={1} />
                                                <circle cx={9} cy={19} r={1} />
                                                <circle cx={15} cy={12} r={1} />
                                                <circle cx={15} cy={5} r={1} />
                                                <circle cx={15} cy={19} r={1} />
                                            </svg>
                                        </button>
                                        <button
                                            data-slot="tooltip-trigger"
                                            data-variant="ghost"
                                            data-size="icon"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
                                            data-state="closed"
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
                                                className="lucide lucide-circle-plus"
                                                aria-hidden="true"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M8 12h8" />
                                                <path d="M12 8v8" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 p-0.5">
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_r_10_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Redesign marketing homepage
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Lucas Avatar"
                                                            src="/images/avatars/03.png"
                                                        />
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Sophia Avatar"
                                                            src="/images/avatars/04.png"
                                                        />
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="100.53096491487338"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    0%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    medium
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>1</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        data-slot="kanban-item"
                                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 focus-visible:ring-ring focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden touch-none select-none data-dragging:cursor-grabbing cursor-grab border-0"
                                        id="_r_q_"
                                        role="button"
                                        tabIndex={0}
                                        aria-disabled="false"
                                        aria-roledescription="sortable"
                                        aria-describedby="_R_mav5ubt9fiudb_"
                                        style={{}}
                                    >
                                        <div
                                            data-slot="card-header"
                                            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
                                        >
                                            <div
                                                data-slot="card-title"
                                                className="text-base font-semibold"
                                            >
                                                Integrate Stripe payment gateway
                                            </div>
                                            <div
                                                data-slot="card-description"
                                                className="text-muted-foreground text-sm"
                                            >
                                                Compile competitor landing page designs for inspiration. G..
                                            </div>
                                        </div>
                                        <div data-slot="card-content" className="px-6 space-y-4">
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <div className="flex -space-x-2 overflow-hidden">
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Emma Avatar"
                                                            src="/images/avatars/01.png"
                                                        />
                                                    </span>
                                                    <span
                                                        data-slot="avatar"
                                                        data-size="default"
                                                        className="group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 border-background border-2"
                                                    >
                                                        <img
                                                            data-slot="avatar-image"
                                                            className="aspect-square size-full object-cover"
                                                            alt="Daniel Avatar"
                                                            src="/images/avatars/02.png"
                                                        />
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg border p-1">
                                                    <div className="relative size-4">
                                                        <svg
                                                            className="size-full -rotate-90"
                                                            viewBox="0 0 36 36"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current text-gray-200 dark:text-neutral-700"
                                                                strokeWidth={2}
                                                            />
                                                            <circle
                                                                cx={18}
                                                                cy={18}
                                                                r={16}
                                                                fill="none"
                                                                className="stroke-current"
                                                                strokeWidth={2}
                                                                strokeDasharray="100.53096491487338"
                                                                strokeDashoffset="90.47786842338604"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    10%
                                                </div>
                                            </div>
                                            <div
                                                data-orientation="horizontal"
                                                role="none"
                                                data-slot="separator"
                                                className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                                            />
                                            <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                <span
                                                    data-slot="badge"
                                                    data-variant="outline"
                                                    className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground capitalize"
                                                >
                                                    high
                                                </span>
                                                <div className="flex items-center gap-3">
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
                                                            className="lucide lucide-paperclip h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                                                        </svg>
                                                        <span>2</span>
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
                                                            className="lucide lucide-message-square h-4 w-4"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                        </svg>
                                                        <span>4</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="_R_mav5ubt9fiudb_" style={{ display: "none" }}>
                            To pick up a kanban item or column, press space or enter. While
                            dragging, use the arrow keys to move the item. Press space or enter
                            again to drop the item in its new position, or press escape to cancel.
                        </div>
                        <div
                            id="DndLiveRegion-0"
                            role="status"
                            aria-live="assertive"
                            aria-atomic="true"
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: 1,
                                height: 1,
                                margin: "-1px",
                                border: 0,
                                padding: 0,
                                overflow: "hidden",
                                clip: "rect(0px, 0px, 0px, 0px)",
                                clipPath: "inset(100%)",
                                whiteSpace: "nowrap"
                            }}
                        >
                            item was dropped at position 4 of 4
                        </div>
                    </div>
                    <div
                        data-state="inactive"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_2av5ubt9fiudb_-trigger-list"
                        hidden=""
                        id="radix-_R_2av5ubt9fiudb_-content-list"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none"
                    />
                    <div
                        data-state="inactive"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-_R_2av5ubt9fiudb_-trigger-table"
                        hidden=""
                        id="radix-_R_2av5ubt9fiudb_-content-table"
                        tabIndex={0}
                        data-slot="tabs-content"
                        className="flex-1 outline-none"
                    />
                </div>
            </div>
            {/*$*/}
            {/*/$*/}
        </div>

    </>);
}