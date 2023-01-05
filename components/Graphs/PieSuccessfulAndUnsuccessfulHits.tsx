import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartTabs from "../ChartTabs/ChartTabs";

interface Props {
    duration: string;
}

export default function PieSuccessfulAndUnsuccessfulHits({ duration }: Props) {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const tabs = ['With OTP', 'Consolidated', 'WithoutOTP'];

    useEffect(() => {
        // refetch data on tab/duration change
        // show spinner, etc.
    }, [tabIndex, duration]);

    const data = [
        { name: 'Hits with address match', value: 310 },
        { name: 'Hits with no address match', value: 1290 },
    ];

    const COLORS = ['red', '#4185F4'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Box>
            <Flex justifyContent="space-between" alignItems="center" marginBottom="1rem" paddingStart="1rem">
                <Heading as="h5" size="md">Successful and Unsuccessful API hits</Heading>
                <ChartTabs setTabIndex={setTabIndex} />
            </Flex>
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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    )
}