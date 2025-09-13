// file.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  url: string;

  @Column()
  mimetype: string;
}
