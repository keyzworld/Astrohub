import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import React from "react";
type EventFunction = (event: GestureResponderEvent) => void;
interface PrimaryButtonProps extends React.PropsWithChildren {
  onPress: EventFunction;
}

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-[50px] rounded-lg bg-black items-center justify-center"
    >
      <Text className="text-white font-semibold text-lg">{children}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
