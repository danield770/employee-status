import './App.css';
import React, { useState } from 'react';
import Employees from './components/Employees';
import EmployeesForm from './components/EmployeesForm';

function App() {
  const [employees, setEmployees] = useState(null);
  const [filter, setFilter] = useState('none');
  const [query, setQuery] = useState('');

  const handleStatusChange = (id, e) => {
    (async () => {
      const rawResponse = await fetch(`/users/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: e.target.value }),
      });
      const content = await rawResponse.json();

      console.log('content: statusChange', content);
      setEmployees(content);
    })();
  };

  const createUser = (body, e) => {
    e.preventDefault();
    (async () => {
      const rawResponse = await fetch(`/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const content = await rawResponse.json();

      console.log('content: createUser', content);
      setEmployees(content);
    })();
  };

  const handleSearch = (query, e) => {
    //e.preventDefault();
    setQuery(query);
  };
  const handleFilter = (status) => {
    setFilter(status);
  };
  React.useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>Employees</header>
      <EmployeesForm
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        createUser={createUser}
      />
      <div>
        {!employees ? (
          'Loading...'
        ) : (
          <Employees
            employees={employees}
            filter={filter}
            query={query}
            handleStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
