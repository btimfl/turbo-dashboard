import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { fetchGraphData } from "../../apis/post";
import { Chart, ChartWorkflow, Duration, UnifillAPI } from "../../enums";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface Props {
  tabIndex: number;
  duration: Duration;
}

function resolveWorkflow(tabIndex: number): ChartWorkflow | null {
  // To make the API work for now
  return null;

  if (tabIndex === 0) return null;
  else if (tabIndex === 1) return ChartWorkflow.WITH_OTP;
  else return ChartWorkflow.WITHOUT_OTP;
}

function resolveDuration(duration: Duration): { from: string, to: string } {
  const toDate = new Date();
  const fromDate = new Date();

  switch (duration) {
    case Duration.LAST_WEEK:
      fromDate.setDate(fromDate.getDate() - 7);
      break;
    case Duration.LAST_MONTH:
      fromDate.setDate(fromDate.getDate() - 30);
      break;
    case Duration.LAST_90_DAYS:
      fromDate.setDate(fromDate.getDate() - 90);
      break;
  }

  return { from: fromDate.toLocaleDateString('en-CA'), to: toDate.toLocaleDateString('en-CA') };
}

export default function PieSuccessfulAndUnsuccessfulHits({ tabIndex, duration }: Props) {
  const auth = useContext(AuthContext);
  const { from, to } = resolveDuration(duration);

  const { isLoading, isError, data: rawData } = useQuery(['graphData', tabIndex, duration], () => fetchGraphData(auth.merchant!, Chart.PIE, resolveWorkflow(tabIndex), from, to), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  if (isLoading) return (
    <Center h="calc(100vh - 40px)">
      <Spinner />
    </Center>
  )

  if (isError) return (
    <Center h="calc(100vh - 40px)">
      An error occurred, please reload or try again later!
    </Center>
  )

  const data = [
    { name: "Hits with address match", value: rawData[UnifillAPI.SUCCESSFUL].length || 0 },
    { name: "Hits with no address match", value: rawData[UnifillAPI.UNSUCCESSFUL].length || 0 },
  ];

  console.log(data);

  const COLORS = ["red", "#4185F4"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart height={400}>
        <Legend verticalAlign="top" align="center" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
