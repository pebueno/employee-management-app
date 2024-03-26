import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

interface EmployeeType {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  hireDate: string;
  address: string;
  phone: string;
}

const CenterModalStyle = {
  margin: '0 auto',
  marginTop: 5,
  width: 600,
  height: '50vh',
  transform: 'translate3d(0%, 0, 0)',
  bgcolor: 'background.paper',
  borderRadius: '12px;',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

interface Props {
  open: boolean;
  onClose: () => void;
  onAddEmployee: (employee: EmployeeType) => void;
}

const useEmployeeForm = (initialEmployee: EmployeeType) => {
  const [employee, setEmployee] = useState<EmployeeType>(initialEmployee);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setEmployee(initialEmployee);
  };

  return {
    employee,
    handleChange,
    resetForm,
  };
};

const AddEmployeeModal: FC<Props> = ({ open, onClose, onAddEmployee }) => {
  const initialEmployee: EmployeeType = {
    id: '',
    firstName: '',
    lastName: '',
    department: '',
    hireDate: dayjs().format('YYYY-MM-DD'),
    address: '',
    phone: '',
  };

  const { employee, handleChange, resetForm } = useEmployeeForm(initialEmployee);

  const handleSubmit = async () => {
    await onAddEmployee(employee);
    resetForm();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={CenterModalStyle} onClick={(e) => e.stopPropagation()}>
        <Grid container spacing={2} pb={2}>
          <Grid item xs={10}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              New Employee
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
            <IconButton className="closeIcon" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="First Name"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hire Date"
            name="hireDate"
            type="date"
            value={employee.hireDate}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Address"
            name="address"
            value={employee.address}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Employee
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
