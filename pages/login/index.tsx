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
  useToast,
  Text
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import styles from "./login.module.scss";
import * as Yup from "yup";
import { login } from "../../apis/post";
import { useRouter } from "next/router";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import Aside from "../../components/Aside/Aside";
import SocialHeader from "../../components/SocialHeader/SocialHeader";

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { checkAuthorization } = useContext(AuthContext);
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
    onSubmit: async (values) => {
      try {
        const data = await login(values);

        if (data.hasOwnProperty('api_error')) throw new Error(data.api_error.message);

        if (data.access_token) {
          localStorage.setItem('turbo-merchant', data.access_token);
          checkAuthorization();
          router.replace('/dashboard');
        }
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

  return (
    <Box className={styles.container}>
      <Aside />
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <SocialHeader />
        <Box>
          <Text mb="0.25rem" fontWeight="500" fontSize="1.5rem">Login to Unicommerce-Turbo</Text>
          <Text mb="2rem" fontWeight="light" fontSize="1.2rem">Enter your details below.</Text>
          <FormControl
            mb={6}
            isInvalid={formik.touched.email && !!formik.errors.email}
          >
            <FormLabel htmlFor="email" fontSize="0.7rem" fontWeight="bold" color="gray.600">
              EMAIL
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
            <FormLabel htmlFor="name" fontSize="0.7rem" fontWeight="bold" color="gray.600">
              PASSWORD
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
              isLoading={formik.isSubmitting}
              w="100%"
              type="submit"
              marginTop="3rem"
              color="white"
              background="rgb(101,87,245)"
              marginInline="auto"
            >
              Login
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
}

Login.title = 'Login';