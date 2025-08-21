import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import OrderCard from "@/components/ui/OrderCard";
import OrdersData from "@/constants/Orders";

const Orders = () => {
  const [currentCategory, setCurrentCategory] = React.useState<
    "processing" | "delivered"
  >("processing");
  const handleCategorySwitch = (category: "processing" | "delivered") => {
    setCurrentCategory(category);
  };
  return (
    <ScrollView
      contentContainerStyle={{ gap: 15 }}
      showsVerticalScrollIndicator={false}
      className="flex-1"
    >
      <View className="">
        <Text className="font-semibold text-3xl">Orders</Text>
      </View>
      <View
        style={{
          backgroundColor: "#c0c0c0",
          borderRadius: 12,
          padding: 3,
          flexDirection: "row",
          gap: 6,
        }}
        className=" w-full h-[50px]"
      >
        <TouchableOpacity
          className="w-[49%]  items-center justify-center"
          onPress={handleCategorySwitch.bind(this, "processing")}
          style={{
            backgroundColor:
              currentCategory == "processing" ? "#000000" : "#c0c0c0",
            opacity: currentCategory !== "processing" ? 0.6 : 1,
            borderRadius: 10,
          }}
        >
          <Text className="font-medium text-lg text-white">Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              currentCategory == "delivered" ? "#000000" : "#c0c0c0",
            opacity: currentCategory !== "delivered" ? 0.6 : 1,
            borderRadius: 10,
          }}
          onPress={handleCategorySwitch.bind(this, "delivered")}
          className="w-[49%] items-center justify-center "
        >
          <Text className="font-medium text-lg text-white">Delivered</Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 10, marginBottom: 20 }}>
        {OrdersData.filter((o, i) => o.status == currentCategory).map(
          (o, i) => (
            <OrderCard key={o.id} {...o} />
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Orders;
