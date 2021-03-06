import React, { useEffect, useState } from 'react';
import SignedInUser from '../components/SignedInUser';
import Title from './../components/Title';
import Button from './../components/Button';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import UserDatakit from '../data/UserDatakit';

const ROOT_URL = 'https://frebi.willandskill.eu/';
const API_URL = `${ROOT_URL}api/v1/`;

export default function CustomerList(props) {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const userDataKit = new UserDatakit();

  function getCustomerList() {
    const url = `${API_URL}customers`;
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDataKit.getSessionToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.results);
        setLoading(true);
      });
  }

  useEffect(() => {
    if (userDataKit.getSessionToken() !== null) {
      getCustomerList();
    }
    if (props.location.state !== null) {
      setAlertMsg(props.location.state);
    }
    setTimeout(() => {
      setAlertMsg(null);
    }, 1500);
  }, []);

  const renderedCustomer = customerList.map((customer, index) => {
    return (
      <tr key={customer.id}>
        <td>{index + 1}</td>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.phoneNumber}</td>
        <td>
          <Link to={`/show/${customer.id}`}>View</Link>
        </td>
      </tr>
    );
  });
  return (
    <>
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col-md-4">
              <SignedInUser />
            </div>
            <div className="col-md-8">
              {alertMsg &&
                Object.entries(alertMsg).map((msg) => {
                  if (msg[0] === 'successMsg') {
                    return (
                      <div className="alert alert-success" role="alert">
                        {msg[1]}
                      </div>
                    );
                  } else {
                    return (
                      <div className="alert alert-danger" role="alert">
                        {msg[1]}
                      </div>
                    );
                  }
                })}
              <div className="d-flex justify-content-between row mb-3">
                <Title title="Customer List" />
                <Link to="/create">
                  <Button btnText="Create new customer"></Button>
                </Link>
              </div>
              {renderedCustomer && (
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>{renderedCustomer}</tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div className="col-md-12 text-center">
            <div className="mb-5">Loading...</div>
            <Spinner animation="border" size="lg"></Spinner>
          </div>
        )}
      </div>
    </>
  );
}
