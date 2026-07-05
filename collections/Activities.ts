import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache';

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
            name: 'order',
            label: 'Kolejność',
            type: 'number',
            required: true,
        },
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
    hooks: {
        afterChange: [
            () => revalidatePath('/', 'layout'),
        ],
        afterDelete: [
            () => revalidatePath('/', 'layout'),
        ],
    }
}
