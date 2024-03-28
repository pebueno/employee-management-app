import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Container, Grid, Card, CardMedia, Box } from '@mui/material';
import { EmployeeType } from './common/types';
import Link from 'next/link';

interface EmployeeDetailsProps {
    employee: EmployeeType;
}

const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
    const [isActive, setIsActive] = useState(true);

    const handleDepartmentChange = () => {
        // Implement update logic here
    };

    const handleUpdate = () => {
        // Implement update logic here
    };

    const handleToggleActive = () => {
        setIsActive(prevState => !prevState);
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h5">
                <Link href="/">
                    ←
                </Link>
                <span style={{ marginRight: 10 }} />
                Employee Information
            </Typography>
            <Grid container direction="row" py={3}>
                <Grid item xs={4} pr={4}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/mock_image.png"
                        alt="Employee Image"
                    />
                        {isActive ?  

                    (<Button
                        variant="contained"
                        color={isActive ? 'error' : 'success'}
                        onClick={handleToggleActive}
                        fullWidth
                    >
                        Inactive
                    </Button>) :
                        null }
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6" py={1}>
                        Name: {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography variant="body1" py={1}>Department: {employee.department}</Typography>
                    <Typography variant="body1" py={1}>Telephone: {employee.phone}</Typography>
                    <Box sx={{display: 'inline'}} >
                    <FormControl size="small" sx={{ minWidth: 250, paddingRight: 2}}>
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            labelId="department-label"
                            id="department"
                            onChange={handleDepartmentChange}
                        >
                            <MenuItem value="department1">Department 1</MenuItem>
                            <MenuItem value="department2">Department 2</MenuItem>
                        </Select>
                        </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                    </Box>

                </Grid>

                <Grid item xs={3}>
                    <Typography variant="body1" pb={2}>Hire Date: {employee.hireDate}</Typography>
                    <Button
                        variant="contained"
                        color={isActive ? 'error' : 'success'}
                        onClick={handleToggleActive}
                    >
                        {isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EmployeeDetails;
