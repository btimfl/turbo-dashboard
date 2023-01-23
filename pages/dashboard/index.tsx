import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast
} from "@chakra-ui/react";
import styles from "./dashboard.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import GraphTotalAndSuccessfullHits from "../../components/Graphs/GraphTotalAndSuccessfullHits";
import { Duration } from "../../enums";
import PieSuccessfulAndUnsuccessfulHits from "../../components/Graphs/PieSuccessfulAndUnsuccessfulHits";
import ChartTabs from "../../components/ChartTabs/ChartTabs";

export default function Dashboard() {
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [duration, setDuration] = useState<Duration>(Duration.LAST_WEEK);
  const [fromDate, setFromDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (new Date(fromDate).getTime() > new Date(toDate).getTime()) {
      toast({
        title: 'Invalid Date Range',
        status: 'error',
        variant: 'left-accent',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [fromDate, toDate])

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
        {
          duration === Duration.CUSTOM
            ? (
              <>
                <Box ml={2}>
                  <Text as="span" mr={2}>From: </Text>
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} w="10rem" />
                </Box>
                <Box ml={2}>
                  <Text as="span" mr={2}>To: </Text>
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} w="10rem" />
                </Box>
              </>
            )
            : null
        }
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
          <ChartTabs tabIndex={tabIndex} />
        </Flex>
        <Flex p={2} width="80%" marginInline="auto">
          <GraphTotalAndSuccessfullHits duration={duration} fromDate={fromDate} toDate={toDate} setTabIndex={setTabIndex} />
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
          <ChartTabs tabIndex={tabIndex} />
        </Flex>
        <Flex>
          <PieSuccessfulAndUnsuccessfulHits duration={duration} fromDate={fromDate} toDate={toDate} />
        </Flex>
      </Box>
    </Box>
  );
}

Dashboard.requireAuth = true;
