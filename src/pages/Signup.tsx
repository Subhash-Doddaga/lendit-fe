import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {useSignup} from "../api/auth/auth.hooks";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is Required"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup: React.FC = () => {
  const navigate = useNavigate();
  let signupMutation = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
        signupMutation.mutate({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        })
    //   navigate("/login");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("firstName")} placeholder="Firstname"></input>
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <input {...register("lastName")} placeholder="Lastname"></input>
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <input {...register("email")} placeholder="Email"></input>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
