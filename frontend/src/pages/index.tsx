import { HistoryEditor } from "@/components/cards/HistoryEditor";
import PersonaCookieForm from "@/components/cards/PersonaMaker";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { UserProfileEditor } from "@/components/cards/UserProfileEditor";
import { Header } from "@/components/Header";
import { Text, Image, Box, Flex, Center, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession() as any;
  const [userData, setUserData] = useState(null);
  const [aIData, setAIData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState<string[]>([]);
  const [editableAIData, setEditableAIData] = useState<string[]>([]);
  const [editableHistoryData, setEditableHistoryData] = useState<string[]>([]);
  const [editableUserData, setEditableUserData] = useState({
    name: "",
    email: "",
    picture: "",
    hd: "",
    birthday: "",
  });

  const toast = useToast();

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
          birthday: "1990-01-01",
        });
      };
      fetchData();
    }
  }, [session]);

  // Simulating browser history for demo purposes
  useEffect(() => {
    const history = [
      "hackernews.com",
      "stackoverflow.com",
      "cerebralbeach.com",
      "github.com",
    ];
    setHistoryData(history);
    setEditableHistoryData(history);
  }, []);

  // └─[$] <git:(main*)> curl -X POST "http://localhost:8000/generate_persona_cookie" -H "Content-Type: application/json" -d '{"user_data": {"name": "John Doe", "date_of_birth": "1990-01-01"}, "urls": ["https://www.hackernews.com", "https://www.stackoverflow.com"]}'
  async function generatePersonaCookie({
    user_data,
    urls,
  }: {
    user_data: { name: string; date_of_birth: string };
    urls: string[];
  }) {
    try {
      if (loading) return;
      setLoading(true);
      toast({
        title: "Generating Persona Cookie",
        description: "Please wait...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      const response = await fetch("/api/ai/generatePersonaCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data, urls }),
      });

      const data = await response.json();
      if (response.ok) {
        const parsedData = JSON.parse(data.persona_cookie);
        setAIData(parsedData);
        toast({
          title: "Persona Cookie Generated",
          description:
            "Your persona cookie has been generated and copied to your clipboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        console.error("Error:", data.error);
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Flex
      direction="column"
      align="center"
      width="100vw"
      overflow="hidden"
      zIndex="0"
      position="relative"
    >
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
              <ProfileCard
                editableUserData={editableUserData}
                onClick={() =>
                  generatePersonaCookie({
                    user_data: {
                      name: editableUserData.name,
                      date_of_birth: editableUserData.birthday,
                    },
                    urls: editableHistoryData,
                  })
                }
              />
              <UserProfileEditor
                editableUserData={editableUserData}
                setEditableUserData={setEditableUserData}
                handleInputChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <HistoryEditor
                historyData={editableHistoryData}
                clearHistory={() => setEditableHistoryData([])}
                editableHistoryData={editableHistoryData}
                setEditableHistoryData={setEditableHistoryData}
              />

              {/* finish this here */}
              <PersonaCookieForm
                userData={userData}
                aIData={aIData}
                setAIData={setAIData}
              />
            </Flex>
          </Center>
        )}
      </Flex>
    </Flex>
  );
}
