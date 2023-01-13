import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import styles from "./dashboard.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import GraphTotalAndSuccessfullHits from "../../components/Graphs/GraphTotalAndSuccessfullHits";
import { Duration } from "../../enums";
import PieSuccessfulAndUnsuccessfulHits from "../../components/Graphs/PieSuccessfulAndUnsuccessfulHits";

export default function Dashboard() {
  const [duration, setDuration] = useState<Duration>(Duration.LAST_WEEK);

  return (
    <Box className={styles.container}>
      <Flex justifyContent="flex-end">
        <Menu>
          <MenuButton as={Button} rightIcon={<AiFillCaretDown />} w="8.5rem" fontSize="sm">
            {duration}
          </MenuButton>
          <MenuList>
            {Object.keys(Duration).map((key, index) => (
              <MenuItem key={index} onClick={() => setDuration(Duration[key])}>
                {Duration[key]}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <GraphTotalAndSuccessfullHits duration={duration} />
      <Divider marginBlock="2rem" variant="thick" />
      <PieSuccessfulAndUnsuccessfulHits duration={duration} />
    </Box>
  );
}

Dashboard.requireAuth = true;
