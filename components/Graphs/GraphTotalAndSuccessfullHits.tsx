import { Box, Center, Flex, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
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
import { fetchGraphData } from "../../apis/get";
import { Chart, ChartWorkflow, Duration, UnifillAPI } from "../../enums";
import { resolveDuration } from "../../utils";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface Props {
  duration: Duration;
  fromDate: string;
  toDate: string;
  setTabIndex: Function;
}

interface CartesianPoint {
  date: string;
  total: number;
  successful: number;
}

export default function GraphTotalAndSuccessfullHits({ duration, fromDate, toDate, setTabIndex }: Props) {
  const auth = useContext(AuthContext);
  const [from, setFrom] = useState<string>(resolveDuration(duration, fromDate, toDate).from);
  const [to, setTo] = useState<string>(resolveDuration(duration, fromDate, toDate).to);
  const [dataIN, setDataIN] = useState<CartesianPoint[]>([]);

  const { isLoading, isError, data: rawData } = useQuery(['graphData', duration, from, to], () => fetchGraphData(auth.merchant!, from, to), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    enabled: duration !== Duration.CUSTOM || (new Date(from).getTime() <= new Date(to).getTime())
  });

  useEffect(() => {
    if (!rawData || !rawData['map']) {
      setDataIN([]);
      setTabIndex(-1);
      return;
    }

    const dataUS: CartesianPoint[] = Object.keys(rawData?.['map'])?.map((date) => {
      const formattedDate = new Date(date).toLocaleDateString('en-US');
      return {
        date: formattedDate,
        total: (rawData['map'][date][UnifillAPI.UNSUCCESSFUL] ?? 0) + (rawData['map'][date][UnifillAPI.SUCCESSFUL] ?? 0),
        successful: rawData['map'][date][UnifillAPI.SUCCESSFUL] ?? 0,
      }
    });

    setDataIN(dataUS.sort((a: CartesianPoint, b: CartesianPoint) => {
      const timeA = new Date(a.date).getTime(), timeB = new Date(b.date).getTime();
      return timeA < timeB ? -1 : 1;
    }).map((point) => {
      return {
        ...point,
        date: new Date(point.date).toLocaleDateString('en-IN')
      }
    }));

    setTabIndex(ChartWorkflow[rawData['addressWorkflow']] ?? 0);
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

  if (!dataIN.length) return (
    <Center justifyContent={`center`} h={`100%`} minH={`400px`} w="100%">
      No data available for the selected duration!
    </Center>
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={dataIN}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{ value: "Date", position: "insideBottom", offset: "-5", fontSize: "0.75rem" }}
          fontSize="0.75rem"
        />
        {/* label={{ value: 'Hits', angle: -90, position: 'left', offset: '-20' }} */}
        <YAxis fontSize="0.75rem" />
        {/* label={{ value: "API Count", angle: -90, position: "insideBottom", offset: "150", fontSize: "0.75rem" }} */}
        <Tooltip labelStyle={{ fontSize: "0.75rem", paddingBottom: '0.25rem' }} itemStyle={{ fontSize: "0.75rem", padding: '0' }} />
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
