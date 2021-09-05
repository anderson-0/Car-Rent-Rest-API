import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Expose } from "class-transformer";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid") id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "driver_license" })
  driverLicense: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @Expose({ name: "avatar_url" })
  avatarUrl(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    this.id = this.id || uuidV4();
  }
}

export { User };
