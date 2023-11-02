import React from "react";
import { Box } from "grommet";
import { Edit, View } from "grommet-icons";
import { Switch } from "../Switch/Switch";

export const ConditionSwitch = ({ setCondition, condition }) => {
  const saveCondition = (condition) => {
    localStorage.setItem("condition", condition);
  };

  return (
    <Box>
      <Switch
        config={[
          {
            icon: Edit,
            active: condition === "write",
            onClick: () => {
              setCondition("write");
              saveCondition("write");
            },
          },
          {
            icon: View,
            active: condition === "view",
            onClick: () => {
              setCondition("view");
              saveCondition("view");
            },
          },
        ]}
      />
    </Box>
  );
};
