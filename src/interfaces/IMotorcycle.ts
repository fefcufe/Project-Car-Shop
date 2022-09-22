import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const VALUES = ['Street', 'Custom', 'Trail'] as const;
// referencia: https://github.com/colinhacks/zod#strings
const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(VALUES),
  engineCapacity: z.number().int().positive().lte(2500),
});
  
export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
  
export { motorcycleZodSchema };