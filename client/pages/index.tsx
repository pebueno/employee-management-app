import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import { EmployeeType } from '../components/common/types';
import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddEmployeeModal from '../components/AddEmployeeModal';

const API_BASE_URL = 'http://localhost:3001/api';

const Home = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const handleDeleteEmployee = async (employeeId: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/employees/${employeeId}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddEmployee = async (newEmployee: EmployeeType) => {
        try {
            // Send a request to add the new employee to the backend
            await axios.post<EmployeeType>(`${API_BASE_URL}/employees`, newEmployee);
    
            // Fetch the updated list of employees from the server
            const response = await axios.get<{ employees: EmployeeType[] }>(`${API_BASE_URL}/employees`);
            const updatedEmployees = response.data.employees;
    
            // Update the state with the new list of employees
            setEmployees(updatedEmployees);
            closeModal();
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };
    

    return (
        <Container>
            <Typography component="div" variant="h4" py={2}>
                <Box sx={{ textAlign: 'left', m: 1 }}>Employee Management App</Box>
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Button variant="contained" color="primary" sx={{ backgroundColor: "#89CC48", marginBottom: 2 }} onClick={openModal}>
                    <AddIcon sx={{ paddingRight: 2 }} /> New employee
                </Button>
            </Box>
            <AddEmployeeModal
                open={isModalOpen}
                onClose={closeModal}
                onAddEmployee={handleAddEmployee}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="cardContainer">
                    {employees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onDelete={() => handleDeleteEmployee(employee.id)}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Home;
