import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon, IconButton, List, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './Navigation.module.scss';


interface NavigationProps {
    isMenuOpen?: boolean,
    setMenuOpen?: any
}
import { MENU_ITEMS } from "./MenuItems";

interface NavItem {
    title: string,
    icon?: any,
    children: any[]
}

export default function Navigation(props: NavigationProps) {
    const router = useRouter();
    return (
        <>
            {props.isMenuOpen}
            <Box className={`${styles.container} ${props.isMenuOpen ? styles.openMenu: styles.closedMenu }`}>
                <Box className={styles.navGroup}>
                    <Box>
                    <Accordion allowToggle reduceMotion={true}>                    
                        {
                            MENU_ITEMS.map((navItem, navIdx) => (
                                <AccordionItem className={`${styles.navItem}`} key={`navItem-${navIdx}`} borderTopWidth={0} borderBottomWidth={1}>
                                    {
                                        ({ isExpanded }) => (
                                            <>
                                                <Link href={`${navItem.path ?? `#`}`}>
                                                    <Flex flexDir={`row`} className={`${styles.navTitle} ${isExpanded ? styles.expandedNavItem : ''} ${ router.pathname === navItem.path ? styles.activeNav : '' }`} p={3}  minHeight={`48px`}>

                                                        <Flex flexDir={`row`} alignItems={`center`} w={`100%`}>
                                                            {navItem.icon}
                                                            <Box ps={4} className={styles.openOnly}>
                                                                <Text as="span">{navItem.title}</Text>
                                                            </Box>
                                                            {navItem.children.length ? <AccordionButton className={styles.openOnly} _hover={{background: `transparent`}} flexGrow={1} justifyContent={`flex-end`} w={`auto`} p={0}><AccordionIcon /></AccordionButton> : null}
                                                        </Flex>

                                                    </Flex>
                                                </Link>
                                                {
                                                    navItem.children.length ?
                                                    <AccordionPanel p={0} className={`${styles.navList} ${styles.openOnly}`}>
                                                        <List className={styles.childNavList}>
                                                            {navItem.children.map((navChild, navChildIdx) => {
                                                                return (
                                                                    <ListItem key={`navChildId-${navChildIdx}`} ps={12} pb={2}>
                                                                        <Link href={`${navChild.path}`} className={router.pathname === navChild.path ? 'active' : ''}>
                                                                            <Text as="span" fontSize={`xs`}>{navChild.title}</Text>
                                                                        </Link>
                                                                    </ListItem>
                                                                );
                                                            })}
                                                        </List>
                                                    </AccordionPanel> : null
                                                }
                                            </>
                                        )
                                    }
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                    </Box>
                </Box>
            </Box>
        </>
    )
}