import React, { useState } from 'react'
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from 'react-router-dom';
import '../styles/signUpStudent.css'


export default function SignUpTutor() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [phoneNoError, setPhoneNoError] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPswd, setConfirmPswd] = useState('');
    const [subjects, setSubjects] = useState('');
    const [profilePic, setProfilePic] = useState();
    const [city, setCity] = useState('');
    const [dstate, setDstate] = useState('');
    const [country, setCountry] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [tuitionFee, setTuitionFee] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [pswdError, setPswdlError] = useState(false);
    const [pwdCompError, setPwdCompError] = useState(false);
    const [continueNext, setContinueNext] = useState(false);


    const emailPattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]');
    const pwdPattern = new RegExp("[a-z0-9A-Z][A-Za-z\d@$!%*?&]{6,}");
    const phoneNoPattern = new RegExp("^\\d{10}$");



    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleLocation = (e) => {
        setLocation(e.target.value);
    }

    const handleBio = (e) => {
        setBio(e.target.value);
    }

    const handleSubject = (e) => {
        setSubject(e.target.value);
    }

    const handleTuitionFee = (e) => {
        setTuitionFee(e.target.value);
    }


    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (emailPattern.test(e.target.value)) {
            setEmailError(false)
        }
        else {
            setEmailError(true);
        }

    }
    const handlePhoneNo = (e) => {
        setPhoneNo(e.target.value);
        if (phoneNoPattern.test(e.target.value)) {
            setPhoneNoError(false)
        }
        else {
            setPhoneNoError(true);
        }

    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (pwdPattern.test(e.target.value)) {
            setPswdlError(false)
        }
        else {
            setPswdlError(true);
        }
    }
    const handleSubjects = (e) => {
        setSubjects(e.target.value);
    }

    const handleProfilePic = (e) => {
        console.log(e.target.files)
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    }

    const handleCity = (e) => {
        setCity(e.target.value);
    }

    const handleState = (e) => {
        setDstate(e.target.value);
    }

    const handleCountry = (e) => {
        setCountry(e.target.value);
    }

    const handleAboutMe = (e) => {
        setAboutMe(e.target.value);
    }

    const handleConfirmPswd = (e) => {
        setConfirmPswd(e.target.value);
        setPwdCompError(!(password === e.target.value))
    }


    const shouldEnableSubmitButton = () => {
        return subjects && firstName && lastName && email && password && password === confirmPswd;
    }

    const shouldEnableNextButton = () => {
        return firstName && lastName && email && password && password === confirmPswd;
    }

    const handleOnNext = (e) => {
        e.preventDefault();
        if (!shouldEnableNextButton()) {
            //setError(true);
            return;
        }
        else {
            //setError(false);
            setContinueNext(true);

        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!(shouldEnableSubmitButton())) {
            //setError(true);
            return;
        }
        else {
            //setError(false);
            setSubmitted(true);
            navigate('/Tutor/FirstHome')

        }
    }
    const handleOnBackClick = () => {
        setContinueNext(false);
    }

    return (
        <div className='formContainer'>
            {!continueNext &&
                <>
                    <div className='inputWrapper firstNameContainer'>
                        <i className="bi bi-person-plus-fill"></i>
                        <input className='input' value={firstName} type='text' onChange={handleFirstName} placeholder="Enter First Name"></input>
                    </div>
                    <div className='inputWrapper'>
                        <i className="bi bi-person-plus-fill"></i>
                        <input className='input' value={lastName} type='text' onChange={handleLastName} placeholder="Enter Last Name"></input>
                    </div>
                    <div className='inputWrapper'>
                        <i className="bi bi-envelope-fill"></i>
                        <input className='input' value={email} type='email' onChange={handleEmail} placeholder="Enter Email Id"></input>
                    </div>
                    <div className={`errorDiv ${email && emailError ? 'visible' : 'hidden'}`}><i className="bi bi-exclamation-lg"></i>Invalid Valid Email address</div>
                    <div className='inputWrapper'>
                        <i className="bi bi-telephone-fill"></i>
                        <input className='input' value={phoneNo} type='tel' onChange={handlePhoneNo} placeholder="Enter Phone Number"></input>
                    </div>


                    <div className={`errorDiv ${phoneNo && phoneNoError ? 'visible' : 'hidden'}`}><i className="bi bi-exclamation-lg"></i>Please Enter 10 Digit Mobile Number</div>
                    <div className='inputWrapper customMarginTop'>
                        <i className="bi bi-key-fill"></i>
                        <input className='input' value={password} type='password' onChange={handlePassword} placeholder="Enter Password"></input>
                    </div>
                    {!password && <div className='errorDiv hidden'>hello</div>}
                    {password && pswdError &&
                        <div className={`errorDiv visible`}>
                            <i className="bi bi-exclamation-lg"></i>
                            Invalid Password format.
                        </div>
                    }
                    {password && !pswdError &&
                        <PasswordStrengthBar
                            password={password}
                            shortScoreWord="Too Short"
                            scoreWords={["Fair", "Fair", "Good", "Strong", "Excellent"]}
                            className={`errorDiv visible`}
                        />
                    }
                    <div className='inputWrapper customMarginTop'>
                        <i className="bi bi-key-fill"></i>
                        <input className='input' value={confirmPswd} type='password' onChange={handleConfirmPswd} placeholder="Enter Password again"></input>
                    </div>
                    <div className={`errorDiv ${confirmPswd && pwdCompError ? 'visible' : 'hidden'}`}><i className="bi bi-exclamation-lg"></i>Passwords Dont Match</div>
                    <div className='signInButtonContainer customMarginTop'>
                        <button className={`signInButton ${shouldEnableNextButton() ? `` : `disable`}`} onClick={handleOnNext}><i className="bi bi-caret-right-fill"></i></button>
                    </div>
                </>
            }
            {
                continueNext &&
                <>
                    <div className='inputWrapper'>
                        <i className="bi bi-geo-alt-fill"></i>
                        <input className='input' value={location} type='text' onChange={handleLocation} placeholder="Enter Location"></input>
                    </div>
                    <div className='inputWrapper'>
                        <i className="bi bi-pencil-fill"></i>
                        <textarea className='input' value={bio} type='text' onChange={handleBio} placeholder="Enter Bio"></textarea>
                    </div>
                    <div className='inputWrapper'>
                        <i className="bi bi-book-fill"></i>
                        <input className='input' value={subject} type='tel' onChange={handleSubject} placeholder="Enter Subject"></input>
                    </div>
                    <div className='inputWrapper'>
                        <i className="bi bi-coin"></i>
                        <input className='input' value={tuitionFee} type='number' onChange={handleTuitionFee} placeholder="Enter Tuition Fee"></input>
                    </div>
                    <div className='signInButtonContainer customMarginTop'>
                        <button className={`signInButton ${shouldEnableSubmitButton() ? `` : `disable`}`} onClick={handleOnSubmit}>Submit</button>
                        <button className={`signInButton backButton`} onClick={handleOnBackClick}><i className="bi bi-caret-left-fill"></i></button>
                    </div>
                </>

            }
        </div>
    )
}
