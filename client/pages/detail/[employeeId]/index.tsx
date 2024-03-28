import { useEffect, useState } from 'react';
import axios from 'axios';
import { EmployeeType } from '../../../components/common/types';
import EmployeeDetails from '../../../components/EmployeeDetails';
import { useRouter } from 'next/router';


const DetailsPage = () => {
  const router = useRouter();
  const { employeeId } = router.query;

  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/employees/${employeeId}`);
        setEmployee(response.data.employee);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch employee details. Please try again later.');
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>No employee found.</p>;
  }

  return (
    <EmployeeDetails employee={employee} />
  );
};

export default DetailsPage;
