import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const aggregateByDate = (data: any) => {
  const countByDate: Record<string, number> = {};

  data.forEach((item: any) => {
    const date = new Date(item.createdAt);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    if (countByDate[formattedDate]) {
      countByDate[formattedDate]++;
    } else {
      countByDate[formattedDate] = 1;
    }
  });

  return Object.keys(countByDate).map((date) => ({
    date,
    count: countByDate[date],
  }));
};

export const AdminDashboardPage = () => {
  const [materialsStats, setMaterialStats] = useState<
    { date: string; count: number }[] | undefined
  >(undefined);
  const [productStats, setProductStats] = useState<
    { date: string; count: number }[] | undefined
  >(undefined);
  const [usersCount, setUsersCount] = useState(0);
  const [materialsCount, setMaterialsCount] = useState(0);
  const [bomsCount, setBomsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/materials").then((res) => {
      const data = res.data;
      setMaterialsCount(data.length);
      setMaterialStats(aggregateByDate(data));
    });
    axios.get("http://localhost:3000/boms").then((res) => {
      const data = res.data;
      setBomsCount(data.length);
    });
    axios.get("http://localhost:3000/products").then((res) => {
      const data = res.data;
      setProductsCount(data.length);
      setProductStats(aggregateByDate(data));
    });
    axios.get("http://localhost:3000/users").then((res) => {
      const data = res.data;
      setUsersCount(data.length);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 min-h-screen">
      {/* Row 1 */}
      <div className="col-span-2 h-82 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900 flex flex-col justify-around items-center">
        <span className="text-center text-md font-bold mt-2">
          PRODUCTS CREATED
        </span>
        <ResponsiveContainer width="90%" height="70%">
          <AreaChart
            width={500}
            height={400}
            data={productStats}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count" // Visualizing the number of products created
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-2">
        <div className="h-40 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900 flex flex-col justify-around items-center">
          <span className="text-center text-md font-bold mt-2">USERS</span>
          <span className="text-center text-md font-extralight !mb-6 text-4xl">
            {usersCount}
          </span>
        </div>
        <div className="h-40 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900 flex flex-col justify-around items-center">
          <span className="text-center text-md font-bold mt-2">PRODUCTS</span>
          <span className="text-center text-md font-extralight !mb-6 text-4xl">
            {productsCount}
          </span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid gap-2">
        <div className="h-40 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900 flex flex-col justify-around items-center">
          <span className="text-center text-md font-bold mt-2">BOMS</span>
          <span className="text-center text-md font-extralight !mb-6 text-4xl">
            {bomsCount}
          </span>
        </div>
        <div className="h-40 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900 flex flex-col justify-around items-center">
          <span className="text-center text-md font-bold mt-2">MATERIALS</span>
          <span className="text-center text-md font-extralight !mb-6 text-4xl">
            {materialsCount}
          </span>
        </div>
      </div>
      <div className="col-span-2 h-82 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900 flex flex-col justify-around items-center">
        <span className="text-center text-md font-bold mt-2">
          MATERIALS CREATED
        </span>
        <ResponsiveContainer width="90%" height="70%">
          <AreaChart
            width={500}
            height={400}
            data={materialsStats}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count" // Visualizing the number of products created
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Row 3 */}
      <div className="col-span-2 h-80 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900"></div>
      <div className="grid gap-2">
        <div className="h-40 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900"></div>
        <div className="h-40 shadow-md rounded-2xl bg-white text-black dark:text-white dark:bg-gray-900"></div>
      </div>
    </div>
  );
};
