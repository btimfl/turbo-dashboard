import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { fetchGraphData } from "../../apis/post";
import { Chart, Duration, UnifillAPI } from "../../enums";
import { resolveDuration, resolveWorkflow } from "../../utils";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface Props {
  tabIndex: number;
  duration: Duration;
}

interface CartesianPoint {
  date: string;
  total: number;
  successful: number;
}

export default function GraphTotalAndSuccessfullHits({ tabIndex, duration }: Props) {
  const auth = useContext(AuthContext);
  const { from, to } = resolveDuration(duration);

  const { isLoading, isError, data: rawData } = useQuery(['graphData', tabIndex, duration], () => fetchGraphData(auth.merchant!, Chart.PIE, resolveWorkflow(tabIndex), from, to), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  if (isLoading) return (
    <Center justifyContent={`center`} h={`100%`} minH={`400px`}>
      <Spinner/>
    </Center>
  )

  if (isError) return (
    <Center>
      An error occurred, please reload or try again later!
    </Center>
  )

  const dataMap = new Map();
  rawData[UnifillAPI.SUCCESSFUL]?.forEach(point => {
    const date = new Date(point.created_at).toLocaleDateString('en-US');

    if (dataMap.has(date)) dataMap.set(date, {
      total: dataMap.get(date).total + 1,
      successful: dataMap.get(date).successful + 1,
    });

    if (!dataMap.has(date)) dataMap.set(date, {
      total: 1,
      successful: 1,
    });
  });

  rawData[UnifillAPI.UNSUCCESSFUL]?.forEach(point => {
    const date = new Date(point.created_at).toLocaleDateString('en-US');

    if (dataMap.has(date)) dataMap.set(date, {
      total: dataMap.get(date).total + 1,
      successful: dataMap.get(date).successful,
    });

    if (!dataMap.has(date)) dataMap.set(date, {
      total: 1,
      successful: 0,
    });
  });

  const dataUS: CartesianPoint[] = [];
  dataMap.forEach((value, key) => {
    dataUS.push({
      date: key,
      total: value.total,
      successful: value.successful,
    })
  });

  dataUS.sort((a: CartesianPoint, b: CartesianPoint) => {
    const timeA = new Date(a.date).getTime(), timeB = new Date(b.date).getTime();
    return timeA < timeB ? -1 : 1;
  })

  const dataIN = dataUS.map((point: CartesianPoint) => {
    return {
      ...point,
      date: new Date(point.date).toLocaleDateString('en-IN'),
    }
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={dataIN}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{ value: "Date", position: "insideBottom", offset: "-5" }}
        />
        {/* label={{ value: 'Hits', angle: -90, position: 'left', offset: '-20' }} */}
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" align="center" />
        <Line
          type="monotone"
          name="Total API Hits"
          dataKey="total"
          stroke="#4185F4"
        />
        <Line
          type="monotone"
          name="Successful API Hits"
          dataKey="successful"
          stroke="red"
        />
      </LineChart>
    </ResponsiveContainer>

  );
}
