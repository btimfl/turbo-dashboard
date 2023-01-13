import { Card, CardHeader, Heading, CardBody, Stack, StackDivider, Box, Text, Input, Select, Flex, FormControl, FormErrorMessage, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { ReportType } from "../../enums";
import styles from "./reports.module.scss";
import * as Yup from "yup";

export default function Reports() {
    const formik = useFormik({
        initialValues: {
            reportType: "",
            fromDate: new Date().toISOString().split('T')[0],
            toDate: new Date().toISOString().split('T')[0],
        },
        validationSchema: Yup.object().shape({
            reportType: Yup.string().required('Please select a report type'),
            fromDate: Yup.date().required('Required'),
            toDate: Yup.date().required('Required').when('fromDate', (fromDate) => {
                if (fromDate) {
                    return Yup.date()
                        .min(fromDate, 'End Date must be after Start Date')
                }
                return Yup.string();
            }),
        }),
        onSubmit: (values) => console.log(values)
    })

    return (
        <Card className={styles.card}>
            <CardHeader className={styles.header} p={2}>
                <Heading size='sm' p={2}>Download Report</Heading>
            </CardHeader>

            <CardBody className={styles.body}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing='4' fontSize="sm">
                        <FormControl isInvalid={formik.touched.reportType && !!formik.errors.reportType}>
                            <Flex alignItems="center">
                                <Text width="4rem">Type: </Text>
                                <Select fontSize="sm" h={`2rem`} placeholder='Select Option' width="15rem" display="inline-block" {...formik.getFieldProps('reportType')}>
                                    <option value={ReportType.CONSOLIDATED}>Consolidated</option>
                                </Select>
                            </Flex>
                            <FormErrorMessage>{formik.errors.reportType}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.fromDate && !!formik.errors.fromDate}>
                            <Flex alignItems="center">
                                <Text width="4rem">From: </Text>
                                <Input fontSize="sm" h={`2rem`} type="date" w="15rem" {...formik.getFieldProps('fromDate')} />
                            </Flex>
                            <FormErrorMessage>{formik.errors.fromDate}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.toDate && !!formik.errors.toDate}>
                            <Flex alignItems="center">
                                <Text width="4rem">To: </Text>
                                <Input fontSize="sm" h={`2rem`} type="date" w="15rem" {...formik.getFieldProps('toDate')} />
                            </Flex>
                            <FormErrorMessage>{formik.errors.toDate}</FormErrorMessage>
                        </FormControl>
                        <Button isLoading={formik.isSubmitting} type="submit" colorScheme="gray" color="var(--chakra-colors-teal-500)" w="19rem">Download Report</Button>
                    </Stack>
                </form>
            </CardBody>
        </Card>
    )
}

Reports.requireAuth = true;
Reports.title = 'Reports';