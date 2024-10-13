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

const CopyButton = ({ data, toastTitle }) => {
  const toast = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    toast({
      title: toastTitle,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        copyToClipboard();
      }}
      bg="transparent"
      border="none"
      px={2}
    >
      <CopyIcon />
    </Button>
  );
};

const DataDisplaySection = ({ title, content, onCopy }) => (
  <>
    <Flex justify="start">
      <Text fontWeight="bold">{title}</Text>
      <CopyButton data={content} toastTitle={`${title} copied`} />
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
      {content}
    </Text>
  </>
);

export default function PersonaCookieForm({
  userData,
  setUserData,
  aIData,
  setAIData,
  historyData,
  setHistoryData,
}) {
  const [open, setOpen] = useState(false);

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
          bg: "#3B596A",
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
        <CopyButton
          data={JSON.stringify(aIData)}
          toastTitle="Contexts copied"
        />
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
              <DataDisplaySection
                title="Description"
                content={aIData.description}
              />
              <Spacer py={2} />
              <DataDisplaySection title="Tags" content={aIData.tags} />
              <Spacer py={2} />
              <DataDisplaySection
                title="Interests"
                content={aIData.interests}
              />
              <Spacer py={2} />
              <DataDisplaySection
                title="Personality Traits"
                content={aIData.personality_traits}
              />
              <Spacer py={2} />
              <DataDisplaySection
                title="Career and Business"
                content={aIData.career_and_business}
              />
            </Box>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
}
