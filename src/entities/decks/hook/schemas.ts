import { z } from 'zod'

export const deckSchema = z.object({
  cover: z.union([
    z
      .instanceof(File)
      .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
        message: 'Must be a .jpeg or .png or .webp file.',
      }),
    z.null(),
    z.string(),
  ]),
  isPrivate: z.boolean(),
  name: z
    .string()
    .min(3, { message: 'Deck Name must be at least 3 characters long' })
    .max(30, { message: 'Deck Name must not exceed 30 characters' }),
})

export type FormValuesFromDeck = z.infer<typeof deckSchema>
