import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cars_image")
class CarImage {
  @PrimaryGeneratedColumn("uuid") id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  constructor() {
    this.id = this.id || uuidV4();
  }
}

export { CarImage };
