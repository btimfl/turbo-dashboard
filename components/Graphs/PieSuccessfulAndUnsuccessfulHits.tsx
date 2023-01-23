import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { fetchGraphData } from "../../apis/get";
import { Chart, Duration, UnifillAPI } from "../../enums";
import { resolveDuration } from "../../utils";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface Props {
  duration: Duration;
  fromDate: string;
  toDate: string;
}

interface PieField {
  name: string;
  value: number;
}

export default function PieSuccessfulAndUnsuccessfulHits({ duration, fromDate, toDate }: Props) {
  const auth = useContext(AuthContext);
  const [from, setFrom] = useState<string>(resolveDuration(duration, fromDate, toDate).from);
  const [to, setTo] = useState<string>(resolveDuration(duration, fromDate, toDate).to);
  const [data, setData] = useState<PieField[]>([]);

  const { isLoading, isError, data: rawData } = useQuery(['graphData', duration, from, to], () => fetchGraphData(auth.merchant!, from, to), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    enabled: duration !== Duration.CUSTOM || (new Date(from).getTime() <= new Date(to).getTime())
  })

  useEffect(() => {
    if (!rawData || !rawData['map']) {
      setData([]);
      return;
    }

    const successful = Object.keys(rawData['map']).reduce((acc, curr) => {
      return acc + +(rawData['map'][curr][UnifillAPI.SUCCESSFUL] ?? 0);
    }, 0)

    const unsuccessful = Object.keys(rawData['map']).reduce((acc, curr) => {
      return acc + +(rawData['map'][curr][UnifillAPI.UNSUCCESSFUL] ?? 0);
    }, 0)

    setData([
      { name: 'Hits with address match', value: successful },
      { name: 'Hits with no address match', value: unsuccessful }
    ])
  }, [rawData])

  useEffect(() => {
    const { from: f, to: t } = resolveDuration(duration, fromDate, toDate);
    setFrom(f);
    setTo(t);
  }, [fromDate, toDate, duration])

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

  if (!data.length) return (
    <Center justifyContent={`center`} h={`100%`} minH={`400px`} w="100%">
      No data available for the selected duration!
    </Center>
  )

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
        <Legend verticalAlign="top" align="center" fontSize="0.75rem" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
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
        <Tooltip labelStyle={{ fontSize: "0.75rem", paddingBottom: '0.25rem' }} itemStyle={{ fontSize: "0.75rem", padding: '0' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
