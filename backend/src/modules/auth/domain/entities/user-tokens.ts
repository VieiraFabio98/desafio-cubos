import { User } from "@modules/user/domain/entities/user"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('user_tokens')
class UserTokens {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({type: 'varchar', name: 'token', length: 32})
  token: string

  @CreateDateColumn({ name: "expires_at", type: "timestamp" })
  expiresAt: Date

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date
  
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { UserTokens }