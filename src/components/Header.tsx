import { Flex, Text } from "@chakra-ui/react";
import { Login } from "./auth/LogIn";
import { LogOut } from "./auth/LogOut";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession() as any;

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="#3B596A"
      color="#fff"
      p={4}
      width="100%"
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        bg="#3B596A"
        height="auto"
        width="100%"
        color="#fff"
        p={4}
      >
        <Text fontFamily="Nunito Sans">Bring your own context.</Text>
      </Flex>
      <Flex
        align="center"
        justify="center"
        position="absolute"
        right="0"
        top="0"
        p={4}
        m="auto"
      >
        {session ? <LogOut /> : <Login />}
      </Flex>
    </Flex>
  );
};
