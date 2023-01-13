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

      <Box mt="2rem">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="1rem"
          paddingStart="1rem"
        >
          <Text textDecor="underline" fontSize="lg">
            Successful and Unsuccessful API hits
          </Text>
          <ChartTabs tabIndex={tabIndexLine} setTabIndex={setTabIndexLine} />
        </Flex>
        <GraphTotalAndSuccessfullHits duration={duration} tabIndex={tabIndexLine} />
      </Box>


      <Divider marginBlock="2rem" variant="thick" />

      <Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="1rem"
          paddingStart="1rem"
        >
          <Text textDecor="underline" fontSize="lg">
            Successful and Unsuccessful API hits
          </Text>
          <ChartTabs tabIndex={tabIndexPie} setTabIndex={setTabIndexPie} />
        </Flex>
        <PieSuccessfulAndUnsuccessfulHits duration={duration} tabIndex={tabIndexPie} />
      </Box>
    </Box>
  );
}

Dashboard.requireAuth = true;
