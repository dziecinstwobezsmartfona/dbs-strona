'use client';

import { useState } from 'react';
import Tag from '@/components/Tag';

export default function PodpiszPakt() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        newsletter: false,
        children: [{ school: '', year: '', educationStatus: 'school' }]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        alert('Form submitted');
    };

    const addChild = () => {
        setFormData(prev => ({
            ...prev,
            children: [...prev.children, { school: '', year: '', educationStatus: 'school' }]
        }));
    };

    const updateChild = (index: number, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            children: prev.children.map((child, i) =>
                i === index ? { ...child, [field]: value } : child
            )
        }));
    };

    return (
        <main className="bg-white min-h-screen flex flex-col items-center justify-top">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center py-12">
                <Tag className="bg-black/10 text-foreground mb-12">Podpisz Pakt</Tag>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">Podpisz Pakt Rodzica</p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Przystąp do ruchu "Dzieciństwo Bez Smartfona" i zobowiąż się do nie dawania dziecku smartfona do co najmniej 14 roku życia, a mediów społecznościowych do 16.</p>
            </header>
            <section className="flex flex-col bg-white w-full">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Imię"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.newsletter}
                                onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                                className="mr-2"
                            />
                            Zapisz się na najnowsze wiadomości email od Smartphone Free Childhood?
                        </label>
                    </div>
                    <div className="mb-4">
                        <p className="text-center font-bold text-2xl mb-4">
                            Wybieram odroczenie zakupu smartfona dla mojego dziecka do co najmniej 14 roku życia i mediów społecznościowych do 16 - dla ich dobrostanu i pomocy w ochronie dzieciństwa dla wszystkich naszych dzieci.
                        </p>
                    </div>

                    {formData.children.map((child, index) => (
                        <div key={index} className="bg-(--main-accent) px-6 py-8 mb-4 rounded-2xl">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <input
                                    type="text"
                                    placeholder="School name, postcode or address..."
                                    value={child.school}
                                    onChange={(e) => updateChild(index, 'school', e.target.value)}
                                    className="col-span-1 p-3 bg-white rounded-full border-0 placeholder-gray-400"
                                />
                                <select
                                    value={child.year}
                                    onChange={(e) => updateChild(index, 'year', e.target.value)}
                                    className="col-span-1 p-3 bg-white rounded-full border-0"
                                >
                                    <option value="">Select year</option>
                                    <option value="2010">2010</option>
                                    <option value="2011">2011</option>
                                    <option value="2012">2012</option>
                                    <option value="2013">2013</option>
                                    <option value="2014">2014</option>
                                    <option value="2015">2015</option>
                                </select>
                            </div>

                            <p className="text-base mb-2">
                                My child is{' '}
                                <button
                                    type="button"
                                    onClick={() => updateChild(index, 'educationStatus', 'home-educated')}
                                    className={`underline font-semibold ${child.educationStatus === 'home-educated' ? 'text-blue-600' : 'text-(--foreground)'}`}
                                >
                                    home educated
                                </button>
                                {' '}or{' '}
                                <button
                                    type="button"
                                    onClick={() => updateChild(index, 'educationStatus', 'not-yet-school')}
                                    className={`underline font-semibold ${child.educationStatus === 'not-yet-school' ? 'text-blue-600' : 'text-(--foreground)'}`}
                                >
                                    not yet at a school
                                </button>
                            </p>

                            <button
                                type="button"
                                onClick={addChild}
                                className="mt-6 w-fit px-8 py-3 bg-[#0E3B3B] text-[#CEFFA8] rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-opacity-90 transition"
                            >
                                Add another child <span className="text-2xl">⊕</span>
                            </button>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-green-500 text-white rounded text-xl mt-4"
                    >
                        Podpisz pakt
                    </button>
                </form>
            </section>
        </main>
    );
}
