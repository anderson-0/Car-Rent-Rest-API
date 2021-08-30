import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  id?: string;
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
}

export { ICreateCarDTO };
