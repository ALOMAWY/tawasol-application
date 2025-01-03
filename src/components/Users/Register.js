import React, { useState } from "react";

import { connect } from "react-redux";

import { Link, Navigate, Redirect, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { register } from "../../redux/modules/users";

import { showAlertMessage } from "../../redux/modules/alerts";

import styled from "styled-components";

import { StyledForm } from "../styledComponents";
import Private from "../Private";
import Home from "../Home";
import { createProfile } from "../../redux/modules/profiles";
import ProfileForm from "../profilesForms/CreateProfile.js";

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d6efd;
  width: 100%;
  height: 100%;
`;

const Register = ({ isAuthenticated, register, showAlertMessage }) => {
  const navigate = useNavigate();
  const [formDate, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formDate;

  const onChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      showAlertMessage("Passwords do not match", "error");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated)
    return (
      <Navigate to={"/create-profile"}>
        <Private components={ProfileForm} />
      </Navigate>
    );

  return (
    <Section>
      <StyledForm onSubmit={onSubmit}>
        <h3>Sign Up</h3>

        <input
          type="text"
          name="name"
          align="center"
          value={name}
          onChange={onChange}
          placeholder="Full name"
        />
        <input
          type="email"
          name="email"
          align="center"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          align="center"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password2"
          align="center"
          value={password2}
          onChange={onChange}
          placeholder="Confirm Password"
        />

        <input type="submit" value="Send" />

        <p align="center">
          Already have an account? <Link to={"/login"}>Sign In</Link>
        </p>
      </StyledForm>
    </Section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  showAlertMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users?.isAuthenticated || false,
});

export default connect(mapStateToProps, { showAlertMessage, register })(
  Register
);
