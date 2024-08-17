import { z } from 'zod'

export const deleteProductSchema = z.string().cuid()
