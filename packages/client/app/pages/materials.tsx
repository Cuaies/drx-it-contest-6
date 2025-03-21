import { useEffect, useState } from "react";
import { Loader, renderActionRow, Table, Toast } from "../components";
import axios from "axios";
import type { Column } from "../ts/types";

let columns: Column[] = [];

export const MaterialsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threwError, setThrewError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/materials")
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
      <h2 className="font-bold">Materials</h2>
      {threwError && <Toast type="error" durationMs={5000} message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <Table columns={columns} renderRow={renderActionRow} data={data} />
      )}
    </div>
  );
};
