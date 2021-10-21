import React, { useRef, useState } from 'react';
import { statuses } from '../utils/constants';

const EmployeesForm = ({ createUser, handleSearch, handleFilter }) => {
  //   const searchRef = useRef(null);
  const usernameRef = useRef(null);
  const statusRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  return (
    <>
      <div>
        <button type='button' onClick={() => setIsCreating(true)}>
          + Create User
        </button>
        <input
          type='search'
          placeholder='Search Employee'
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          onChange={(e) => {
            handleFilter(e.target.value);
          }}
        >
          <option value='none'>none</option>
          {Object.keys(statuses).map((item) => (
            <option key={item} value={item}>
              {statuses[item]}
            </option>
          ))}
        </select>
      </div>
      {isCreating && (
        <form
          onSubmit={(e) => {
            setIsCreating(false);
            createUser(
              {
                name: usernameRef.current.value,
                status: statusRef.current.value,
              },
              e
            );
          }}
        >
          <header>
            <h3>Create New User</h3>
          </header>
          <div>
            <label>Username</label>
            <input ref={usernameRef} type='text' />
          </div>
          <div>
            <label>Status</label>
            <input ref={statusRef} type='text' />
          </div>
          <button>Create</button>
          <button type='button' onClick={() => setIsCreating(false)}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
};

export default EmployeesForm;
