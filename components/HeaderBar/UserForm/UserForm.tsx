import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react"
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from 'yup';

interface UserProp {
    name: string,
    email: string,
    phone: string,
    role: string,
    status: string,
}

export default function UserForm(props: UserProp) {

    const formik = useFormik({
        initialValues: {
            name: props.name,
            email: props.email,
            phone: props.phone,
            status: props.status,
            role: props.role
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            phone: Yup.string().length(10, 'Invalid Mobile Number').required('Required'),
            email: Yup.string().email('Invalid Email Format'),
            role: Yup.string().required('Required'),
            status: Yup.mixed()
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
                        <FormControl mb={4} isInvalid={formik.touched.phone && formik.errors.phone ? true : false}>
                            <FormLabel ps={4} htmlFor="phone">Mobile Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input type="number" placeholder={`Mobile`} {...formik.getFieldProps('phone')}></Input>
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4} isInvalid={formik.touched.name && formik.errors.name ? true : false}>
                            <FormLabel ps={4} htmlFor="name">Name</FormLabel>
                            <Input type="text" placeholder="Name" aria-placeholder="Name" {...formik.getFieldProps('name')}></Input>
                            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex gap={4}>
                        <FormControl mb={4} isInvalid={formik.touched.email && formik.errors.email ? true : false}>
                            <FormLabel ps={4} htmlFor="email">Email</FormLabel>
                            <Input type="text" placeholder="Email" aria-placeholder="Email" {...formik.getFieldProps('email')}></Input>
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4} isInvalid={formik.touched.role && formik.errors.role ? true : false}>
                            <FormLabel ps={4} htmlFor="email">Role</FormLabel>
                            <Select placeholder="Role" aria-placeholder="Role" {...formik.getFieldProps('role')}>
                                <option value='admin'>UI Engineer</option>
                                <option value='viewer'>Lead Engineer</option>
                            </Select>
                            <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Button type='submit' colorScheme={`teal`} size={`sm`} onClick={handleUserSubmit}>Submit</Button>
                </form>
            </Box>
        </>
    )
}