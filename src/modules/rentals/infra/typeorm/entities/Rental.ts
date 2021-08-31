import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "car_id" })
  carId: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column({ name: "expected_return_date" })
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export { Rental };
