import Image from 'next/image'

export default function LoadingPage({
    loadingTitle,
    loadingSubtitle
}) {
    return (
        <div className="flex-1 bg-blue-50 z-51 flex flex-col items-center justify-center">
            <div className="relative flex flex-col justify-center items-center gap-8">
                <div className="relative w-fit h-fit">
                    <div className="w-40 h-40 -z-10 bg-techbridge absolute top-1/2 left-1/2 -translate-1/2 rounded-full animate-ping"></div>
                    <Image
                        src="/TechBridge/Logo.svg"
                        width={200}
                        height={200}
                        alt="Logo TechBridge"
                        priority
                    />
                </div>

                <div className="text-center flex flex-col gap-3">
                    <p className="font-genty text-3xl">{loadingTitle}</p>

                    <div>
                        {
                            loadingSubtitle.map((t, i) => (
                                <p className="font-bold text-muted-foreground text-sm" key={i}>{t}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}