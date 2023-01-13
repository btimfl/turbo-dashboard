import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import styles from "./dashboard.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import GraphTotalAndSuccessfullHits from "../../components/Graphs/GraphTotalAndSuccessfullHits";
import { Duration } from "../../enums";
import PieSuccessfulAndUnsuccessfulHits from "../../components/Graphs/PieSuccessfulAndUnsuccessfulHits";
import ChartTabs from "../../components/ChartTabs/ChartTabs";

export default function Dashboard() {
  const [tabIndexPie, setTabIndexPie] = useState<number>(0);
  const [tabIndexLine, setTabIndexLine] = useState<number>(0);
  const [duration, setDuration] = useState<Duration>(Duration.LAST_WEEK);

  return (
    <Box className={styles.container}>
      <Flex justifyContent="flex-end" align={`center`}>
        <Text as="span" mr={2}>Timeline: </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<AiFillCaretDown />} w="8.5rem" h={`2rem`} p={2} fontSize="sm">
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

      <Box mt={4} mb={4} className={styles.graphContainer}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          className={styles.graphHeader}
          p={2}
        >
          <Text fontSize="sm" fontWeight="bold" color="gray.700">
            Successful and Unsuccessful API hits
          </Text>
          <ChartTabs tabIndex={tabIndexLine} setTabIndex={setTabIndexLine} />
        </Flex>
        <Flex p={2}>
          <GraphTotalAndSuccessfullHits duration={duration} tabIndex={tabIndexLine} />
        </Flex>
      </Box>

      <Box className={styles.graphContainer}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          className={styles.graphHeader}
          p={2}
        >
          <Text fontSize="sm" fontWeight="bold" color="gray.700">
            Successful and Unsuccessful API hits
          </Text>
          <ChartTabs tabIndex={tabIndexPie} setTabIndex={setTabIndexPie} />
        </Flex>
        <Flex>
          <PieSuccessfulAndUnsuccessfulHits duration={duration} tabIndex={tabIndexPie} />
        </Flex>
      </Box>
    </Box>
  );
}

Dashboard.requireAuth = true;
