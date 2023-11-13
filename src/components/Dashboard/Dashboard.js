import React, { useEffect, useState } from "react";
import { Page } from "../Page/Page";
import { Box, Heading, Select } from "grommet";
import { Header } from "../Header/Header";
import { Helmet } from "react-helmet";
import { Center } from "../Wizard/Wizard.styles";
import { useTranslation } from "react-i18next";

import * as S from "./Dashboard.styles";

import { polishEnglishData } from "../../data/polish-english";
import { polishGermanData } from "../../data/polish-german";
import { useParams } from "react-router-dom";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

const Categories = ({ data, hrefBase, from }) => {
  const { lang } = useParams();

  return (
    <S.Categories>
      {Object.values(data).map((category, i) => {
        return (
          <S.Category
            label={Object.values(data)[i].name[from]}
            href={`${lang}${hrefBase}/${Object.keys(data)[i]}`}
            icon={<category.Icon />}
          />
        );
      })}
    </S.Categories>
  );
};

export const Dashboard = ({ setTheme, theme }) => {
  const { t, i18n } = useTranslation();

  const labels = {
    polish: t('langs.polish'),
    english: t('langs.english'),
    german: t('langs.german'),
  };

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [toOptions, setToOptions] = useState([]);

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

  useEffect(() => {
    setFrom(labels.polish)
    setTo(labels.german)
    setToOptions([labels.english, labels.german])
  }, [i18n.language])

  return (
    <>
      <Helmet>
        <title>Wordie - Dashboard</title>
      </Helmet>

      <Header setTheme={setTheme} theme={theme}>
        <LanguageSwitch />
      </Header>

      <Page direction="column" background="red">
        <Center>
          <Heading textAlign="center" margin={{ bottom: "small" }}>{t("dashboard.title")}</Heading>
          <Heading
            textAlign="center"
            margin={{
              top: "small",
              bottom: "large",
            }}
            level={4}
          >
            {t("dashboard.subtitle")}
          </Heading>

          <Box align="center" direction="row" gap="8px">
            <Box>
              <Box>{t("dashboard.from")}</Box>
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
              <Box>{t("dashboard.to")}</Box>
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
              from={
                Object.keys(labels)[
                  Object.values(labels).findIndex((el) => el === from)
                ]
              }
              {...config}
            />
          )}
        </Center>
      </Page>
    </>
  );
};
