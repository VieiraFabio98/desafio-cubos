import { User } from "@modules/user/domain/entities/user"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({type: 'varchar', name: 'title', length: 150})
  title: string

  @Column({type: 'varchar', name: 'original_title', length: 150})
  originalTitle: string

  @Column({type: 'varchar', name: 'description', length: 500})
  description: string

  @Column({type: 'varchar', name: 'duration', length: 50})
  duration: string

  @Column({type: 'varchar', name: 'genre', length: 100})
  genre: string

  @Column({type: 'varchar', name: 'director', length: 100})
  director: string

  @Column({type: 'varchar', name: 'poster_url', length: 255})
  posterUrl: string

  @Column({type: 'varchar', name: 'youtube_url', length: 255})
  youtubeUrl: string

  @Column({type: 'varchar', name: 'release_date', length: 50})
  releaseDate: string

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date
  
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { Movie }

