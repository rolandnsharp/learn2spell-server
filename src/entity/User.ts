import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string

    // email verification token
    @Column({ nullable: true }) //! remove nullable:true ???
    token: string

    // has the email address been verified?
    @Column({ default: false })
    isVerified: boolean

    // @OneToMany(type => Document, document => document.user)
    // documents: Document[];

}
