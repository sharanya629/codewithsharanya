import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../api/helper";

export default function StudentNotifications() {

    const [requests, setRequests] = useState([]);
    const [isRequestsLoading, setIsRequestsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsRequestsLoading(true)
            try {
                const response = await axios.get(`${BASE_URL}/requests/student`, {
                    params: {
                        studentId: localStorage.getItem('userId')
                    }
                })
                setRequests(response)
            } catch (err) {
                alert(err.message);
            } finally {
                setIsRequestsLoading(false);
            }
        })();
    }, [])

    return (
        <div className='px-5'>
            <h1>Notifications</h1>
            <ul className="list-group p-2">
                {isRequestsLoading ? <h5 style={{ textAlign: 'center' }}>Loading ...</h5> : requests.map(({ id, tutor, student, status }) => (
                    <li className="list-group-item position-relative d-flex justify-content-between">
                        <span class="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-light rounded-circle">
                            <span class="visually-hidden">New alerts</span>
                        </span>
                        <NotificationText tutorName={tutor.user.name} subject={tutor.subject} status={status} />
                        <button type="button" class="btn btn-outline-primary btn-sm">Mark As Read</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const NotificationText = ({ tutorName, subject, status }) => {
    switch (status) {
        case 'PENDING':
            return <span>Your request is pending with {tutorName} for subject <b>{subject}</b></span>
        case 'ACCEPTED':
            return <span>{tutorName} has accepted your tuition request for subject <b>{subject}</b></span>
        case 'REJECTED':
            return <span>{tutorName} has rejected your tuition request for subject <b>{subject}</b></span>
        default:
            return <></>
    }
}
