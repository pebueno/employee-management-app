import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
} from "typeorm"

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    department: string;
    
    @Column()
    hireDate: Date
    
    @Column()
    phone: number
    
    @Column()
    address: string

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
