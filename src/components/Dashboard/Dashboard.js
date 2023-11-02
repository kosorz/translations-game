import React from "react";
import { Page } from "../Page/Page";
import {
  CardBody,
  Card,
  CardFooter,
  Heading,
  Paragraph,
  Box,
} from "grommet";
import { Center } from "../Wizard/Wizard.styles";
import { Header } from "../Header/Header";
import * as S from './Dashboard.styles'

const Mode = ({ flags, name, href }) => (
  <S.Tile
    href={href}
    hoverIndicator
    icon={
      <Card width={"small"}>
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
  <>
    <Header
      setCondition={setCondition}
      setTheme={setTheme}
      theme={theme}
      condition={condition}
    />
    <Page>
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
  </>
);
