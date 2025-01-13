import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AppContext } from "../context/AppContext";
import SleepEntry from "../types/sleepEntry";
import ChartData from "../types/chartData";
import { LineChart } from "react-native-chart-kit";

export default function ChartArea() {
    const { user, sleepEntries } = useContext(AppContext);

    const getLastSevenEntries = (entries: SleepEntry[]): SleepEntry[] => {
        if (!entries || entries.length === 0) return [];

        const now = new Date();
        const dateLimit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const recentEntries = entries.filter((entry) => entry.dateStart >= dateLimit && entry.dateStart <= now);

        return recentEntries.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
    };

    function extractFirstName(email: string | null | undefined): string {
        if (email == null || email == undefined || !email.includes("@")) return "";
        const localPart = email.split("@")[0];
        const firstName = localPart.split(".")[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    }

    function getHours(item: SleepEntry): number {
        const diff = item.dateEnd.getTime() - item.dateStart.getTime();
        return Math.floor(diff / 1000 / 60 / 60);
    }

    function mapEntriesToData(entries: SleepEntry[]): ChartData[] {
        return entries.map((entry) => {
            return {
                date: entry.dateStart,
                hours: getHours(entry),
            };
        });
    }

    const chartEntries = mapEntriesToData(getLastSevenEntries(sleepEntries));

    const chartData = {
        labels: chartEntries.map((entry) => entry.date.toDateString().split(" ")[0]),
        datasets: [
            {
                data: chartEntries.map((entry) => entry.hours),
            },
        ],
    };

    const noData = sleepEntries && sleepEntries.length === 0;

    return (
        <View style={styles.container_inner}>
          <Text style={styles.welcomeText}>
            Welcome back,{" "}
            <Text style={styles.userName}>
                {extractFirstName(user?.email)}
            </Text>
          </Text>
          <View style={styles.card}>
            {noData ? (
                <Text style={styles.cardText}>No data to display</Text>
            ) : (
                <LineChart 
                    data={chartData}
                    width={Dimensions.get("window").width * 0.8}
                    height={220}
                    yAxisSuffix="h"
                    chartConfig={{
                        backgroundColor: "#FFFFFF",
                        decimalPlaces: 1,
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientTo: "#FFFFFF",
                        color: (opacity = 1) => `rgba(208, 166, 225, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#502274",
                        }
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            )}
          </View>
        </View>
    );
}

// Convert height to rem (1rem = 16px)
const remToPixels = (rem: number) => rem * 16;

// Screen Dimensions
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container_inner: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#502274", // Matches purple color
        marginTop: 80,
    },
    userName: {
        color: "#502274",
        fontWeight: "900",
    },
    card: {
        backgroundColor: "#D0A6E1",
        width: width * 0.9,
        height: remToPixels(15.625), // 250px in rems
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#FFFFFF",
    },
    chart: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
});