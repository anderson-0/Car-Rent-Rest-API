import { v4 as uuidV4 } from "uuid";

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity("users_tokens")
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "refresh_token" })
  refreshToken: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "expires_date" })
  expiresDate: Date;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  constructor() {
    this.id = this.id || uuidV4();
  }
}

export { UserToken };
