import { Tabs, TabList, Tab } from "@chakra-ui/react";
import styles from "./ChartTabs.module.scss";

interface Props {
  tabIndex: number;
  setTabIndex: Function;
}

export default function ChartTabs({ tabIndex, setTabIndex }: Props) {
  return (
    <Tabs variant="unstyled" onChange={(index) => setTabIndex(index)} index={tabIndex}>
      <TabList className={styles.tabs}>
        <Tab className={styles.tab} _selected={{ color: "white", bg: "black" }} fontSize="sm">
          With OTP
        </Tab>
        <Tab className={styles.tab} _selected={{ color: "white", bg: "black" }} fontSize="sm">
          Consolidated
        </Tab>
        <Tab className={styles.tab} _selected={{ color: "white", bg: "black" }} fontSize="sm">
          Without OTP
        </Tab>
      </TabList>
    </Tabs>
  );
}
