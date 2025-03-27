import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native";

export default function Index() {
  return (
      <ThemedView className="flex-1 justify-center items-center">
        <Text className="text-4xl dark:color-white color-black font-bold">
          Profile
        </Text>
      </ThemedView>
  );
}
