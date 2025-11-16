import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type: 'varchar', name: 'name', length: 100})
  name: string

  @Column({type: 'varchar', name: 'email', length: 100, unique: true})
  email: string

  @Column({type: 'varchar', name: 'password', length: 32, unique: true})
  password: string

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date
  
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { User }