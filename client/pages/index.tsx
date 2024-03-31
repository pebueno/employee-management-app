import React, { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { useEmployees } from '../contexts/useEmployees';

const Home = () => {
    const { employees, loading, error, deleteEmployee, saveEmployee } = useEmployees();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                onAddEmployee={saveEmployee}
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
                            onDelete={() => deleteEmployee(employee.id)}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Home;
