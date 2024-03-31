import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn 
} from "typeorm"
import Department from "./Department";

@Entity()
export default class Employee {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @ManyToOne(() => Department, (department) => department.employees)
    @JoinColumn({ name: 'departmentId', referencedColumnName: 'id' })
    department: Department;
    
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
