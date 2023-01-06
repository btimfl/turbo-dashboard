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
  Switch,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useState } from "react";
import { User } from "../../interfaces";

interface Props {
  formik: FormikProps<User>,
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
              isInvalid={formik.touched.fullName && !!formik.errors.fullName}
            >
              <FormLabel ps={4} htmlFor="fullName">
                Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Name"
                aria-placeholder="Name"
                {...formik.getFieldProps("fullName")}
              ></Input>
              <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
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
                placeholder="Email"
                aria-placeholder="Email"
                {...formik.getFieldProps("email")}
              ></Input>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              mb={4}
              isInvalid={formik.touched.userRole && !!formik.errors.userRole}
            >
              <FormLabel ps={4} htmlFor="userRole">
                Role
              </FormLabel>
              <Select
                placeholder="Select User Role"
                {...formik.getFieldProps("userRole")}
              >
                <option value="ADMIN">Admin</option>
              </Select>
              <FormErrorMessage>{formik.errors.userRole}</FormErrorMessage>
            </FormControl>
            <FormControl
              mb={4}
              isInvalid={formik.touched.userName && !!formik.errors.userName}
            >
              <FormLabel ps={4} htmlFor="name">
                Username
              </FormLabel>
              <Input
                type="text"
                placeholder="Username"
                aria-placeholder="Username"
                {...formik.getFieldProps("userName")}
              ></Input>
              <FormErrorMessage>{formik.errors.userName}</FormErrorMessage>
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
            <FormControl mb={4} display='flex' alignItems='center' isInvalid={formik.touched.enabled && !!formik.errors.enabled}>
              <FormLabel htmlFor='enabled' mb='0' ps={4} >
                Enable
              </FormLabel>
              <Switch id='enabled' isChecked={formik.values.enabled} {...formik.getFieldProps('enabled')} />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
