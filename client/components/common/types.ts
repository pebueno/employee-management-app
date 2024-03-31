export interface EmployeeType {
  id: string;
  firstName: string;
  lastName: string;
  department: {
    id: number;
    name: string;
  };
  hireDate: string;
  address: string;
  phone: string;
}

export interface DepartmentType {
  id: number;
  name: string;
}
