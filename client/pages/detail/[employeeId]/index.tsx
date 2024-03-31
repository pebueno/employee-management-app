import { useRouter } from 'next/router';
import EmployeeDetails from '../../../components/EmployeeDetails';
import { useEmployees } from '../../../contexts/useEmployees';

const DetailsPage = () => {
  const router = useRouter();
  const { employeeId } = router.query;

  const { employees, loading, error } = useEmployees();

  const employee = employees.find(emp => emp.id === employeeId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>No employee found.</p>;
  }

  return <EmployeeDetails employee={employee} />;
};

export default DetailsPage;
