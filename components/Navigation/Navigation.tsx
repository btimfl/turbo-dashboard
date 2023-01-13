import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navigation.module.scss";
import { MENU_ITEMS } from "./MenuItems";
interface Props {
  isMenuOpen?: boolean;
}

export default function Navigation({ isMenuOpen }: Props) {
  const router = useRouter();

  return (
    <Box
      className={`${styles.container} ${
        isMenuOpen ? styles.openMenu : styles.closedMenu
      }`}
    >
      <Box className={styles.navGroup}>
        <Accordion allowToggle reduceMotion={true}>
          {MENU_ITEMS.map((navItem, navIdx) => (
            <AccordionItem
              className={`${styles.navItem}`}
              key={`navItem-${navIdx}`}
              borderTopWidth={0}
              borderBottomWidth={1}
            >
              {({ isExpanded }) => (
                <>
                  <Flex
                    flexDir={`row`}
                    className={`${styles.navTitle} ${
                      isExpanded ? styles.expandedNavItem : ""
                    } ${
                      router.pathname.includes(navItem.path)
                        ? styles.activeNav
                        : ""
                    }`}
                    p={3}
                    minHeight={`48px`}
                  >
                    <Flex flexDir={`row`} alignItems={`center`} w={`100%`}>
                      <Link href={`${navItem.path ?? `#`}`}>
                        <Text as="span" className={styles.navIconContainer}>{navItem.icon}</Text>
                      </Link>
                      <Link href={`${navItem.path ?? `#`}`}>
                        <Box ps={6} className={styles.openOnly}>
                          <Text as="span" _hover={{ textDecor: `underline` }}>
                            {navItem.title}
                          </Text>
                        </Box>
                      </Link>
                      {navItem.children.length ? (
                        <AccordionButton
                          className={styles.openOnly}
                          _hover={{ background: `transparent` }}
                          flexGrow={1}
                          justifyContent={`flex-end`}
                          w={`auto`}
                          p={0}
                        >
                          <AccordionIcon />
                        </AccordionButton>
                      ) : null}
                    </Flex>
                  </Flex>
                  {navItem.children.length ? (
                    <AccordionPanel
                      p={0}
                      className={`${styles.navList} ${styles.openOnly}`}
                    >
                      <List className={styles.childNavList}>
                        {navItem.children.map((navChild, navChildIdx) => {
                          return (
                            <ListItem
                              key={`navChildId-${navChildIdx}`}
                              ps={12}
                              pb={2}
                            >
                              <Link
                                href={`${navItem.path}${navChild.path}`}
                                className={
                                  router.pathname ==
                                  `${navItem.path}${navChild.path}`
                                    ? styles.activeChild
                                    : ""
                                }
                              >
                                <Text as="span" fontSize={`xs`}>
                                  {navChild.title}
                                </Text>
                              </Link>
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionPanel>
                  ) : null}
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}
