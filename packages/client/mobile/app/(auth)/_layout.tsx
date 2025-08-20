import { Slot, Link } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function AuthLayout() {
  const [current, setCurrent] = React.useState("login");
  function handleNavigate(path: string) {
    setCurrent(path);
  }
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-1">
        <View className="flex-[0.05] p-2 flex-row">
          <Link href={"/(auth)/signin"} asChild>
            <TouchableOpacity
              onPress={() => handleNavigate("login")}
              className={`flex-[0.5] items-center justify-center ${current == "login" ? "border-b-[3px]" : ""} border-black`}
            >
              <Text className="font-medium text-lg">Sign in</Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/(auth)/signup"} asChild>
            <TouchableOpacity
              onPress={() => handleNavigate("signup")}
              className={`flex-[0.5] items-center justify-center ${current == "signup" ? "border-b-[3px]" : ""} border-black`}
            >
              <Text className="font-medium text-lg">Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex-[0.9]">
          <Slot />
        </View>
      </View>
    </SafeAreaView>
  );
}
