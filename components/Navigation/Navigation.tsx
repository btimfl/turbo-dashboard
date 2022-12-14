import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon, IconButton, List, ListItem, Text } from "@chakra-ui/react";
import { ChevronDownIcon, InfoIcon } from '@chakra-ui/icons';
import styles from './Navigation.module.scss';
import { Dispatch, SetStateAction } from "react";

interface NavigationProps {
    isMenuOpen: boolean,
    setMenuOpen: any
}

export default function Navigation(props: NavigationProps) {
    return (
        <Box className={`${styles.container} ${props.isMenuOpen ? styles.openMenu : styles.closedMenu}`}>
            <Box className={styles.navGroup}>
                <Box className={styles.navItem}>
                <Accordion allowToggle reduceMotion={true}>
                    <AccordionItem>
                        <Flex flexDir={`row`} className={styles.navTitle} justifyContent={`space-between`} alignItems={`center`}>
                            <AccordionButton p={0}>
                                <Flex flexDir={`row`} alignItems={`center`} justifyContent={`space-between`} w={`100%`}>
                                    <Icon ms={3} fontSize="md" children={<InfoIcon />}></Icon>
                                    <Text as="h3" flexGrow={1} textAlign={`left`} ps={2} fontSize={`sm`}>Navigation Item Title</Text>
                                    <AccordionIcon m={2}/>
                                </Flex>
                            </AccordionButton>
                        </Flex>
                        <AccordionPanel p={2} className={styles.navList}>
                            <List>
                                <ListItem>
                                    <Text as="span" fontSize="xs">Child Item 1</Text>
                                </ListItem>
                            </List>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                </Box>
            </Box>
        </Box>
    )
}