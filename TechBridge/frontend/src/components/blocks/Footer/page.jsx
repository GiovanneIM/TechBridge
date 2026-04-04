import Link from "next/link";

export default function Footer() {

    return (<>
        <footer className="bg-background w-full border-t shadow-sm">
            <div className="container mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 gap-15 py-12 md:grid-cols-4 md:py-16">

                    <div className="border-e">
                        <Link href="/">
                            <p className="text-3xl font-genty">Tech<span className="text-blue-700">Bridge</span></p>
                        </Link>

                        <p className="text-muted-foreground mt-4 text-md">
                            Criando pontes e facilitando seu trabalho.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">Departamentos</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Ferramentaria
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    RH
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Pintura
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    GA
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium">Manutenções</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Máquinas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Preventivas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Reparos
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium">Contato</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Suporte
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Sobre nós
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-border flex flex-col items-center justify-between gap-6 border-t py-6 md:flex-row">
                    <p className="text-muted-foreground text-center text-sm md:text-left">
                        © 2026 TechBridge, Corp. Todos direitos reservados.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Twitter"
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
                                className="lucide lucide-twitter h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
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
                                className="lucide lucide-instagram h-5 w-5"
                                aria-hidden="true"
                            >
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="YouTube"
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
                                className="lucide lucide-youtube h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                <path d="m10 15 5-3-5-3z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
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
                                className="lucide lucide-linkedin h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width={4} height={12} x={2} y={9} />
                                <circle cx={4} cy={4} r={2} />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>


    </>);
}