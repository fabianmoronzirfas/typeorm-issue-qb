
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Bathingspot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  isPublic: boolean;

  @Column({ type: 'json', nullable: true })
  apiEndpoints: string;

  @Column({ type: 'json', nullable: true })
  state: string;
  // should be geojson
  @Column({ type: 'json', nullable: true })
  location: string;

  @Column({ type: 'float8', nullable: true })
  latitde: number;
  @Column({ type: 'float8', nullable: true })
  longitude: number;
  @Column({ type: 'float8', nullable: true })
  elevation: number;

  @ManyToOne(_type => User, user => user.bathingspots)
  user: User;

}
