import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
    slug: 'activities',
    labels: {
        singular: 'Działanie',
        plural: 'Działania'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Nazwa działania',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Opis działania',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            label: 'Ilustracja',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'link',
            label: 'Link',
            type: 'text',
            required: false,
        },
        {
            name: 'role',
            label: 'Rola',
            type: 'select',
            hasMany: true,
            required: false,
            options: [
                'rodzic',
                'nauczyciel',
            ]
        },
        {
            name: 'visible',
            label: 'Widoczne na stronie',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
}
