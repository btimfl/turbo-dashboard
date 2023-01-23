import { Tabs, TabList, Tab, HStack, Tag, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./ChartTabs.module.scss";

interface Props {
  tabIndex: number;
}

function getTabTitle(tabIndex: number): string {
  console.log(tabIndex);
  switch (tabIndex) {
    case -1: return ''; break;
    case 0: return 'Consolidated'; break;
    case 1: return 'With OTP'; break;
    default: return 'Without OTP'; break;
  }
}

export default function ChartTabs({ tabIndex }: Props) {
  const [tabTitle, setTabTitle] = useState<string>(getTabTitle(tabIndex));

  useEffect(() => {
    setTabTitle(getTabTitle(tabIndex));
  }, [tabIndex])

  if (!tabTitle) return <></>

  return (
    <HStack spacing={4}>
      <Tag size='lg' variant='solid' colorScheme='teal' fontSize="0.75rem">
        {tabTitle}
      </Tag>
    </HStack>
  );
}
