import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid") id?: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "driver_license" })
  driverLicense: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  constructor() {
    this.id = this.id || uuidV4();
  }
}

export { User };
