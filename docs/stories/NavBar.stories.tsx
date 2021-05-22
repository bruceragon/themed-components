import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  Grid,
  Row,
  Container,
  Flex,
  FlexItem,
  Button,
  PopoverButton,
  Link,
  Text,
  Icon,
  Input,
  IconInput,
  List,
  ListItem as Li
} from "@themed-components/core";
import { ReactLogo } from "@styled-icons/boxicons-logos/ReactLogo";
import { Menu } from "@styled-icons/boxicons-regular/Menu";
import { SearchOutline } from "@styled-icons/evaicons-outline/SearchOutline";

export default {
  title: "Examples/NavBar",
  // component: Label,
} as Meta;

export const Nav = () => (
  <List
    orientation="horizontal"
    justifyContent="space-between"
    alignItems="center"
    bg="dark"
    css={{
      height: [35],
      [Li]: {
        height: "100%",
        [Link]: {
          lineHeight: ["35px"],
          height: "100%",
          py: 0
        }
      }
    }}
  >
    <Li justifySelf="flex-start" display="flex" alignItems="center">
      <Icon color="primary" iconType={ReactLogo} width={24} height="100%" px={2} />
    </Li>
    <Li flexBasis="50%" justifySelf="center">
      <IconInput
        iconWidth={[18, 22]}
        iconProps={{ color: "light" }}
        iconPosition="right"
        icon={SearchOutline}
        color="light"
        variant="primary"
        width="100%"
      />
    </Li>
    <Li justifySelf="flex-end" display={["none", "initial"]}>
      <Link variant="primary-dark">
        docs
      </Link>
      <Link variant="primary-dark">
        sign in
      </Link>
    </Li>
    <Li justifySelf="flex-end" display={["initial", "none"]}>
      <PopoverButton
        variant="primary-dark"
        popTo="bottom-right"
        p={0}
        px={2}
        height="100%"
        content={(
          <List variant="popUp" minWidth="150px" color="primary" style={{ textTransform: "uppercase" }}>
            <Li>
              <Link>
                docs
              </Link>
            </Li>
            <Li>
              <Link>
                sign in
              </Link>
            </Li>
          </List>
        )}
      >
        <Icon iconType={Menu} size={24} />
      </PopoverButton>
    </Li>
  </List>
)
