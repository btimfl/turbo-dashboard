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
import { resolveDuration, resolveWorkflow } from "../../utils";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface Props {
  tabIndex: number;
  duration: Duration;
  fromDate: string;
  toDate: string;
}

export default function PieSuccessfulAndUnsuccessfulHits({ tabIndex, duration, fromDate, toDate }: Props) {
  const auth = useContext(AuthContext);
  const { from, to } = resolveDuration(duration, fromDate, toDate);

  const { isLoading, isError, data: rawData } = useQuery(['graphData', tabIndex, duration, fromDate, toDate], () => fetchGraphData(auth.merchant!, Chart.PIE, resolveWorkflow(tabIndex), from, to), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: duration !== Duration.CUSTOM || (new Date(from).getTime() <= new Date(to).getTime())
  })

  if (isLoading) return (
    <Center justifyContent={`center`} h={`100%`} minH={`400px`} w="100%">
      <Spinner />
    </Center>
  )

  if (isError) return (
    <Center justifyContent={`center`} h={`100%`} minH={`400px`} w="100%">
      An error occurred, please reload or try again later!
    </Center>
  )

  const data = [
    { name: "Hits with address match", value: rawData[UnifillAPI.SUCCESSFUL].length || 0 },
    { name: "Hits with no address match", value: rawData[UnifillAPI.UNSUCCESSFUL].length || 0 },
  ];

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
