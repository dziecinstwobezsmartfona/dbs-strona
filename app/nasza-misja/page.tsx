import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';

export default function NaszaMisja() {
    return (
        <main className="bg-[#C2D3FF] min-h-screen flex flex-col items-center justify-top py-50">
            <header className="flex flex-col items-center">
                <Tag className="bg-black/15 text-foreground mb-8">Nasza Misja</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-4">Nasza Misja</p>
            </header>
        </main>
    );
}
