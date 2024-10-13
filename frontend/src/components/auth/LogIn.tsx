import {
  Text,
  Box,
  Flex,
  Center,
  Spacer,
  Button,
  Input,
  Collapse,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  GoogleIcon,
  MetaIcon,
  SteamIcon,
  ThumbprintIconBlue,
} from "../assets/icons/Icons";
import { CustomInput } from "../lib/CustomInput";

interface LoginProps {
  userData: any;
  setUserData: any;
  editableHistoryData: string[];
  setEditableHistoryData: any;
  setSlectedSites?: any;
  selectedSites?: any;
}

export const Login = ({
  userData,
  setUserData,
  editableHistoryData,
  setEditableHistoryData,
  setSlectedSites,
  selectedSites,
}: LoginProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
        background: "none",
      }}
    >
      <Box
        width="100%"
        height="100%"
        bg="#F7FCFF"
        color="#141515"
        bgImage="url('/assets/thumbprint_bg.png')"
        position="absolute"
        zIndex="-1"
      />
      <Flex
        textAlign="center"
        direction="column"
        bg="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)"
        p={10}
        height="487.5px"
        width="300px"
        borderRadius="5px"
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
      >
        <Center height="100%" width="100%">
          <Flex direction="column" color="#3B596A" justifyContent="center">
            <Center width="100%">
              <Box height="40px" width="40px" px={6}>
                <ThumbprintIconBlue />
              </Box>
            </Center>

            <Text fontFamily="Poppins" fontSize="2xl">
              Thumbprint
            </Text>

            <Spacer py={8} />

            <Anon
              open={open}
              setOpen={setOpen}
              editableHistoryData={editableHistoryData}
              setEditableHistoryData={setEditableHistoryData}
              userData={userData}
              setUserData={setUserData}
              setSlectedSites={setSlectedSites}
              selectedSites={selectedSites}
            />

            <Spacer py={8} />

            {!open && (
              <>
                <Button
                  onClick={() => signIn("google")}
                  bg="transparent"
                  color="#3B596A"
                  border="solid"
                  borderWidth="1px"
                  borderColor="#3B596A"
                  p={10}
                  borderRadius="5px"
                  cursor="pointer"
                  alignItems="center"
                  alignContent="center"
                >
                  Sign in
                </Button>

                <Spacer py={8} />
              </>
            )}

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

export const Anon = ({
  open,
  setOpen,
  editableHistoryData,
  setEditableHistoryData,
  userData,
  setUserData,
  setSlectedSites,
  selectedSites,
}) => {
  return (
    <Flex align="center" direction="column">
      <Button
        onClick={() => setOpen(!open)}
        bg="#3B596A"
        color="#fff"
        p={10}
        border={0}
        borderRadius="5px"
        cursor="pointer"
        alignItems="center"
        alignContent="center"
        width="100%"
      >
        Anon Login
      </Button>
      <Text fontFamily="Poppins" fontSize="10px" fontWeight="bold" py={4}>
        Fill in only the info you want to use
      </Text>
      <Collapse in={open} animateOpacity>
        <Flex direction="column" color="#3B596A" alignItems="center">
          <Spacer py={4} />
          <CustomInput
            name="name"
            value=""
            label="Name"
            onChange={() => {}}
            placeholder="Name"
          />
          <Spacer py={8} />
          <CustomInput
            name="email"
            value=""
            label="Email"
            onChange={() => {}}
            placeholder="Email"
          />
        </Flex>
        <Spacer py={8} />
        <Text fontWeight="bold" textAlign="center">
          Sites you use
        </Text>
        <Flex
          direction="row"
          color="#3B596A"
          alignItems="center"
          wrap="wrap"
          overflow="hidden"
          overflowY="scroll"
          maxH="100px"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "#fff",
              borderRadius: "full",
              width: "6px",
            },
          }}
        >
          {editableHistoryData &&
            editableHistoryData.map((site) => (
              <Button
                bg="#3B596A"
                color="#fff"
                p={10}
                border={0}
                borderRadius="5px"
                cursor="pointer"
                alignItems="center"
                alignContent="center"
                width="100%"
                key={site}
                mb={4}
              >
                {/* checkmark if selected */}
                {`${site} ${site === "Google" ? "✓" : ""}`}
              </Button>
            ))}
        </Flex>
      </Collapse>
    </Flex>
  );
};
