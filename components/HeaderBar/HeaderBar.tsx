import { Box, Flex, Text, Icon, IconButton, propNames } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function HeaderBar() {
    return (
        <Flex flexDir={`row`} justifyContent={`space-between`} alignItems={`center`}>
            <IconButton variant={`ghost`} aria-label='Search database' icon={<HamburgerIcon />}/>
            <Text as="h1" flexGrow={1}>TURBO</Text>
        </Flex>
    )
}