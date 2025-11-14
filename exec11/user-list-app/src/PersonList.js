import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Container } from 'react-bootstrap';
import './PersonList.css';

class PersonList extends Component {
    // Define state default values
    state = {
        persons: []
    }

    // Component Lifecycle Callback
    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        return (
            <Container fluid>
                <div className="header">
                    <h1>User List</h1>
                </div>
                {this.state.persons.map((person, index) => (
                    <Card key={index} className="user-card">
                        <Card.Body className="user-card-body">
                            <div className="user-header">
                                Ms {person.name.first} {person.name.last} - {person.login.uuid}
                            </div>
                            <div className="user-content">
                                <div className="user-image">
                                    <img
                                        src={person.picture.large}
                                        alt={`${person.name.first} ${person.name.last}`}
                                        className="profile-image"
                                    />
                                    <Button variant="primary" className="details-btn">Details</Button>
                                </div>
                                <div className="user-details">
                                    <div className="detail-row">
                                        <span className="detail-label">User Name:</span>
                                        <span className="detail-value">{person.login.username}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Gender:</span>
                                        <span className="detail-value">{person.gender.toUpperCase()}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Time Zone Description:</span>
                                        <span className="detail-value">{person.location.timezone.description}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Address:</span>
                                        <span className="detail-value">
                                            {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Email:</span>
                                        <span className="detail-value">{person.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Birth Date and Age:</span>
                                        <span className="detail-value">
                                            {new Date(person.dob.date).toLocaleString()} ({person.dob.age})
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Register Date:</span>
                                        <span className="detail-value">
                                            {new Date(person.registered.date).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Phone#:</span>
                                        <span className="detail-value">{person.phone}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Cell#:</span>
                                        <span className="detail-value">{person.cell}</span>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    }
}

export default PersonList;
