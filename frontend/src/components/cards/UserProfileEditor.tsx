import {
  Box,
  Flex,
  Text,
  Spacer,
  Divider,
  Center,
  Button,
  Image,
  Collapse,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, LicenseIcon } from "../assets/icons/Icons";
import { CustomInput } from "../lib/CustomInput";

interface UserProfileProps {
  editableUserData: any;
  setEditableUserData: any;
  handleInputChange: (e: any) => void;
}

export const UserProfileEditor = ({
  editableUserData,
  setEditableUserData,
  handleInputChange,
}: UserProfileProps) => {
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
          bg: "#141515",
          borderRadius: "full",
        },
      }}
    >
      <Flex onClick={() => setOpen(!open)} cursor="pointer">
        <Box transform={open ? "rotate(-90deg)" : "rotate(180deg)"}>
          <ChevronDownIcon />
        </Box>
        <Center mx={8}>
          <LicenseIcon />
        </Center>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          Identity
        </Text>
      </Flex>
      <Collapse in={open} animateOpacity>
        <Flex direction="column">
          <Divider width="100%" border="1px solid #ffe2bc" />
          <Spacer py={2} />
          {/* Editable Name */}
          <CustomInput
            name="name"
            value={editableUserData.name}
            label="Name"
            onChange={handleInputChange}
            placeholder="Enter your name"
          />

          {/* Editable Email */}
          <CustomInput
            name="email"
            value={editableUserData.email}
            label="Email"
            onChange={handleInputChange}
            placeholder="Enter your email"
          />

          {/* Display Profile Picture */}
          <Box my={4}>
            <Image
              src={editableUserData.picture}
              alt="Profile"
              width={100}
              height={100}
              borderRadius="full"
            />
          </Box>
          <CustomInput
            name="picture"
            value={editableUserData.picture}
            onChange={handleInputChange}
            placeholder="Enter your picture URL"
            label="Picture URL"
          />

          {/* website */}
          <CustomInput
            name="hd"
            value={editableUserData.hd}
            label="Website"
            onChange={handleInputChange}
            placeholder="Enter your website"
          />
          {/* Save Button */}
          <Button
            colorScheme="blue"
            margin="auto"
            onClick={() => {
              // Perform save logic here (like updating backend)
              console.log("Saved user data:", editableUserData);
            }}
          >
            Save Changes
          </Button>
        </Flex>
      </Collapse>
    </Box>
  );
};
