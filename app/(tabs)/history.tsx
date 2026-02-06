import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const orders = [
  {
    id: 1,
    orderNumber: "ORD-001",
    items: ["Nasi Goreng Spesial", "Es Teh Manis"],
    total: 30000,
    status: "selesai",
    time: "10:30",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    items: ["Soto Ayam", "Rendang"],
    total: 55000,
    status: "proses",
    time: "11:15",
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    items: ["Gado-Gado", "Es Jeruk"],
    total: 25000,
    status: "menunggu",
    time: "11:45",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "selesai":
      return "bg-green-100 text-green-700";
    case "proses":
      return "bg-orange-100 text-orange-700";
    case "menunggu":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "selesai":
      return "checkmark-circle";
    case "proses":
      return "time";
    case "menunggu":
      return "timer";
    default:
      return "help-circle";
  }
};

export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {" "}
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">Pesanan</Text>
          <Text className="text-gray-600 mt-1">
            {orders.length} pesanan hari ini
          </Text>
        </View>

        {/* Orders List */}
        <ScrollView className="flex-1 px-6 py-4">
          {orders.map((order) => (
            <View
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-md mb-4"
            >
              {/* Order Header */}
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-lg font-bold text-gray-800">
                    {order.orderNumber}
                  </Text>
                  <Text className="text-gray-500 text-sm">{order.time}</Text>
                </View>
                <View
                  className={`flex-row items-center px-3 py-1 rounded-full ${getStatusColor(order.status).split(" ")[0]}`}
                >
                  <Ionicons
                    name={getStatusIcon(order.status) as any}
                    size={16}
                    color={
                      order.status === "selesai"
                        ? "#15803d"
                        : order.status === "proses"
                          ? "#c2410c"
                          : "#a16207"
                    }
                  />
                  <Text
                    className={`ml-1 font-semibold text-sm capitalize ${getStatusColor(order.status).split(" ")[1]}`}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              {/* Order Items */}
              <View className="border-t border-gray-200 pt-3 mb-3">
                {order.items.map((item, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                    <Text className="text-gray-700">{item}</Text>
                  </View>
                ))}
              </View>

              {/* Order Total */}
              <View className="flex-row justify-between items-center border-t border-gray-200 pt-3">
                <Text className="text-gray-600 font-semibold">Total:</Text>
                <Text className="text-xl font-bold text-orange-600">
                  Rp {order.total.toLocaleString("id-ID")}
                </Text>
              </View>

              {/* Action Buttons */}
              {order.status !== "selesai" && (
                <View className="flex-row gap-2 mt-3">
                  <Pressable className="flex-1 bg-orange-500 rounded-xl py-3 items-center active:bg-orange-600">
                    <Text className="text-white font-semibold">
                      {order.status === "menunggu" ? "Proses" : "Selesaikan"}
                    </Text>
                  </Pressable>
                  <Pressable className="flex-1 bg-gray-200 rounded-xl py-3 items-center active:bg-gray-300">
                    <Text className="text-gray-700 font-semibold">Detail</Text>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
