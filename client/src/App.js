import './App.css';
import React from 'react';
import Employees from './components/Employees';

function App() {
  const [employees, setEmployees] = React.useState(null);
  //const [images, setImages] = React.useState(null);
  const hasImages = (workers) =>
    workers?.length &&
    workers.length === workers.filter((worker) => worker.img).length;
  React.useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);
  React.useEffect(() => {
    if (!employees) return;
    console.log('employees: ', employees);
    // console.log('images: ', images);
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
  // React.useEffect(() => {
  //   if (!data) return;
  //   console.log('data: ', data);
  //   console.log('images: ', images);
  //   if (images?.length > 0 && data.length === images?.length) return;
  //   fetch(`https://randomuser.me/api/?results=${data.length}`)
  //     .then((res) => res.json())
  //     .then((res) => setImages(res.results.map((item) => item.picture.large)));
  // }, [data, images]);

  // React.useEffect(() => {
  //   fetch('/users')
  //     .then((res) => res.json())
  //     // .then((data) => {
  //     //   //setData(data);
  //     //   return data;
  //     // })
  //     .then((data) =>
  //       fetch(`https://randomuser.me/api/?results=${data.length}`)
  //         .then((res) => res.json())
  //         //.then((res) => setData(res.results.map((item) => item.picture.large)))
  //         .then((res) => {
  //           data = data.map(
  //             (item, i) => (item.img = res.results[i].picture.large)
  //           );
  //           setData(data);
  //         })
  //     )

  //     .catch((err) => setData(err));
  // }, []);
  // React.useEffect(() => {
  //   if (!data) return;
  //   console.log('data: ', data);
  //   console.log('images: ', images);
  //   if (images?.length > 0 && data.length === images?.length) return;
  //   fetch(`https://randomuser.me/api/?results=${data.length}`)
  //     .then((res) => res.json())
  //     .then((res) => setImages(res.results.map((item) => item.picture.large)));
  // }, [data, images]);

  return (
    <div className='App'>
      <header className='App-header'>Employees</header>
      <div>
        {!hasImages(employees) ? (
          'Loading...'
        ) : (
          <Employees employees={employees} />
        )}
      </div>
    </div>
  );
}

export default App;
