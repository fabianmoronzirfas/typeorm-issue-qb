import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bathingspot } from './Bathingspot';
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({nullable: false})
  // protected: boolean = false;

  @Column({nullable: false, type: 'text'})
  firstName: string;

  @Column({nullable: false})
  lastName: string;

  @Column({nullable: true})

  email: string;

  @OneToMany(_type => Bathingspot, bathingspot => bathingspot.user, {
    cascade: true,
  })
  bathingspots: Bathingspot[];

}
