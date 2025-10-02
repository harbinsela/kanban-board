import { z } from "zod";

export const CardCreate = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  assignee: z.string().email().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().datetime().optional(),
  tags: z.array(z.string().min(1).max(20)).max(5).optional()
});

export const CardUpdate = CardCreate.partial();

export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw result.error.errors.map(e => e.message).join(", ");
  }
  return result.data;
}