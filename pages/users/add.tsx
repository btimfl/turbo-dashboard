import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { createUser } from "../../apis/post";
import UserForm from "../../components/UserForm/UserForm";
import { User } from "../../interfaces";

export default function AddUser() {
  const formik = useFormik<User>({
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
    onSubmit: async (values) => {
      const res = await createUser(values);
      const data = await res.json();
      console.log(data);
    }
  });

  return <UserForm formik={formik} isEdit={false} />
}

AddUser.requireAuth = true;
