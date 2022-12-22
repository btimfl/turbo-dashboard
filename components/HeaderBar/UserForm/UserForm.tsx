import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react"
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from 'yup';

interface UserProp {
    fullName: string,
    email: string,
    phoneNumber: string,
    userRole: string,
    userStatus: string,
    action?: any
}

export default function UserForm(props: UserProp) {

    const formik = useFormik({
        initialValues: {
            fullName: props.fullName,
            email: props.email,
            phoneNumber: props.phoneNumber,
            userStatus: props.userStatus,
            userRole: props.userRole
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required'),
            phoneNumber: Yup.string().length(10, 'Invalid Mobile Number').required('Required'),
            email: Yup.string().email('Invalid Email Format'),
            userRole: Yup.string().required('Required'),
            userStatus: Yup.mixed()
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const handleUserSubmit = () => {
        console.log("submitting");
    }

    return (
        <>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Flex gap={4}>
                        <FormControl mb={4} isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}>
                            <FormLabel ps={4} htmlFor="phone">Mobile Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input type="number" placeholder={`Mobile`} {...formik.getFieldProps('phone')}></Input>
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4} isInvalid={formik.touched.fullName && formik.errors.fullName ? true : false}>
                            <FormLabel ps={4} htmlFor="name">Name</FormLabel>
                            <Input type="text" placeholder="Name" aria-placeholder="Name" {...formik.getFieldProps('name')}></Input>
                            <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex gap={4}>
                        <FormControl mb={4} isInvalid={formik.touched.email && formik.errors.email ? true : false}>
                            <FormLabel ps={4} htmlFor="email">Email</FormLabel>
                            <Input type="text" placeholder="Email" aria-placeholder="Email" {...formik.getFieldProps('email')}></Input>
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4} isInvalid={formik.touched.userRole && formik.errors.userRole ? true : false}>
                            <FormLabel ps={4} htmlFor="email">Role</FormLabel>
                            <Select defaultValue={props.userRole} placeholder="Role" aria-placeholder="Role" {...formik.getFieldProps('role')}>
                                <option value='admin'>UI Engineer</option>
                                <option value='viewer'>Lead Engineer</option>
                            </Select>
                            <FormErrorMessage>{formik.errors.userRole}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4} isInvalid={formik.touched.userStatus && formik.errors.userStatus ? true : false}>
                            <FormLabel ps={4} htmlFor="email">Status</FormLabel>
                            <Select defaultValue={props.userStatus} placeholder="Role" aria-placeholder="Role" {...formik.getFieldProps('role')}>
                                <option value='true'>Enabled</option>
                                <option value='false'>Disabled</option>
                            </Select>
                            <FormErrorMessage>{formik.errors.userStatus}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Button type='submit' colorScheme={`teal`} size={`sm`} onClick={handleUserSubmit}>Submit</Button>
                </form>
            </Box>
        </>
    )
}