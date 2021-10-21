import React, { useState } from 'react';
import { statuses } from '../utils/constants';

const Employees = ({ employees, handleStatusChange }) => {
  const [userInEditMode, setUserInEditMode] = useState(null);
  const handleSelectChange = (id, e) => {
    handleStatusChange(id, e);
    setUserInEditMode(null);
  };
  return (
    <ul>
      {console.log('employees: ', employees)}
      {employees.map(({ name, status, id, img }) => (
        <li key={id}>
          <button
            type='button'
            onClick={() => setUserInEditMode((prev) => (!prev ? id : null))}
          >
            {id === userInEditMode ? 'Cancel' : 'Edit'}
          </button>
          <label htmlFor='workerStatus'>
            name: {name} status: {status}
          </label>
          <select
            onChange={(e) => handleSelectChange(id, e)}
            id='workerStatus'
            disabled={id !== userInEditMode}
            className='worker-status'
            defaultValue={status}
          >
            {Object.keys(statuses).map((item) => (
              <option key={item} value={item}>
                {statuses[item]}
              </option>
            ))}
          </select>
          <img src={img} alt='' />
        </li>
      ))}
    </ul>
  );
};

export default Employees;
