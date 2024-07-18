import { useEffect, useState } from "react"
import axiosInstance from "../lib/axios/axiosinstance";
import { CustomerChart } from "./CustomerChart";

export default function Table() {
    const [customers, setCustomers] = useState<any>([])
    const [transactions, setTransactions] = useState<any>([])
    const [filter, setFilter] = useState<any>('')
    const [selectedCustomerId, setSelectedCustomerId] = useState<any>(null);
    useEffect(()=>{
    axiosInstance.get('/customers').then(response=>setCustomers(response.data))
    axiosInstance.get('/transactions').then(response=>setTransactions(response.data))
    },[])
    
    const filteredCustomers = customers.filter((customer:any) =>
        customer.name.toLowerCase().includes(filter.toLowerCase())
    );
    const handleCustomerClick = (customerId: any) => {
        setSelectedCustomerId(customerId);
    };
    const selectedCustomerTransactions = transactions.filter((transaction:any) => transaction.customer_id === selectedCustomerId);

  return (
    <div className="w-full h-full fixed bg-white-100 p-3 border-b-[0.5px] border-sideItem">
            <input
                type="text"
                placeholder="Filter by customer name"
                value={filter}
                onChange={(e)=>setFilter(e.target.value)}
                className="bg-gray-100 lg:w-[80%] lg:h-[60px] w-auto h-auto pr-10 pl-4 py-2 bg-gray ml-[190px] mb-[50px] rounded-full border-none"
            />
            <table className="w-[80%] bg-gray-100 m-auto text-center">
                <thead >
                    <tr >
                        <th className="bg-gray-500 py-[20px]">Customer</th>
                        <th className="bg-gray-500 py-[20px]">Transactions</th>
                        <th className="bg-gray-500 py-[20px]">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer:any) => {
                        const customerTransactions = transactions.filter((transaction:any) => transaction.customer_id == customer.id);
                        const totalAmount = customerTransactions.reduce((total:any, transaction:any) => total + transaction.amount, 0);

                        return (
                            <tr key={customer.id} onClick={() => handleCustomerClick(customer.id)}>
                                <td className="w-[30%]">{customer.name}</td>
                                <td className="w-[30%] bg-gray-200 py-[20px]" >
                                    {customerTransactions.map((transaction:any) => (
                                        <div key={transaction.id} >
                                            Date: {transaction.date} , Amount: {transaction.amount}
                                        </div>
                                    ))}
                                </td>
                                <td className="w-[30%]">{totalAmount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {selectedCustomerId && <CustomerChart transactions={selectedCustomerTransactions} />}
        </div>
  )
}
