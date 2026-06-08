import type { CollectionConfig } from 'payload'

export const Schools: CollectionConfig = {
    slug: 'schools',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'school_name',
            label: 'Nazwa Szkoły (krótka)',
            type: 'text',
            required: true,
        },
        {
            name: 'school_full_name',
            label: 'Nazwa Szkoły (pełna)',
            type: 'text',
            required: true,
        },
        {
            name: 'whatsapp_link',
            label: 'Link do grupy WhatsApp',
            type: 'text',
            required: false,
        },
        {
            name: 'number_of_members',
            label: 'Liczba członków',
            type: 'number',
            required: false,
        },
        {
            name: 'coordinators',
            label: 'Koordynatorzy',
            type: 'array',
            labels: {
                singular: 'Koordynator',
                plural: 'Koordynatorzy'
            },
            fields: [
                {
                    name: 'name',
                    label: 'Imię i Nazwisko',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    required: false,
                },
                {
                    name: 'phone',
                    label: 'Nr telefonu',
                    type: 'text',
                    required: false,
                }
            ]
        }
    ],
}
