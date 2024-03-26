import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
} from "typeorm"

@Entity()
export default class Employee {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'text' })
    department: string;
    
    @Column({ type: 'date' })
    hireDate: Date;
    
    @Column({ type: 'varchar', length: 20 })
    phone: string;
    
    @Column({ type: 'text' })
    address: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
