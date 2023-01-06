import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import UserForm from "../../components/UserForm/UserForm";

export default function AddUser() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      userRole: "",
      userName: "",
      password: "",
      enabled: true,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Requiured"),
      email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required"),
      userName: Yup.string().required("Required"),
      password: Yup.string().required('Required').min(8, "Password must be atleast 8 characters"),
    }),
    onSubmit: (values) => console.log(values),
  });

  return <UserForm formik={formik} isEdit={false} />
}

AddUser.requireAuth = true;
