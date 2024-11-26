
import { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { BASE_URL } from '../api/helper';


const StudentHome = () => {

    const [search, setSearch] = useState({
        subject: '',
        location: '',
    });
    const [tutors, setTutors] = useState([]);
    const [isTutorsLoading, setIsTutorsLoading] = useState(false);

    const handleInputChange = (e, type) => {
        switch (type) {
            case 'subject':
                setSearch({ ...search, subject: e.target.value })
                break;
            case 'location':
                setSearch({ ...search, location: e.target.value })
                break;
            default:
                break;
        }
    }

    const handleSearch = async () => {
        setIsTutorsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/tutors/search`, {
                params: {
                    subject: search.subject,
                    location: search.location
                }
            })
            setTutors(response)
        } catch (err) {
            alert(err.message);
        } finally {
            setIsTutorsLoading(false);
        }

    }

    return (
        <div className='App'>
            <div class="input-group" style={{ width: '50%', margin: 'auto' }}>
                <input type="text" class="form-control" placeholder="Search Subject" onChange={(e) => handleInputChange(e, 'subject')} />
                <input type="text" class="form-control" placeholder="Search Location" onChange={(e) => handleInputChange(e, 'location')} />
                <button type="button" className="btn btn-primary" onClick={handleSearch} disabled={!search.location || !search.subject}>Search</button>
            </div>
            <div className={`d-flex ${isTutorsLoading ? 'justify-content-center' : 'justify-content-between'}`} style={{ gap: '2rem', padding: '4rem' }}>
                {isTutorsLoading ? <h5>Loading ...</h5> : tutors.map(({ id, user, subject, tutionFee }) => <Card key={id} tutorName={user.name} email={user.email} subject={subject} location={user.location} tutionFee={tutionFee} />)}
            </div>
        </div>
    );
}

export default StudentHome