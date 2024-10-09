import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/data/statistics?month=${selectedMonth}`
      );
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-200 p-4">
    
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
       
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Statistics for Selected Month</h2>

        <div className="flex justify-center mb-8">
          <select
            className="mb-4 p-3 bg-blue-100 border-2 border-blue-300 focus:border-blue-500 focus:outline-none rounded-md shadow-md text-lg text-blue-700 cursor-pointer transition-colors"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </div>

        <button
          className="mb-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none transition-colors"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>

        {statistics && (
          <div className="overflow-auto max-h-96">
            <table className="w-full text-center border border-gray-200 rounded-lg shadow-md">
    
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6">Total Sale Amount</th>
                  <th className="py-4 px-6">Total Sold Items</th>
                  <th className="py-4 px-6">Total Not Sold Items</th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                  <td className="border-b border-gray-200 py-4 px-6 text-blue-800 font-semibold">
                    ${statistics.totalSaleAmount}
                  </td>
                  <td className="border-b border-gray-200 py-4 px-6 text-blue-800 font-semibold">
                    {statistics.totalSoldItems}
                  </td>
                  <td className="border-b border-gray-200 py-4 px-6 text-blue-800 font-semibold">
                    {statistics.totalNotSoldItems}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
