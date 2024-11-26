import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const StudentSignupForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    location: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    phoneNo: false,
    password: false,
    confirmPassword: false,
  });
  const { token, signup } = useAuth();
  const navigate = useNavigate();

  const emailPattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]');
  // const pwdPattern = new RegExp("[a-z0-9A-Z][A-Za-z\d@$!%*?&]{6,}");
  const phoneNoPattern = new RegExp("^\\d{10}$");

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "name":
        setFormValues({ ...formValues, fullName: e.target.value });
        break;
      case "email":
        setFormValues({ ...formValues, email: e.target.value });
        if (emailPattern.test(e.target.value)) {
          setFormErrors({ ...formErrors, email: false });
        }
        else {
          setFormErrors({ ...formErrors, email: true });
        }
        break;
      case "mobile":
        setFormValues({ ...formValues, phoneNo: e.target.value });
        if (phoneNoPattern.test(e.target.value)) {
          setFormErrors({ ...formErrors, phoneNo: false });
        }
        else {
          setFormErrors({ ...formErrors, phoneNo: true });
        }
        break;
      case "location":
        setFormValues({ ...formValues, location: e.target.value });
        break;
      case "password":
        setFormValues({ ...formValues, password: e.target.value });
        // if (pwdPattern.test(e.target.value)) {
        //   setFormErrors({ ...formErrors, password: false });

        // }
        // else {
        //   setFormErrors({ ...formErrors, password: true });
        //   ;
        // }
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
      formValues.phoneNo &&
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password === formValues.confirmPassword
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    if (!shouldEnableSubmitButton()) return;
    await signup({ ...formValues, role: "Student" })
    alert('Signup Successful. Please login to continue.');
  }

  return (
    <form className="d-flex flex-column needs-validation" style={{ gap: "1rem" }} onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="inputFullName" className="form-label">
          Full Name*
        </label>
        <input
          id="inputFullName"
          name="name"
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
        <label htmlFor="inputPhoneNo" className="form-label">
          Phone Number*
        </label>
        <input
          id="inputPhoneNo"
          name="mobile"
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
        className={`errorDiv visible`}
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

export default StudentSignupForm;