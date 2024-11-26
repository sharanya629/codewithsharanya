import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../api/helper'

const Card = ({ id, tutorName, email, mobile, subject, location, tutionFee }) => {

    const handleBookAppointment = async () => {
        try {
            await axios.post(`${BASE_URL}/requests/createRequest`, {
                tutorId: id,
                studentId: localStorage.getItem('userId')
            })
            alert('Appointment Booked Successfully')
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="card" style={{ minWidth: '30%' }}>
            <div className="card-body">
                <h5 className="card-title">{tutorName}</h5>
                <p className="card-text">Email: {email}</p>
                <p className="card-text">Mobile: {mobile}</p>
                <p className="card-text">Subject: {subject}</p>
                <p className="card-text">Location: {location}</p>
                <p className="card-text">Tution Fee: {tutionFee}</p>
                <button className="btn btn-primary" onClick={handleBookAppointment}>Book Appointment</button>
            </div>
        </div>
    )
}

export default Card