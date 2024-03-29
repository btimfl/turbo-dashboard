import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Center,
  Spinner,
  useToast,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { User, UserFormFields } from "../../interfaces";
import UsersTable from "../../components/UsersTable/UsersTable";
import { useQuery } from "react-query";
import { getUserList } from "../../apis/get";
import * as Yup from "yup";
import { useFormik } from "formik";
import UserForm from "../../components/UserForm/UserForm";
import { useContext, useState } from "react";
import { updateUser } from "../../apis/patch";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import styles from './users.module.scss'
export default function UsersPage() {
  const toast = useToast();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, data } = useQuery(['getAllUsers', isOpen], () => getUserList(auth.merchant!));

  // FORM FOR EDIT USER
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
      password: Yup.string().min(8, "Password must be atleast 8 characters"),
      fullName: Yup.string().required("Required"),
      phoneNumber: Yup.string().length(10, "Please enter a valid phone number"),
      userRole: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const payload = {};
      Object.keys(values).map(key => {
        if (key === 'password' || key == 'email') return;
        if (values[key] != user?.[key]) payload[key] = values[key];
      })
      try {
        await updateUser(values.email, payload);
        toast({
          title: 'User updated!',
          status: 'success',
          variant: 'left-accent',
          position: "top-right",
          isClosable: true,
        });
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
      onClose();
    }
  });


  if (isLoading) return (
    <Center h="calc(100vh - 40px)">
      <Spinner />
    </Center>
  )

  if (isError) return (
    <Center h="calc(100vh - 40px)">
      An error occurred, please reload or try again later!
    </Center>
  )

  const onEditClick = async (email: string) => {
    const _user = data.find(user => user.email === email);
    setUser(_user);
    await formik.setValues({
      email: _user.email,
      password: "",
      fullName: _user.fullName,
      userStatus: _user.userStatus ? true : false,
      phoneNumber: _user.phoneNumber ?? "",
      userRole: _user.userRole?.[0] || "",
    })
    onOpen();
  }

  return (
    <>
      <Box className={styles.tableContainer}>
        <Flex className={styles.tableHeader} p={2} mb={2}>
          <Text fontSize="sm" fontWeight="bold" color="gray.700">
            List of Users
          </Text>
        </Flex>
        <UsersTable
          data={data?.map(user => {
            return {
              email: user.email,
              password: "",
              fullName: user.fullName,
              userStatus: user.userStatus ? true : false,
              phoneNumber: user.phoneNumber ?? "",
              userRole: user.userRole?.[0] || "",
            }
          })}
          onEditClick={onEditClick}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size="lg"
        closeOnEsc={true}
        closeOnOverlayClick={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader p={2}
            pl={4}
            borderBottom={`1px solid var(--chakra-colors-gray-200)`}
            fontSize={`md`}>Edit User</DrawerHeader>

          <DrawerBody>
            <UserForm formik={formik} isEdit={true} />
          </DrawerBody>

          <DrawerFooter justifyContent={`flex-start`}
            p={2}
            pl={4}
            borderTop={`1px solid var(--chakra-colors-gray-200)`}
            fontSize={`md`}>
            <Button mr={3} onClick={formik.submitForm} size={`sm`} colorScheme="blue" marginLeft="auto" isLoading={formik.isSubmitting}>
              Save
            </Button>
            <Button mr={3} onClick={onClose} size={`sm`}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

UsersPage.requireAuth = true;
UsersPage.title = 'Users';