import type { NextPage } from "next";
import { Box, Button, Grid } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
const Home: NextPage = () => {
  return (
    <Grid gap={2}>
      <NextLink href="/client" passHref>
        <Link>Client</Link>
      </NextLink>
      <NextLink href="/task" passHref>
        <Link>Task</Link>
      </NextLink>
      <NextLink href="/process" passHref>
        <Link>Process</Link>
      </NextLink>
    </Grid>
  );
};

export default Home;
