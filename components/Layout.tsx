import { Box } from "@chakra-ui/react";
import React from "react";
import { ReactNode, FC } from "react";

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Box paddingX={4} bg="blackAlpha.100" minH="5vh" width={"full"}>
        Header
      </Box>
      <Box paddingX={4} bg="gray.50" minH="90vh">
        <Box padding={4} height={"full"} w={"full"}>
          {children}
        </Box>
      </Box>
      <Box paddingX={4} bg="tomato" minH="5vh" width={"full"}>
        Footer
      </Box>
    </Box>
  );
};

export default Layout;
