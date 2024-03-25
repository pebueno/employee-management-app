import React from 'react';
import { EmployeeType } from './common/types';


interface Props {
  employee: EmployeeType;
  onDelete: () => void;
}

const EmployeeCard: React.FC<Props> = ({ employee, onDelete }) => {
  const formatDate = (dateString: string): string => {
    // Format date logic
    return dateString;
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
