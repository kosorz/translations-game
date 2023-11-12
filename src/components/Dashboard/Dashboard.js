import React, { useState } from "react";
import { Page } from "../Page/Page";
import { Box, Heading, Select } from "grommet";
import { Header } from "../Header/Header";
import { Helmet } from "react-helmet";
import { Center } from "../Wizard/Wizard.styles";

import * as S from "./Dashboard.styles";

import { polishEnglishData } from "../../data/polish-english";
import { polishGermanData } from "../../data/polish-german";

const Categories = ({ data, hrefBase, from }) => {
  return (
    <S.Categories>
      {Object.values(data).map((category, i) => {
        return (
          <S.Category
          label={Object.values(data)[i].name[from]}
            href={`${hrefBase}/${Object.keys(data)[i]}`}
            icon={<category.Icon />}
          />
        );
      })}
    </S.Categories>
  );
};

const labels = {
  polish: "Polski",
  english: "English",
  german: "German",
};

export const Dashboard = ({ setTheme, theme }) => {
  const [from, setFrom] = useState(labels.polish);
  const [to, setTo] = useState(labels.german);
  const [toOptions, setToOptions] = useState([labels.english, labels.german]);

  const config = (() => {
    if (from === labels.polish && to === labels.german) {
      return { hrefBase: "/polish-german", data: polishGermanData };
    }

    if (to === labels.polish && from === labels.german) {
      return { hrefBase: "/german-polish", data: polishGermanData };
    }

    if (from === labels.polish && to === labels.english) {
      return { hrefBase: "/polish-english", data: polishEnglishData };
    }

    if (to === labels.polish && from === labels.english) {
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
                options={Object.values(labels)}
                value={from}
                onChange={({ option }) => {
                  setFrom(option);

                  const toOptions =
                    option === labels.polish
                      ? [labels.english, labels.german]
                      : [labels.polish];

                  setToOptions(toOptions);

                  if (toOptions.length === 1) return setTo(toOptions[0]);

                  if (option === labels.polish) setTo(labels.german);
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

          {config && (
            <Categories
              from={Object.keys(labels)[Object.values(labels).findIndex(el => el === from)]}
              {...config}
            />
          )}
        </Center>
      </Page>
    </>
  );
};
