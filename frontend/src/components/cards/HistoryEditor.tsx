import {
  Text,
  Box,
  Flex,
  Center,
  Divider,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, HistoryIcon } from "../assets/icons/Icons";

interface HistoryEditorProps {
  historyData: string[];
  clearHistory: () => void;
  editableHistoryData: string[];
  setEditableHistoryData: (data: string[]) => void;
}

// History Display Component
export const HistoryEditor = ({
  historyData,
  clearHistory,
  editableHistoryData,
  setEditableHistoryData,
}: HistoryEditorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box width="300px" p={16} bg="#fff" borderRadius="15px" shadow="md">
      <Flex direction="column">
        <Flex onClick={() => setOpen(!open)} cursor="pointer">
          <Box transform={open ? "rotate(-90deg)" : "rotate(180deg)"}>
            <ChevronDownIcon />
          </Box>
          <Center mx={8}>
            <HistoryIcon />
          </Center>
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            History
          </Text>
        </Flex>
        {open && (
          <Flex direction="column">
            <Divider width="100%" border="1px solid #ffe2bc" />
            <Spacer py={2} />
            {historyData.length > 0 ? (
              <Flex direction="column">
                {historyData.map((url, index) => (
                  <Flex key={index} align="center">
                    <Button
                      size="sm"
                      mb={4}
                      bg="none"
                      color="#E36936"
                      mr={4}
                      p={4}
                      borderRadius="md"
                      border="none"
                      onClick={() =>
                        setEditableHistoryData(
                          editableHistoryData.filter((_, i) => i !== index)
                        )
                      }
                      _hover={{ bg: "#E36936", color: "#fff" }}
                    >
                      remove
                    </Button>
                    <Text
                      key={index}
                      mb={2}
                      fontSize="xs"
                      noOfLines={1}
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {url}
                    </Text>
                  </Flex>
                ))}
                <Button mt={4} colorScheme="red" onClick={clearHistory}>
                  Clear History
                </Button>
              </Flex>
            ) : (
              <Text>No browsing history available</Text>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
