import axios from "axios";
import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/helper";

const TutorSignupForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    bio: "",
    phoneNo: "",
    location: "",
    subject: "",
    tutionFee: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    phoneNo: false,
    tutionFee: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const emailPattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]');
  const pwdPattern = new RegExp("[a-z0-9A-Z][A-Za-z\d@$!%*?&]{6,}");
  const phoneNoPattern = new RegExp("^\\d{10}$");
  const numberPattern = new RegExp("^\\d+$");

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "fullName":
        setFormValues({ ...formValues, fullName: e.target.value });
        break;
      case "email":
        setFormValues({ ...formValues, email: e.target.value });
        if (emailPattern.test(e.target.value)) {
          setFormErrors({ ...formErrors, email: false });
        } else {
          setFormErrors({ ...formErrors, email: true });
        }
        break;
      case "bio":
        setFormValues({ ...formValues, bio: e.target.value });
        break;
      case "phoneNo":
        setFormValues({ ...formValues, phoneNo: e.target.value });
        if (phoneNoPattern.test(e.target.value)) {
          setFormErrors({ ...formErrors, phoneNo: false });
        } else {
          setFormErrors({ ...formErrors, phoneNo: true });
        }
        break;
      case "location":
        setFormValues({ ...formValues, location: e.target.value });
        break;
      case "subject":
        setFormValues({ ...formValues, subject: e.target.value });
        break;
      case "tutionFee":
        setFormValues({ ...formValues, tutionFee: e.target.value });
        if (numberPattern.test(e.target.value)) {
          setFormErrors({ ...formErrors, tutionFee: false });
        } else {
          setFormErrors({ ...formErrors, tutionFee: true });
        }
        break;
      case "password":
        setFormValues({ ...formValues, password: e.target.value });
        if (pwdPattern.test(e.target.value)) {
          setFormErrors({ ...formErrors, password: false });

        } else {
          setFormErrors({ ...formErrors, password: true });
          ;
        }
        break;
      case "confirmPassword":
        setFormValues({ ...formValues, confirmPassword: e.target.value });
        setFormErrors({ ...formErrors, confirmPassword: formValues.password !== e.target.value });
        break;
      default:
        break
    }
  }

  const shouldEnableSubmitButton = () => {
    return (
      formValues.fullName &&
      formValues.email &&
      formValues.bio &&
      formValues.phoneNo &&
      formValues.location &&
      formValues.subject &&
      formValues.tutionFee &&
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password === formValues.confirmPassword
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shouldEnableSubmitButton()) return;
    try {
      await axios.post(`${BASE_URL}/tutors/signup`, {
        user: {
          name: formValues.fullName,
          email: formValues.email,
          mobile: formValues.phoneNo,
          location: formValues.location,
          password: formValues.confirmPassword,
          role: 'Tutor'
        },
        subject: formValues.subject,
        bio: formValues.bio,
        tutionFee: formValues.tutionFee
      })
      alert('Signup Successful. Please login to continue.');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form class="d-flex flex-column needs-validation" style={{ gap: "1rem" }} onSubmit={handleSubmit} noValidate>
      <div>
        <label for="inputFullName" class="form-label">
          Full Name*
        </label>
        <input
          id="inputFullName"
          name="fullName"
          className="form-control"
          type="text"
          placeholder="John Doe"
          value={formValues.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="inputEmail" className="form-label">
          Email*
        </label>
        <input
          id="inputEmail"
          name="email"
          className={`form-control ${formValues.email && (formErrors.email ? "is-invalid" : "is-valid")}`}
          type="email"
          placeholder="john@example.com"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        {formValues.email && formErrors.email && <div className="form-text text-danger fst-italic">
          Please enter a valid email.
        </div>}
      </div>
      <div>
        <label for="inputBio" class="form-label">
          Bio*
        </label>
        <textarea
          id="inputBio"
          name="bio"
          class="form-control"
          type="bio"
          placeholder="I am a tutor ..."
          value={formValues.bio}
          onChange={handleInputChange}
          required
        />
      </div>
      <div class="d-flex justify-content-between" style={{ gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="inputPhoneNo" className="form-label">
            Phone Number*
          </label>
          <input
            id="inputPhoneNo"
            name="phoneNo"
            className={`form-control ${formValues.phoneNo && (formErrors.phoneNo ? "is-invalid" : "is-valid")}`}
            type="tel"
            placeholder="1234567890"
            value={formValues.phoneNo}
            onChange={handleInputChange}
            required
          />
          {formValues.phoneNo && formErrors.phoneNo && <div className="form-text text-danger fst-italic">
            Please enter 10 digit mobile number.
          </div>}
        </div>
        <div style={{ flex: 1 }}>
          <label for="inputLocation" class="form-label">
            Location*
          </label>
          <input
            id="inputLocation"
            name="location"
            class="form-control"
            type="text"
            placeholder="City, State"
            value={formValues.location}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div class="d-flex justify-content-between" style={{ gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label for="inputSubject" class="form-label">
            Subject*
          </label>
          <input
            id="inputSubject"
            name="subject"
            class="form-control"
            type="text"
            placeholder="Maths, Science"
            value={formValues.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label for="inputTutionFee" class="form-label">
            Tution Fee*
          </label>
          <input
            id="inputTutionFee"
            name="tutionFee"
            class="form-control"
            type="text"
            placeholder="1000"
            value={formValues.tutionFee}
            onChange={handleInputChange}
            required
          />
          {formValues.tutionFee && formErrors.tutionFee && <div className="form-text text-danger fst-italic">
            Tution Fee should be a number.
          </div>}
        </div>
      </div>
      <div>
        <label htmlFor="inputPassword" className="form-label">
          Password*
        </label>
        <input
          id="inputPassword"
          name="password"
          className={`form-control ${formValues.password && (formErrors.password ? "is-invalid" : "is-valid")}`}
          type="password"
          placeholder="*****"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {formValues.password && formErrors.password && <div className="form-text text-danger fst-italic">
          Please enter a valid password.
        </div>}
      </div>
      {formValues.password && !formErrors.password && <PasswordStrengthBar
        password={formValues.password}
        shortScoreWord="Too Short"
        scoreWords={["Fair", "Fair", "Good", "Strong", "Excellent"]}
        className="errorDiv"
      />}
      <div>
        <label htmlFor="inputConfirmPassword" className="form-label">
          Confirm Password*
        </label>
        <input
          id="inputConfirmPassword"
          name="confirmPassword"
          className={`form-control ${formValues.confirmPassword && (formErrors.confirmPassword ? "is-invalid" : "is-valid")}`}
          type="password"
          placeholder="*****"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {formValues.confirmPassword && formErrors.confirmPassword && <div className="form-text text-danger fst-italic">
          Passwords do not match.
        </div>}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!shouldEnableSubmitButton()}
      >
        Sign Up
      </button>
    </form>
  );
};

export default TutorSignupForm;