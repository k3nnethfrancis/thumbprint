import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export const LogOut = () => {
  return (
    <Button
      onClick={() => signOut()}
      bg="transparent"
      color="white"
      borderRadius="md"
      border="none"
      p={2}
      m={2}
      fontFamily="Poppins"
    >
      Sign Out
    </Button>
  );
};
