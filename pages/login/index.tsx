import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import styles from "./login.module.scss";
import * as Yup from "yup";

export default function Login() {
  const [show, setShow] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .email("Please enter a valid email"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => console.log(values),
  });

  return (
    <Box className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Box>
          <Heading mb="2rem">Welcome To Turbo</Heading>
          <FormControl
            mb={4}
            isInvalid={formik.touched.email && !!formik.errors.email}
          >
            <FormLabel ps={4} htmlFor="email">
              Email Id
            </FormLabel>
            <Input
              type="text"
              placeholder="johndoe@company.com"
              aria-placeholder="johndoe@company.com"
              {...formik.getFieldProps("email")}
            ></Input>
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
          <Flex justifyContent="center">
            <Button
              w="10rem"
              type="submit"
              color="white"
              background="rgb(101,87,245)"
              marginInline="auto"
            >
              Sign in
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
}
