import './App.css';
import React from 'react';
import Employees from './components/Employees';

function App() {
  const [employees, setEmployees] = React.useState(null);
  const hasImages = (workers) =>
    workers?.length &&
    workers.length === workers.filter((worker) => worker.img).length;

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

      console.log(content);
    })();
  };
  React.useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);
  React.useEffect(() => {
    if (!employees) return;
    console.log('employees: ', employees);
    if (hasImages(employees)) return;

    fetch(`https://randomuser.me/api/?results=${employees.length}`)
      .then((res) => res.json())
      .then((res) =>
        setEmployees((prev) =>
          prev.map((item, i) => ({
            ...item,
            img: res.results[i].picture.large,
          }))
        )
      )
      .catch((err) => setEmployees(err));
  }, [employees]);

  return (
    <div className='App'>
      <header className='App-header'>Employees</header>
      <div>
        {!hasImages(employees) ? (
          'Loading...'
        ) : (
          <Employees
            employees={employees}
            handleStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
