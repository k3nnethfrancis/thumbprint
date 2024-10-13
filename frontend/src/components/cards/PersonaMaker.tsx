import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Divider,
  Spacer,
  Collapse,
  VStack,
  Heading,
  Center,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, CopyIcon, LicenseIcon } from "../assets/icons/Icons";

export default function PersonaCookieForm({
  userData,
  setUserData,
  aIData,
  setAIData,
  historyData,
  setHistoryData,
}) {
  const [cookie, setCookie] = useState("");
  const [open, setOpen] = useState(false);

  const toast = useToast();

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Box
      width="300px"
      p={16}
      py={24}
      bg="#fff"
      borderRadius="15px"
      shadow="md"
      color="#141515"
      maxH="400px"
      overflow="hidden"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "#141515",
          borderRadius: "full",
        },
      }}
    >
      <Flex onClick={() => setOpen(!open)} cursor="pointer" align="center">
        <Box transform={open ? "rotate(-90deg)" : "rotate(180deg)"}>
          <ChevronDownIcon />
        </Box>
        <Center mx={8}>
          <LicenseIcon />
        </Center>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          Contexts
        </Text>
      </Flex>
      <Collapse in={open} animateOpacity>
        <VStack spacing={4}>
          <Divider />
          <Spacer py={2} />

          {aIData && (
            <Box
              mt={6}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="gray.50"
              w="100%"
            >
              <Flex justify="start">
                <Text fontWeight="bold">Description</Text>
                <Button
                  onClick={() => copyToClipboard(aIData.description)}
                  bg="transparent"
                  border="none"
                >
                  <CopyIcon />
                </Button>
              </Flex>

              <Spacer py={2} />
              <Text
                fontFamily="monospace"
                fontSize="sm"
                whiteSpace="pre-wrap"
                noOfLines={3}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {aIData.description}
              </Text>

              <Spacer py={2} />
              {/* interests */}
              <Flex justify="start">
                <Text fontWeight="bold">Interests</Text>
                <Button
                  onClick={() => copyToClipboard(aIData.Interests)}
                  bg="transparent"
                  border="none"
                >
                  <CopyIcon />
                </Button>
              </Flex>
              <Spacer py={2} />
              <Text
                fontFamily="monospace"
                fontSize="sm"
                whiteSpace="pre-wrap"
                noOfLines={3}
              >
                {aIData.interests}
              </Text>

              <Spacer py={2} />
              {/* hobbies */}
              <Flex justify="start">
                <Text fontWeight="bold">Hobbies</Text>
                <Button
                  onClick={() => copyToClipboard(aIData.hobbies)}
                  bg="transparent"
                  border="none"
                >
                  <CopyIcon />
                </Button>
              </Flex>
              <Spacer py={2} />
              <Text
                fontFamily="monospace"
                fontSize="sm"
                whiteSpace="pre-wrap"
                noOfLines={3}
              >
                {aIData.career_and_business}
              </Text>
            </Box>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
}
