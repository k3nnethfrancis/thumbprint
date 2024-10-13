import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { AiSymbol } from "../assets/icons/Icons";

interface ProfileCardProps {
  editableUserData: {
    name: string;
    picture: string;
  };
  onClick: () => void;
}

export const ProfileCard = ({
  editableUserData,
  onClick,
}: ProfileCardProps) => {
  return (
    <Flex direction="column" align="center">
      <Box my={4} mx="auto" position="relative">
        <Button
          position="absolute"
          right={0}
          top={0}
          size="sm"
          colorScheme="teal"
          bg="transparent"
          border="none"
          onClick={onClick}
          // get bigger on hover
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s",
          }}
        >
          <AiSymbol />
        </Button>
        <Image
          src={editableUserData.picture}
          alt="Profile"
          width={50}
          height={50}
          borderRadius="50%"
        />
      </Box>
      <Text fontWeight="bold" fontSize="xl">
        {editableUserData.name}
      </Text>
    </Flex>
  );
};
