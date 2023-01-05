import { Tabs, TabList, Tab } from "@chakra-ui/react";
import styles from "./ChartTabs.module.scss";

interface Props {
  setTabIndex: Function;
}

export default function ChartTabs({ setTabIndex }: Props) {
  return (
    <Tabs variant="unstyled" onChange={(index) => setTabIndex(index)}>
      <TabList className={styles.tabs}>
        <Tab className={styles.tab} _selected={{ color: "white", bg: "black" }}>
          With OTP
        </Tab>
        <Tab className={styles.tab} _selected={{ color: "white", bg: "black" }}>
          Consolidated
        </Tab>
        <Tab className={styles.tab} _selected={{ color: "white", bg: "black" }}>
          Without OTP
        </Tab>
      </TabList>
    </Tabs>
  );
}
