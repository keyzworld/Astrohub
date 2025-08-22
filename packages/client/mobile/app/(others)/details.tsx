import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import Games from "@/constants/Games";
import { Image } from "expo-image";
import BackButton from "@/components/ui/BackButton";
import LikeButton from "@/components/ui/LikeButton";
import { AntDesign } from "@expo/vector-icons";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "@/stores/useCartStore";

interface DetailsRouteProps extends RouteProp<Record<string, any>> {
  params: { id: string };
}
const Details = () => {
  const { params } = useRoute<DetailsRouteProps>();
  const game = Games.find((g) => g.id == params!.id);
  const { cart, addToCart } = useCartStore();
  function addGameToCart() {
    addToCart(game!);
  }
  if (!game) return;
  return (
    <SafeAreaView className="flex-1 p-4 gap-4 relative">
      <View style={{ flex: 0.58 }}>
        <View style={{ flex: 1, position: "relative" }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
            }}
            contentFit={"cover"}
            source={{ uri: game?.image }}
          />
          <View style={{ position: "absolute", top: 10, left: 10 }}>
            <BackButton />
          </View>
          <View style={{ position: "absolute", top: 0, right: 0 }}>
            <LikeButton
              game={game}
              liked={game.isLiked!}
              styles={{ backgroundColor: "#fff" }}
              color="black"
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 0.4, gap: 10 }}>
        <View>
          <Text className="font-semibold text-3xl">{game.name}</Text>
          <Text style={{ color: "#a0a0a0" }} className="font-medium text-md">
            {game.category.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text className="font-semibold text-sm">5.0</Text>
            <AntDesign name="star" size={18} color="#FFDB58" />
          </View>
        </View>
        <View>
          <Text
            style={{ color: "#a0a0a0", fontSize: 15 }}
            className="font-semibold text-lg"
            numberOfLines={6}
          >
            {game.description}
          </Text>
        </View>
        <View>
          <PrimaryButton onPress={addGameToCart}>
            🛒 Add to cart | ₦{game.price.toLocaleString("en-us")}
          </PrimaryButton>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            position: "absolute",
            right: -12,
          }}
        >
          <View
            style={{
              position: "relative",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                left: -5,
                width: 15,
                height: 15,
                borderRadius: 7.5,
                top: -15,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                elevation: 0.8,
              }}
            >
              <Text style={{ color: "#000" }} className="font-semibold text-sm">
                {cart.items.length > 9 ? "9+" : cart.items.length}
              </Text>
            </View>
            <Feather name="shopping-cart" size={22} color={"#fff"} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Details;
