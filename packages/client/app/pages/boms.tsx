import { useEffect, useState } from "react";
import type { Column } from "../ts/types";
import axios from "axios";
import { Toast } from "../components/toast";
import { Loader, renderActionRow, Table } from "../components";

let columns: Column[] = [];

export const BomsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threwError, setThrewError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/boms")
      .then((res) => {
        setData(res.data);
        columns.push(
          ...Object.keys(res.data[0]).map((key: string) => {
            return {
              header: key.charAt(0).toUpperCase() + key.slice(1),
              accessor: key,
            };
          }),
        );
        setLoading(false);
      })
      .catch((e) => {
        setThrewError(e);
        setError(e.message);
      });
  }, []);

  return (
    <div className="min-h-screen rounded-xl shadow-xs bg-white text-black dark:text-white dark:bg-gray-900 !px-4 !py-2 !my-2">
      <h2 className="font-bold">Bills Of Materials</h2>
      {threwError && <Toast type="error" durationMs={5000} message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <Table columns={columns} renderRow={renderActionRow} data={data} />
      )}
    </div>
  );
};
