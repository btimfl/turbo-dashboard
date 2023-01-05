import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  FormErrorMessage,
  Select,
  Button,
  InputRightElement,
  Center,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function AddUser() {
  const [show, setShow] = useState<boolean>(false);

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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box w={`min(100%, 750px)`}>
          <FormControl
            mb={4}
            isInvalid={formik.touched.name && !!formik.errors.name}
          >
            <FormLabel ps={4} htmlFor="name">
              Name
            </FormLabel>
            <Input
              type="text"
              placeholder="Name"
              aria-placeholder="Name"
              {...formik.getFieldProps("name")}
            ></Input>
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl
            mb={4}
            isInvalid={formik.touched.email && !!formik.errors.email}
          >
            <FormLabel ps={4} htmlFor="email">
              Email
            </FormLabel>
            <Input
              type="text"
              placeholder="email"
              aria-placeholder="Email"
              {...formik.getFieldProps("email")}
            ></Input>
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            mb={4}
            isInvalid={formik.touched.mobile && !!formik.errors.mobile}
          >
            <FormLabel ps={4} htmlFor="mobile">
              Mobile
            </FormLabel>
            <InputGroup>
              <InputLeftAddon>+91</InputLeftAddon>
              <Input
                type="number"
                placeholder={`Mobile`}
                {...formik.getFieldProps("mobile")}
              ></Input>
            </InputGroup>
            <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
          </FormControl>
          <FormControl
            mb={4}
            isInvalid={formik.touched.role && !!formik.errors.role}
          >
            <FormLabel ps={4} htmlFor="role">
              Role
            </FormLabel>
            <Select
              placeholder="Select User Role"
              {...formik.getFieldProps("role")}
            >
              <option value="ADMIN">Admin</option>
            </Select>
            <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
          </FormControl>
          <FormControl
            mb={4}
            isInvalid={formik.touched.username && !!formik.errors.username}
          >
            <FormLabel ps={4} htmlFor="name">
              Username
            </FormLabel>
            <Input
              type="text"
              placeholder="Username"
              aria-placeholder="Username"
              {...formik.getFieldProps("username")}
            ></Input>
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl
            mb={4}
            isInvalid={formik.touched.password && !!formik.errors.password}
          >
            <FormLabel ps={4} htmlFor="name">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                aria-placeholder="Password"
                {...formik.getFieldProps("password")}
              ></Input>
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </>
  );
}

AddUser.requireAuth = true;
