import Link from 'next/link';

type ImpactCardProps = {
    metric: string;
    text: string;
    source?: string;
    href?: string;
    className?: string;
};

export default function ImpactCard({ metric, text, source, href = '#', className }: ImpactCardProps) {
    return (
        <article className={className + " h-full"}>
            <div className="flex flex-col items-start gap-6 h-full justify-between">
                <div className="flex-shrink-0">
                    <div className="text-5xl md:text-[7rem] leading-none font-title pb-4">{metric}</div>
                    <p className="text-xl md:text-3xl font-sansmb-4 font-bold">{text}</p>
                </div>
                <div className="text-left">
                    {source ? (
                        <p className="text-sm md:text-base underline"><Link href={href}>{source}</Link></p>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
