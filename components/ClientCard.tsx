/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
const ClientCard = ({ name, phoneNumber, imageUrl, mapLink, clientId }) => {
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  return (
    <Flex
      borderRadius="20px"
      bg={boxBg}
      p="20px"
      h="300px"
      w={{ base: "315px", md: "345px" }}
      alignItems="center"
      direction="column"
    >
      <Image
        src="https://i.ibb.co/xmP2pS6/Profile.png"
        maxW="100%"
        borderRadius="20px"
      />
      <Flex flexDirection="column" mb="30px">
        <Image
          src={
            imageUrl ? imageUrl : "https://i.ibb.co/B3gYTYs/Profile-Image.png"
          }
          border="5px solid red"
          mx="auto"
          borderColor={boxBg}
          width="68px"
          height="68px"
          mt="-38px"
          borderRadius="50%"
        />
        <Text
          fontWeight="600"
          color={mainText}
          textAlign="center"
          fontSize="xl"
        >
          {name}
        </Text>
        <Link href={`tel:${phoneNumber}`}>
          <Text
            color={secondaryText}
            textAlign="center"
            fontSize="sm"
            fontWeight="500"
          >
            {phoneNumber}
          </Text>
        </Link>
      </Flex>
      <Flex justify="space-between" w="100%" px="36px">
        <Flex flexDirection="column">
          <Link href={`${mapLink}`}>
            <Text color={secondaryText} fontWeight="500">
              Location
            </Text>
          </Link>
        </Flex>
        <Flex flexDirection="column">
          <Link href={{ pathname: "/projects", query: { clientId } }}>
            <a>
              <Text color={secondaryText} fontWeight="500">
                Projects
              </Text>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ClientCard;
