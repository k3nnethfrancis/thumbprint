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
      fontFamily="Poppins"
      _hover={{ bg: "transparent", color: "#F9A826" }}
    >
      Sign Out
    </Button>
  );
};
