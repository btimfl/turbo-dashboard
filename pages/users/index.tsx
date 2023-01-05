import {
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  Center,
  useOutsideClick,
  Tag,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  Table,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getUserList } from "../../apis/get";
import UserForm from "../../components/UserForm/UserForm";
import styles from "./users.module.scss";
import { useQuery } from "@tanstack/react-query";
import { FaCircle, FaDotCircle } from "react-icons/fa";

export interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
  userStatus: string;
  action?: any;
}

const defaultData: User[] = [
  {
    fullName: "Raghav Kanwal",
    email: "raghav.kanwal@unicommerce.com",
    phoneNumber: "+91 9654723413",
    userRole: "Tech Lead",
    userStatus: "Active",
    action: "",
  },
];

const columnHelper = createColumnHelper<User>();

export default function UsersPage() {
  const columns = [
    columnHelper.accessor("fullName", {
      header: () => <span className={styles.columnHeader}>Name</span>,
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("email", {
      header: () => <span className={styles.columnHeader}>Email</span>,
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("phoneNumber", {
      header: () => <span className={styles.columnHeader}>Phone</span>,
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("userRole", {
      header: () => <span className={styles.columnHeader}>Role</span>,
      cell: (info) => {
        const val = info.getValue();
        return Array.isArray(val) ? val.join(", ") : val;
      },
    }),
    columnHelper.accessor("userStatus", {
      header: () => <span className={styles.columnHeader}>Status</span>,
      cell: (info) => {
        const val = info.getValue();
        return val ? (
          <Tag colorScheme="green">
            <TagLeftIcon as={FaCircle} fontSize={`5px`} />
            Enabled
          </Tag>
        ) : (
          <Tag colorScheme="red">
            {" "}
            <TagLeftIcon as={FaCircle} fontSize={`5px`} />
            Disabled
          </Tag>
        );
      },
    }),
    columnHelper.accessor("action", {
      header: () => <span className={styles.columnHeader}>Actions</span>,
      cell: (info) => (
        <Button
          colorScheme={`teal`}
          size={`xs`}
          onClick={() => handleEditUser(info.row.original)}
        >
          Edit
        </Button>
      ),
    }),
  ];

  const handleEditUser = ({ ...props }) => {
    setEditingUser(props?.row?.original);
    return onOpen();
  };

  const [editingUser, setEditingUser] = useState<User>({
    fullName: "",
    email: "",
    phoneNumber: "",
    userRole: "",
    userStatus: "",
    action: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["getUserList"],
    queryFn: getUserList,
  });
  const [rowData, setData] = useState(() => [...defaultData]);
  const table = useReactTable({
    data: data
      ? data.usersList.map((row) => {
          return {
            name: row["fullName"],
            email: row["email"],
            phone: row["phoneNumber"],
            role: row["userRole"][0],
            status: row["userStatus"],
          };
        })
      : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    if (data) {
      setData(data.usersList);
    }
  }, [data]);

  if (isLoading)
    return (
      <Center h={`100vh`}>
        <Spinner />
      </Center>
    );

  if (isError) return <Text as="span">Error!</Text>;

  return (
    <>
      <table className={styles.table}>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <Box p={2} textAlign={`left`}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Box>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <Box className={styles.cellContainer} p={2}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <Modal
        closeOnEsc={true}
        closeOnOverlayClick={true}
        variant={`flyout`}
        isOpen={isOpen}
        onClose={onClose}
        size={`full`}
        motionPreset={`none`}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            p={2}
            pl={4}
            borderBottom={`1px solid var(--chakra-colors-gray-200)`}
            fontSize={`md`}
          >
            Edit User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm {...editingUser} />
          </ModalBody>

          <ModalFooter
            justifyContent={`flex-start`}
            p={2}
            pl={4}
            borderTop={`1px solid var(--chakra-colors-gray-200)`}
            fontSize={`md`}
          >
            <Button mr={3} onClick={onClose} size={`xs`}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
