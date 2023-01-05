import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import styles from "./dashboard.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import GraphWithoutOTP from "../../components/Graphs/GraphWithoutOTP";

enum Duration {
    LAST_WEEK = "Last 7 Days",
    LAST_MONTH = "Last Month",
    LAST_90_DAYS = "Last 90 Days",
    THIS_WEEK = "This Week",
    THIS_MONTH = "This Month",
}

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

            <GraphWithoutOTP />
        </Box>
    )
}

Dashboard.requireAuth = true;