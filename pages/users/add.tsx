import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import UserForm from "../../components/UserForm/UserForm";

export default function AddUser() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      role: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Requiured"),
      email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required"),
      mobile: Yup.string()
        .length(10, "Please enter a valid mobile number")
        .required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().min(8, "Password must be atleast 8 characters"),
    }),
    onSubmit: (values) => console.log(values),
  });

  return <UserForm formik={formik} isEdit={false} />
}

AddUser.requireAuth = true;
