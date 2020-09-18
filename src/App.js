import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import axios from 'axios'

const App = () => {

  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Address',
        accessor: 'address'
      }
    ]
  })

  useEffect(() => {
    axios.get(`https://randomuser.me/api?results=20`)
      .then(( { data }) => {
        let employees = data.results.map(employee => ({
            firstName: employee.name.first,
            lastName: employee.name.last,
            email: employee.email,
            address: employee.location.street.number + ' ' + employee.location.street.name + ' '  + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode
        }))
        setEmployeeState({ ...employeeState, employees})
      })
      .catch(err => console.error(err))
  }, [])
  return (
    <>
      <ReactTable
        data={employeeState.employees}
        columns={employeeState.columns}
      />
    </>
  )
}

export default App