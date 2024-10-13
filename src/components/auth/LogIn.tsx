import { Text, Box, Flex, Center, Spacer, Button } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  GoogleIcon,
  MetaIcon,
  SteamIcon,
  AvatarIcon,
} from "../assets/icons/Google";

export const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Flex
        textAlign="center"
        direction="column"
        bg="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)"
        p={10}
        height="325px"
        width="200px"
        borderRadius="5px"
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
      >
        <Center height="100%" width="100%">
          <Flex direction="column" color="#3B596A" justifyContent="center">
            <Center height="100%" width="100%">
              <AvatarIcon />
            </Center>

            <Text fontFamily="Poppins" fontSize="2xl">
              Thumbprint
            </Text>

            <Spacer py={8} />

            <Button
              onClick={() => signIn("google")}
              bg="#3B596A"
              color="#fff"
              p={10}
              border={0}
              borderRadius="5px"
              cursor="pointer"
              alignItems="center"
              alignContent="center"
            >
              Sign in
            </Button>

            <Spacer py={8} />

            <Flex direction="row" color="#3B596A" alignItems="center">
              <GoogleIcon />
              <Spacer px={8} />
              <MetaIcon />
              <Spacer px={8} />
              <SteamIcon />
            </Flex>
          </Flex>
        </Center>
      </Flex>
    </Box>
  );
};
