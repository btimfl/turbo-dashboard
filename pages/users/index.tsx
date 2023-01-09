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
} from "@chakra-ui/react";
import { User } from "../../interfaces";
import UsersTable from "../../components/UsersTable/UsersTable";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../apis/get";
import * as Yup from "yup";
import { useFormik } from "formik";
import UserForm from "../../components/UserForm/UserForm";
export default function UsersPage() {
  const { isLoading, isError, data } = useQuery(['getAllUsers'], getUserList);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik<User>({
    initialValues: {
      fullName: "",
      email: "",
      userRole: "",
      userName: "",
      password: "",
      enabled: true,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Requiured"),
      email: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required"),
      userName: Yup.string().required("Required"),
      password: Yup.string().min(8, "Password must be atleast 8 characters"),
    }),
    onSubmit: async (values) => {
      console.log('UPDATED', values);
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

  const onEditClick = async (userName: string) => {
    const user: User = data.find(user => user.userName === userName);
    await formik.setValues({
      fullName: user.fullName,
      email: user.email,
      userRole: user.userRole?.[0] || "",
      userName: user.userName,
      password: "",
      enabled: user.enabled ? true : false,
    })
    onOpen();
  }

  return (
    <>
      <UsersTable
        data={data?.map(user => {
          return {
            ...user,
            userRole: user.userRole?.[0] || "",
          }
        })}
        onEditClick={onEditClick}
      />
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
            <Button mr={3} onClick={formik.submitForm} size={`sm`} colorScheme="blue" marginLeft="auto">
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