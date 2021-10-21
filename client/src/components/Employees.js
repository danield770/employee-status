import React from 'react';

const Employees = ({ employees }) => {
  return (
    <ul>
      {console.log('employees: ', employees)}
      {employees.map(({ name, status, id, img }) => (
        <li key={id}>
          <div>
            name: {name} status: {status}
          </div>
          <img src={img} alt='' />
        </li>
      ))}
    </ul>
  );
};

export default Employees;
