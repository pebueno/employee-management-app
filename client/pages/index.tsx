import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import { EmployeeType } from '../components/common/types';

const API_BASE_URL = 'http://localhost:3001/api';

const Home = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<{ employees: EmployeeType[] }>(`${API_BASE_URL}/employees`);
            setEmployees(response.data.employees);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch employees. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/employees/${employeeId}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h1>List of Employees</h1>
            {/* Add New Employee button */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {employees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onDelete={() => handleDeleteEmployee(employee.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;