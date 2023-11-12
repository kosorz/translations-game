import React, { useState } from "react";
import { Page } from "../Page/Page";
import { Box, Heading, Select } from "grommet";
import { Header } from "../Header/Header";
import { Helmet } from "react-helmet";
import { Center } from "../Wizard/Wizard.styles";

import * as S from "./Dashboard.styles";

import { polishEnglishData } from "../../data/polish-english";
import { polishGermanData } from "../../data/polish-german";

const Categories = ({ data, hrefBase }) => (
  <S.Categories direction="row" wrap margin={{ vertical: "medium" }}>
    {Object.values(data).map((category, i) => (
      <S.Category
        href={`${hrefBase}/${Object.keys(data)[i]}`}
        icon={<category.Icon />}
        hoverIndicator
      />
    ))}
  </S.Categories>
);

export const Dashboard = ({ setTheme, theme }) => {
  const [from, setFrom] = useState("Polski");
  const [to, setTo] = useState("Deutsch");
  const [toOptions, setToOptions] = useState(["English", "Deutsch"]);

  const config = (() => {
    if (from === "Polski" && to === "Deutsch") {
      return { hrefBase: "/polish-german", data: polishGermanData };
    }

    if (to === "Polski" && from === "Deutsch") {
      return { hrefBase: "/german-polish", data: polishGermanData };
    }

    if (from === "Polski" && to === "English") {
      return { hrefBase: "/polish-english", data: polishEnglishData };
    }

    if (to === "Polski" && from === "English") {
      return { hrefBase: "/german-polish", data: polishEnglishData };
    }

    return null;
  })();

  return (
    <>
      <Helmet>
        <title>Wordie - Dashboard</title>
      </Helmet>

      <Header setTheme={setTheme} theme={theme} />

      <Page direction="column" background="red">
        <Center>
          <Heading>Explore modes</Heading>

          <Box align="center" direction="row" gap="8px">
            <Box>
              <Box>From</Box>
              <Select
                options={["Polski", "English", "Deutsch"]}
                value={from}
                onChange={({ option }) => {
                  setFrom(option);

                  const toOptions =
                    option === "Polski" ? ["English", "Deutsch"] : ["Polski"];

                  setToOptions(toOptions);

                  if (toOptions.length === 1) setTo(toOptions[0]);
                }}
              />
            </Box>
            <Box>
              <Box>To</Box>
              <Select
                disabled={from === "" || toOptions.length === 1}
                options={toOptions}
                value={to}
                onChange={({ option }) => setTo(option)}
              />
            </Box>
          </Box>

          {config && <Categories {...config} />}
        </Center>
      </Page>
    </>
  );
};
