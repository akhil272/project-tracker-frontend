import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";

interface TaskCardProps {
  name: string;
  projectName: string;
  clientName: string;
  totalTime: number;
  handleStart: () => void;
  handleEnd: () => void;
  running: boolean;
}

const TaskCard = ({
  name,
  projectName,
  clientName,
  totalTime,
  handleStart,
  handleEnd,
  running,
}: TaskCardProps) => {
  const [start, setStart] = useState(running);
  const [time, setTime] = useState(totalTime);
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!start) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "440px" }}
        height={{ sm: "476px", md: "15rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {projectName}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #{clientName}
            </Badge>
            <Timer time={time} />
          </Stack>
          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={start ? "" : "blue.400"}
              color={start ? "" : "white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              disabled={start}
              onClick={() => {
                setStart(true);
                handleStart();
              }}
            >
              Start
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              disabled={!start}
              onClick={() => {
                setStart(false);
                handleEnd();
              }}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              End
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default TaskCard;
