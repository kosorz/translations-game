import React from "react";
import { Page } from "../Page/Page";
import { CardBody, Card, CardFooter, Heading, Paragraph, Box } from "grommet";
import { Center } from "../Wizard/Wizard.styles";
import { Header } from "../Header/Header";
import * as S from "./Dashboard.styles";
import { Helmet } from "react-helmet";

const Mode = ({ flags, name, href, theme }) => (
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
        <CardFooter
          pad={{ horizontal: "small" }}
          background={theme === "dark" ? "dark-2" : "light-2"}
        >
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

export const Dashboard = ({ setTheme, theme }) => (
  <>
    <Helmet>
      <title>Wordie - Dashboard</title>
    </Helmet>
    <Header setTheme={setTheme} theme={theme} />
    <Page>
      <Center>
        <Heading>Explore modes</Heading>
        <Box
          width="big"
          pad="medium"
          gap="8px"
          direction="row"
          justify="center"
          wrap
        >
          <Mode
            theme={theme}
            href={"/german-polish"}
            name={"Deutsch / Polski"}
            flags={"🇩🇪 | 🇵🇱"}
          />
          <Mode
            theme={theme}
            href={"/polish-german"}
            name={"Polski / Deutsch"}
            flags={"🇵🇱 | 🇩🇪"}
          />
          <Mode
            theme={theme}
            href={"/polish-english"}
            name={"Polski / English"}
            flags={"🇵🇱 | 🇬🇧"}
          />
          <Mode
            theme={theme}
            href={"/english-polish"}
            name={"English / Polski"}
            flags={"🇬🇧 | 🇵🇱"}
          />
        </Box>
      </Center>
    </Page>
  </>
);
