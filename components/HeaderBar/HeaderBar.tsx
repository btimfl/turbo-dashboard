import { Box, Flex, Text, Icon, IconButton, MenuButton, Menu, MenuItem, MenuList } from "@chakra-ui/react";
import { CgMenu } from "react-icons/cg";
import styles from "./HeaderBar.module.scss";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function HeaderBar({ onNavToggle }: { onNavToggle: Function }) {
  const auth = useContext(AuthContext);

  const signOut = () => {
    localStorage.removeItem('turbo-merchant');
    auth.checkAuthorization();
  }

  return (
    <Flex
      flexDir={`row`}
      justifyContent={`space-between`}
      alignItems={`center`}
      className={styles.container}
    >
      <IconButton
        className={styles.menuIcon}
        variant={`ghost`}
        aria-label="Search database"
        icon={<Icon as={CgMenu} />}
        onClick={() => onNavToggle((prev: boolean) => !prev)}
      />
      <Text as="h1" flexGrow={1}>
        TURBO
      </Text>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<FaUserCircle size="25" />}
          variant='outline'
          border="none"
        />
        <MenuList>
          <MenuItem>
            <Flex alignItems="center" paddingInline="1rem" onClick={signOut}>
              <FaSignOutAlt />
              <Text as="span" paddingLeft="1rem">Signout</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
