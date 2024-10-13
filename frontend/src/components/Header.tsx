import { Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { LogOut } from "./auth/LogOut";
import { useSession } from "next-auth/react";
import { ThumbprintIconWhite } from "./assets/icons/Icons";

export const Header = () => {
  const { data: session } = useSession() as any;

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="#3B596A"
      color="#fff"
      p={12}
      py={8}
      width="100%"
    >
      <Flex align="center" justify="center">
        <Center height="40px" width="40px" px={6}>
          <ThumbprintIconWhite />
        </Center>
        <Flex align="center" justify="center">
          <Text fontFamily="Poppins">Thumbprint</Text>
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="center"
        direction="column"
        height="auto"
        width="100%"
        color="#fff"
        p={4}
        position="absolute"
      >
        <Text fontFamily="Nunito Sans">Bring your own context.</Text>
      </Flex>
      <Flex
        align="center"
        justify="center"
        position="absolute"
        right="10px"
        top="12px"
        p={4}
        m="auto"
      >
        {session && <LogOut />}
      </Flex>
    </Flex>
  );
};
