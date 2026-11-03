import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache';
import { activityToSearchDoc } from '@/lib/search/toSearchDoc';
import { removeSearchDoc, upsertSearchDoc } from '@/lib/search/sync';

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
            async ({ doc, req }) => {
                if (doc.visible) {
                    await upsertSearchDoc(req.payload, activityToSearchDoc(doc), req);
                } else {
                    await removeSearchDoc(req.payload, 'activity', String(doc.id), req);
                }
                revalidatePath('/', 'layout');
            },
        ],
        afterDelete: [
            async ({ id, req }) => {
                await removeSearchDoc(req.payload, 'activity', String(id), req);
                revalidatePath('/', 'layout');
            },
        ],
    }
}
