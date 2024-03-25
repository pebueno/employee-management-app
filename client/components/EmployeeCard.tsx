import React from 'react';
import { EmployeeType } from './common/types';


interface Props {
  employee: EmployeeType;
  onDelete: () => void;
}

const EmployeeCard: React.FC<Props> = ({ employee, onDelete }) => {
    const formatDate = (dateString: string) => {
        const hireDate = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = hireDate.toLocaleDateString('en-US', options);
        
        // Calculate the duration in years, months, and days
        const now = new Date();
        const years = now.getFullYear() - hireDate.getFullYear();
        const months = now.getMonth() - hireDate.getMonth();
        const days = now.getDate() - hireDate.getDate();

        return `${formattedDate} (${years}y - ${months}m - ${days}d)`;
    };
    
  return (
    <div className="employee-card">
      <div className="employee-info">
        <div>Name: {employee.firstName} {employee.lastName}</div>
        <div>Department: {employee.department}</div>
        <div>Hire Date: {formatDate(employee.hireDate)}</div>
      </div>
      <div className="employee-actions">
        <button onClick={onDelete}>Delete</button>
        {/* Add View Details button */}
      </div>
    </div>
  );
};

export default EmployeeCard;
