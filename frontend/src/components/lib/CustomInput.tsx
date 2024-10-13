import { Flex, Input, Text } from "@chakra-ui/react";

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
      bg="#fff"
      color="#141515"
      border="solid"
      borderWidth="1px"
      borderColor="#141515"
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
