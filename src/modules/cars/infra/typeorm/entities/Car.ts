import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";

@Entity("cars")
class Car {
  @PrimaryGeneratedColumn("uuid") id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "daily_rate" })
  dailyRate: number;

  @Column({ name: "license_plate" })
  licensePlate: string;

  @Column({ name: "fine_amount" })
  fineAmount: number;

  @Column()
  available: boolean;

  @Column()
  brand: string;

  @Column({ name: "category_id" })
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
      this.createdAt = new Date();
    }
  }
}

export { Car };
