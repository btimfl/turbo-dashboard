import { Box, Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spinner, Center, useOutsideClick } from '@chakra-ui/react';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, Table } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { getUserList } from '../../apis/get';
import UserForm from '../../components/HeaderBar/UserForm/UserForm';
import styles from './users.module.scss';
import { useQuery } from '@tanstack/react-query';

export interface User {
    name: string,
    email: string,
    phone: string,
    role: string,
    status: string
    action?: any
}

const columnHelper = createColumnHelper<User>();

const defaultData: User[] = [
    {
        name: 'Raghav Kanwal',
        email: 'raghav.kanwal@unicommerce.com',
        phone: '+91 9654723413',
        role: 'Tech Lead',
        status: 'Active',
        action: ''
    }
];

export default function UsersPage() {

    const [editingUser, setEditingUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        role: '',
        status: '',
        action: ''
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isLoading, isError, data } = useQuery({
        queryKey: ['getUserList'],
        queryFn: getUserList
    });

    const [rowData, setData] = useState(() => [...defaultData])

    const columns = [
        columnHelper.accessor('name', {
            header: () => <span className={styles.columnHeader}>Name</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('email', {
            header: () => <span className={styles.columnHeader}>Email</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('phone', {
            header: () => <span className={styles.columnHeader}>Phone</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('role', {
            header: () => <span className={styles.columnHeader}>Role</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('status', {
            header: () => <span className={styles.columnHeader}>Status</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('action', {
            header: () => <span className={styles.columnHeader}>Actions</span>,
            cell: props => { return (<Button colorScheme={`teal`} size={`xs`} onClick={() => handleEditUser(props)}>Edit</Button>)}
        }),
    ]
    
    const table = useReactTable({
        data: rowData,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    useEffect(() => {
        if(data) {
            setData(data.usersList);
        }
    }, [data])

    if(isLoading) return <Center h={`100vh`}><Spinner /></Center>

    if(isError) return <Text as="span">Error!</Text>

    const handleEditUser = ({...props}) => {  
        setEditingUser(props?.row?.original);
        console.log("Editing user", props?.row?.original);
        setEditingUser(props?.row?.original);
        return onOpen()
    }


    return (
        <>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} >
                                    <Box p={2} textAlign={`left`}>
                                    {
                                        header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                    </Box>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
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
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
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

            <Modal closeOnEsc={true} closeOnOverlayClick={true} variant={`flyout`} isOpen={isOpen} onClose={onClose} size={`full`} motionPreset={`none`}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader p={2} pl={4} borderBottom={`1px solid var(--chakra-colors-gray-200)`} fontSize={`md`}>Edit User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <UserForm {...editingUser}/>
                </ModalBody>

                <ModalFooter justifyContent={`flex-start`} p={2} pl={4} borderTop={`1px solid var(--chakra-colors-gray-200)`} fontSize={`md`}>
                    <Button mr={3} onClick={onClose} size={`xs`}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
    )
}
