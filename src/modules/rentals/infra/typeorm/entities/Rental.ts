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

  @Column()
  carId: string;

  @Column()
  userId: string;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column({ name: "expected_return_date" })
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = this.id || uuidV4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export { Rental };
