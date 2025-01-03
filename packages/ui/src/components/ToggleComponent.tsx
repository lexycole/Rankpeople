import React, { useState } from "react";
import { Switch } from "react-native";
import tw from "../utils/tailwind";
import { useTheme } from 'next-themes'

interface ToggleComponentProps {
  defaultValue?: boolean;
  onValueChange: (value: boolean) => void;
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({
  defaultValue,
  onValueChange,
}) => {
  const [switchOn, setSwitchOn] = useState(defaultValue ?? false);
  const { theme, setTheme } = useTheme(); 

  return (
      <Switch
        style={tw`inline`}
        value={switchOn}
        onValueChange={(value) => { 
          setTheme(theme === 'light' ? 'dark' : 'light');
          setSwitchOn(value);
          onValueChange(value);
        }}
      />
  );
};

export default ToggleComponent;