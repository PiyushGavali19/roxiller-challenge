import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionTable() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, [page, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/data/transactions?page=${page}&perPage=${perPage}&search=${search}`
      );
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error(error);
      setTransactions([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-200 p-4">
    
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
       
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Product Transactions</h1>
        <button
          className="mb-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none transition-colors"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>

        <div className="flex justify-between items-center mb-6">
     
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions by title or description..."
            className="border border-gray-300 focus:border-blue-400 focus:ring-blue-300 rounded-lg px-4 py-2 w-full max-w-xs transition-colors"
          />
      
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page === 1}
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-opacity ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

  
        <div className="overflow-auto max-h-96">
          <table className="w-full text-center border border-gray-300 rounded-lg shadow-md">
  
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 border border-gray-300">ID</th>
                <th className="py-3 px-4 border border-gray-300">Image</th>
                <th className="py-3 px-4 border border-gray-300">Title</th>
                <th className="py-3 px-4 border border-gray-300">Description</th>
                <th className="py-3 px-4 border border-gray-300">Price</th>
                <th className="py-3 px-4 border border-gray-300">Sold</th>
                <th className="py-3 px-4 border border-gray-300">Date of Sale</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-blue-50 transition-colors">
                    <td className="border-b border-gray-300 py-3 px-4 border-r">{transaction.id}</td>
                    <td className="border-b border-gray-300 py-3 px-4 border-r">
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="border-b border-gray-300 py-3 px-4 border-r">{transaction.title}</td>
                    <td className="border-b border-gray-300 py-3 px-4 border-r">{transaction.description}</td>
                    <td className="border-b border-gray-300 py-3 px-4 border-r">${transaction.price}</td>
                    <td className="border-b border-gray-300 py-3 px-4 border-r">{transaction.sold ? "Yes" : "No"}</td>
                    <td className="border-b border-gray-300 py-3 px-4">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border-b border-gray-300 py-4 px-4 text-center text-gray-500" colSpan="7">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
