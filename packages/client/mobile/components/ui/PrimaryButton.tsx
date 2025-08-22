import { Pressable, Text, GestureResponderEvent } from "react-native";
import React from "react";
type EventFunction = (event: GestureResponderEvent) => void;
interface PrimaryButtonProps extends React.PropsWithChildren {
  onPress: EventFunction;
}

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#ccc" }}
      style={{ elevation: 0.8 }}
      className="w-full h-[50px] rounded-full bg-black items-center justify-center"
    >
      <Text className="text-white font-semibold text-lg">{children}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
