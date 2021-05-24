import React from "react";
import { Meta } from "@storybook/react";
import {
  Heading,
  Paragraph as P,
  Flex,
  FlexItem,
} from "@themed-components/core"
import { Nav } from "./NavBar.stories";

export default {
  title: "Examples/Page 1",
  // component: Label,
} as Meta;

export const Page = () => (
  <>
    <Nav />
    <Flex
      justifyContent="space-between"
      width="100%"
      bg="light"
      height="250px"
      p={["5px", "10px"]}
      flexDirection={["column", "row"]}
      css={{
        ["& >" + FlexItem]: {
          m: ["5px", "10px"],
          px: [3, 4],
          overflow: "hidden"
        }
      }}
    >
      <FlexItem flexGrow={1} bg="accent">
        <Heading
          color="dark-accent"
          as="h3"
        >
          Lorem ipsum
          </Heading>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </P>
      </FlexItem>
      <FlexItem flexGrow={1} bg="light-accent">
        <Heading
          color="dark"
          as="h3"
        >
          Lorem ipsum
          </Heading>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </P>

      </FlexItem>
      <FlexItem flexGrow={1} bg="dark-accent">
        <Heading
          color="accent"
          as="h3"
        >
          Lorem ipsum
          </Heading>
          <P color="light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </P>
      </FlexItem>
    </Flex>
    <Flex
      width="100%"
      bg="light"
      height="300px"
      p={["5px", "10px"]}
      // flexDirection={["column", "row"]}
      css={{
        ["& >" + Flex]: {
          m: ["5px", "10px"]
        }
      }}
    >
      <Flex flexGrow={1} bg="white">
        <Heading
          color="dark"
          as="h3"
        >
          Lorem ipsum
          </Heading>
      </Flex>
      <Flex flexGrow={1} bg="accent">
        <Heading
          color="dark"
          as="h3"
        >
          Lorem ipsum
          </Heading>
      </Flex>
    </Flex>
    <Flex
      width="100%"
      bg="dark"
      height="300px"
    >
    </Flex>
  </>
);
