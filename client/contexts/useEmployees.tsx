import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';
import { EmployeeType } from '../components/common/types';

interface ApiContextType {
  employees: EmployeeType[];
  loading: boolean;
  error: string | null;
  deleteEmployee: (employeeId: string) => Promise<void>;
  saveEmployee: (newEmployee: EmployeeType) => Promise<void>;
}

const EmployeeContext = createContext<ApiContextType | undefined>(undefined);

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider = ({ children }: EmployeeProviderProps): JSX.Element => {
  const [api] = useState<AxiosInstance>(() => axios.create({ baseURL: 'http://localhost:3001/api' }));

  useEffect(() => {
    fetchEmployees();
  }, []);

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async (): Promise<void> => {
    try {
      const response = await api.get<{ employees: EmployeeType[] }>('/employees');
      setEmployees(response.data.employees);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch employees. Please try again later.');
      setLoading(false);
    }
  };

  const deleteEmployee = async (employeeId: string): Promise<void> => {
    try {
      await api.delete(`/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const saveEmployee = async (newEmployee: EmployeeType): Promise<void> => {
    try {
      await api.post('/employees', newEmployee);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, deleteEmployee, saveEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = (): ApiContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};