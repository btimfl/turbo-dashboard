import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { createUser } from "../../apis/post";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import UserForm from "../../components/UserForm/UserForm";
import { User, UserFormFields } from "../../interfaces";

export default function AddUser() {
  const toast = useToast();
  const router = useRouter();
  const auth = useContext(AuthContext);
  const formik = useFormik<UserFormFields>({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      userStatus: true,
      phoneNumber: "",
      userRole: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required"),
      password: Yup.string().required('Required').min(8, "Password must be atleast 8 characters"),
      fullName: Yup.string().required("Required"),
      phoneNumber: Yup.string().length(10, "Please enter a valid phone number"),
      userRole: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await createUser({ ...values, joinedGroupName: [auth.merchant!], userRole: [values.userRole] });
        toast({
          title: 'User created!',
          status: 'success',
          variant: 'left-accent',
          position: "top-right",
          isClosable: true,
        });
        router.push('/users');
      } catch (err) {
        toast({
          title: 'A problem occurred!',
          description: `${err}`,
          status: 'error',
          variant: 'left-accent',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
    }
  });

  return <UserForm formik={formik} isEdit={false} />
}

AddUser.requireAuth = true;
