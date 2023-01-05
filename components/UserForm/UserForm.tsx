import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useState } from "react";

interface Props {
  formik: FormikProps<{
    name: string,
    email: string,
    mobile: string,
    role: string,
    username: string,
    password: string,
  }>,
  isEdit: boolean,
}

export default function UserForm({ formik, isEdit }: Props) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Box>
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
      </Box>
    </>
  );
}
