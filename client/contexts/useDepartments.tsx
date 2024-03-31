import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';
import { DepartmentType } from '../components/common/types';

interface ApiContextType {
  departments: DepartmentType[];
}

const DepartmentContext = createContext<ApiContextType | undefined>(undefined);

interface DepartmentProviderProps {
  children: ReactNode;
}

export const DepartmentProvider = ({ children }: DepartmentProviderProps): JSX.Element => {
  const [api] = useState<AxiosInstance>(() => axios.create({ baseURL: 'http://localhost:3001/api' }));

  useEffect(() => {
    fetchDepartments();
  }, []);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  const fetchDepartments = async (): Promise<void> => {
    try {
      const response = await api.get<{ departments: DepartmentType[] }>('/departments');
      setDepartments(response.data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DepartmentContext.Provider value={{ departments }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartments = (): ApiContextType => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error('useDepartments must be used within an DepartmentProvider');
  }
  return context;
};