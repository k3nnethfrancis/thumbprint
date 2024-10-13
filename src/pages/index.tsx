import {
  LicenseIcon,
  HistoryIcon,
  AiIcon,
} from "@/components/assets/icons/Google";
import { Header } from "@/components/Header";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Input,
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuButton,
  MenuList,
  createIcon,
  Center,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession() as any;
  const [userData, setUserData] = useState(null);
  const [aIData, setAIData] = useState(null);
  const [historyData, setHistoryData] = useState<string[]>([]);

  const [editableUserData, setEditableUserData] = useState({
    name: "",
    email: "",
    picture: "",
    hd: "",
  });

  const [editableAIData, setEditableAIData] = useState<string[]>([]);
  const [editableHistoryData, setEditableHistoryData] = useState<string[]>([]);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await res.json();
        setUserData(data);
        setEditableUserData({
          name: data.name,
          email: data.email,
          picture: data.picture,
          hd: data.hd,
        });
      };
      fetchData();
    }
  }, [session]);

  // Simulating browser history for demo
  useEffect(() => {
    const history = [
      "https://example.com/page1",
      "https://example.com/page2",
      "https://example.com/page3",
    ];
    setHistoryData(history);
    setEditableHistoryData(history);
  }, []);

  return (
    <Flex direction="column" align="center" width="100vw" overflow="hidden">
      <Header />
      <Flex
        direction="column"
        align="center"
        height="100vh"
        width="100%"
        overflow="hidden"
      >
        <Box
          width="100%"
          height="100%"
          bg="#F7FCFF"
          color="#141515"
          bgImage="url('/assets/thumbprint_bg.png')"
        />
        {userData && (
          <Center
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Flex
              direction="column"
              align="center"
              gap={8}
              bg="#F7FCFF"
              p={8}
              borderRadius="15px"
              shadow="md"
              color="#141515"
            >
              <IdentityDisplay
                editableUserData={editableUserData}
                setEditableUserData={setEditableUserData}
                handleInputChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <AiModelDropdown
                editableAIData={editableAIData}
                setEditableAIData={setEditableAIData}
                handleInputChange={(e) => setEditableAIData(e as string[])}
              />
              <HistoryDisplay
                historyData={editableHistoryData}
                clearHistory={() => setEditableHistoryData([])}
              />
            </Flex>
          </Center>
        )}
      </Flex>
    </Flex>
  );
}

interface HistoryDisplayProps {
  historyData: string[];
  clearHistory: () => void;
}

// History Display Component
const HistoryDisplay = ({ historyData, clearHistory }: HistoryDisplayProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box width="300px" p={16} bg="#fff" borderRadius="15px" shadow="md">
      <Flex direction="column">
        <Flex onClick={() => setOpen(!open)} cursor="pointer">
          <Box transform={open ? "rotate(180deg)" : "rotate(-90deg)"}>
            <ChevronDownIcon width="20px" height="20px" color="#141515" />
          </Box>
          <Center mx={8}>
            <HistoryIcon />
          </Center>
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            History
          </Text>
        </Flex>
        <Flex direction="column">
          <Divider width="100%" border="1px solid #ffe2bc" />
          <Spacer py={2} />
          {historyData.length > 0 ? (
            <Flex direction="column">
              {historyData.map((url, index) => (
                <Text key={index} mb={2} fontSize="sm" noOfLines={1}>
                  {url}
                </Text>
              ))}
              <Button mt={4} colorScheme="red" onClick={clearHistory}>
                Clear History
              </Button>
            </Flex>
          ) : (
            <Text>No browsing history available</Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

// AI Model Dropdown with Top 3 Providers
const AiModelDropdown = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleSelectionChange = (newSelectedModels: string[]) => {
    setSelectedModels(newSelectedModels);
  };

  // Show only top 3 providers
  const topProviders = AiModels.slice(0, 3);

  return (
    <Box width="300px" mx="auto" mt={10}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Select AI Models
        </MenuButton>
        <MenuList>
          {topProviders.map((provider) => (
            <Box key={provider.provider} p={2}>
              <Text fontWeight="bold">{provider.provider}</Text>
              <CheckboxGroup
                colorScheme="blue"
                value={selectedModels}
                onChange={(e) => handleSelectionChange(e as string[])}
              >
                <Flex direction="column" mt={2}>
                  {provider.models.map((model) => (
                    <Checkbox key={model} value={model}>
                      {model}
                    </Checkbox>
                  ))}
                </Flex>
              </CheckboxGroup>
            </Box>
          ))}
        </MenuList>
      </Menu>

      <Box mt={4}>
        <Text fontWeight="bold">Selected Models:</Text>
        <Text>
          {selectedModels.length > 0 ? selectedModels.join(", ") : "None"}
        </Text>
      </Box>
    </Box>
  );
};

const ChevronDownIcon = createIcon({
  displayName: "ChevronDownIcon",
  viewBox: "0 0 20 20",
  d: "M10 12.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L10 12.586z",
});

const AiModels = [
  {
    provider: "OpenAI",
    models: ["GPT-4", "GPT-3.5"],
  },
  {
    provider: "Anthropic",
    models: ["Claude 1", "Claude 2"],
  },
  {
    provider: "Google DeepMind",
    models: ["Gemini"],
  },
  // Additional providers...
];

interface IdentityDisplayProps {
  editableUserData: any;
  setEditableUserData: any;
  handleInputChange: (e: any) => void;
}

const IdentityDisplay = ({
  editableUserData,
  setEditableUserData,
  handleInputChange,
}: IdentityDisplayProps) => {
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
    >
      <Flex onClick={() => setOpen(!open)} cursor="pointer">
        <Box transform={open ? "rotate(180deg)" : "rotate(-90deg)"}>
          <ChevronDownIcon width="20px" height="20px" color="#141515" />
        </Box>
        <Center mx={8}>
          <LicenseIcon />
        </Center>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          Identity
        </Text>
      </Flex>
      {open && (
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
          <AiModelDropdown />
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
      )}
    </Box>
  );
};

interface CustomInputProps {
  name: string;
  value: string;
  label: string;
  onChange: (e: any) => void;
  placeholder: string;
}

export const CustomInput = ({
  name,
  value,
  label,
  onChange,
  placeholder,
}: CustomInputProps) => (
  <Flex direction="column">
    <Text fontWeight="bold">{label}</Text>

    <Input
      w="100%"
      bg="#fbeedb"
      color="#141515"
      border="solid"
      borderColor="#ffe2bc"
      borderRadius="md"
      p={4}
      py={8}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      mb={4}
    />
  </Flex>
);
