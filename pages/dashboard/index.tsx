import { Box, Button, Divider, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import styles from "./dashboard.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import GraphWithoutOTP from "../../components/Graphs/GraphWithoutOTP";
import { Duration } from "../../enums";

export default function Dashboard() {
    const [duration, setDuration] = useState<string>(Duration.LAST_WEEK);

    return (
        <Box className={styles.container}>
            <Flex justifyContent="flex-end">
                <Menu>
                    <MenuButton as={Button} rightIcon={<AiFillCaretDown />} w="10rem">
                        {duration}
                    </MenuButton>
                    <MenuList>
                        {Object.keys(Duration).map((key, index) => <MenuItem key={index} onClick={() => setDuration(Duration[key])}>{Duration[key]}</MenuItem>)}
                    </MenuList>
                </Menu>
            </Flex>

            <GraphWithoutOTP duration={duration} />
            <Divider marginBlock="2rem" variant="thick" />
        </Box>
    )
}

Dashboard.requireAuth = true;