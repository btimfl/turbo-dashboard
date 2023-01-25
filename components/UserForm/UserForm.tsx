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
import { UserFormFields } from "../../interfaces";

interface Props {
  formik: FormikProps<UserFormFields>,
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
              isInvalid={formik.touched.email && !!formik.errors.email}
              isDisabled={isEdit}
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
            <FormControl mb={4} isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}>
              <FormLabel ps={4} htmlFor="phoneNumber">
                Phone Number
              </FormLabel>
              <InputGroup>
                <InputLeftAddon p={2} background={`none`}>
                  +91
                </InputLeftAddon>
                <Input
                  ps={2}
                  id='phone'
                  type='number'
                  placeholder='Phone Number'
                  {...formik.getFieldProps('phoneNumber')}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
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
                <option value="admin">Admin</option>
              </Select>
              <FormErrorMessage>{formik.errors.userRole}</FormErrorMessage>
            </FormControl>
            {
              isEdit ?
                null :
                (
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
                )
            }
            <FormControl mb={4} display='flex' alignItems='center' isInvalid={formik.touched.userStatus && !!formik.errors.userStatus}>
              <FormLabel htmlFor='userStatus' mb='0' ps={4} >
                Enable
              </FormLabel>
              <Switch id='userStatus' isChecked={formik.values.userStatus} {...formik.getFieldProps('userStatus')} />
            </FormControl>
            {!isEdit ? <Button type="submit" isLoading={formik.isSubmitting}>Submit</Button> : null}
          </Box>
        </form>
      </Box>
    </>
  );
}
