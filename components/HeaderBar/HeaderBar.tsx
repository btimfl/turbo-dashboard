import { Box, Flex, Text, Icon, IconButton } from "@chakra-ui/react";
import { CgMenu } from "react-icons/cg";
import styles from './HeaderBar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { MouseEventHandler, useState } from "react";

export default function HeaderBar(props: any) {

    const [isNavOpen, setNavOpen] = useState(false); 

    const handleIconClick = (event: MouseEvent) => {
        return props.onNavToggle(event)
    }
    
    return (
        <Flex flexDir={`row`} justifyContent={`space-between`} alignItems={`center`} className={styles.container}>
            <IconButton className={styles.menuIcon} variant={`ghost`} aria-label='Search database' icon={<Icon as={CgMenu} />} onClick={handleIconClick}/>
            <Text as="h1" flexGrow={1}>TURBO</Text>
            <Icon as={FaUserCircle} me={3} fontSize={`lg`} cursor={`pointer`}></Icon>
        </Flex>
    )
}