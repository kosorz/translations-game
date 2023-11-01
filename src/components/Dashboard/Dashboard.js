import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Page } from "../Page/Page";
import {
  CardBody,
  Button,
  Card,
  CardFooter,
  Heading,
  Paragraph,
  Box,
} from "grommet";
import { Center } from "../Wizard/Wizard.styles";

const Mode = ({ flags, name, href }) => (
  <Button
    href={href}
    hoverIndicator
    round={"small"}
    icon={
      <Card width={"small"} background="light-1">
        <CardBody pad={{ horizontal: "small" }}>
          <Heading textAlign="center" level={2}>
            <span role="img" aria-label={name}>
              {flags}
            </span>
          </Heading>
        </CardBody>
        <CardFooter pad={{ horizontal: "small" }} background="light-2">
          <Paragraph
            style={{
              flex: 1,
            }}
            textAlign="center"
          >
            {name}
          </Paragraph>
        </CardFooter>
      </Card>
    }
  />
);

export const Dashboard = ({ setTheme, theme, condition, setCondition }) => (
  <Page>
    <Sidebar condition={condition} setCondition={setCondition} setTheme={setTheme} theme={theme} />
    <Center>
        <Heading>Explore modes</Heading>
        <Box
          width="big"
          border={{ color: "brand", size: "large" }}
          pad="medium"
          round
          direction="row"
          justify="center"
          wrap
        >
          <Mode
            href={"/german-english"}
            name={"Deutsch / English"}
            flags={"🇩🇪 | 🇬🇧"}
          />
          <Mode
            href={"/english-german"}
            name={"English / Deutsch"}
            flags={"🇬🇧 | 🇩🇪"}
          />
          <Mode
            href={"/german-polish"}
            name={"Deutsch / Polski"}
            flags={"🇩🇪 | 🇵🇱"}
          />
          <Mode
            href={"/polish-german"}
            name={"Polski / Deutsch"}
            flags={"🇵🇱 | 🇩🇪"}
          />
          <Mode
            href={"/polish-english"}
            name={"Polski / English"}
            flags={"🇵🇱 | 🇬🇧"}
          />
          <Mode
            href={"/english-polish"}
            name={"English / Polski"}
            flags={"🇬🇧 | 🇵🇱"}
          />
        </Box>
    </Center>
  </Page>
);
