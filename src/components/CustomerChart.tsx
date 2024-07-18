import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface Transaction {
    id: number;
    customer_id: number;
    date: string;
    amount: number;
}

interface CustomerChartProps {
    transactions: Transaction[];
}

export function CustomerChart({ transactions }: CustomerChartProps) {
    const groupedByDate = transactions.reduce<Record<string, number>>((acc, transaction) => {
        if (!acc[transaction.date]) {
            acc[transaction.date] = 0;
        }
        acc[transaction.date] += transaction.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(groupedByDate),
        datasets: [
            {
                label: 'Transaction Amount',
                data: Object.values(groupedByDate),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return <Line data={data} />;
}

