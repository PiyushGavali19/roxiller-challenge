import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Home() {
  const navigate = useNavigate();

  const fetchData=async()=>{

   const response= await axios.get('http://localhost:8080/api/initialize-database');
   if(response){
    alert("Database initialized successfully!");
   }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-50 via-indigo-100 to-blue-200 p-8">
    
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-12 text-center">
       
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 animate-fadeIn">
          Transaction Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-12 animate-fadeIn">
          Navigate through the data visualizations and tables to explore the insights.
        </p>

     
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <button
            className="transform hover:scale-105 hover:bg-blue-600 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={() => navigate("/table")}
          >
            Transactions Table
          </button>
          <button
            className="transform hover:scale-105 hover:bg-blue-600 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={() => navigate("/stats")}
          >
            Statistics
          </button>
          <button
            className="transform hover:scale-105 hover:bg-blue-600 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={() => navigate("/bar")}
          >
            Bar Chart
          </button>
          <button
            className="transform hover:scale-105 hover:bg-blue-600 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={() => navigate("/pie")}
          >
            Pie Chart
          </button>
          <button
            className="transform hover:scale-105 hover:bg-blue-600 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={fetchData}
          >
           Initialize Database
          </button>
          <button
            className="transform hover:scale-105 hover:bg-purple-600 bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out col-span-full md:col-span-3"
            onClick={() => navigate("alldata")}
          >
            All of the Above
          </button>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 animate-fadeIn">
        © {new Date().getFullYear()} Your Dashboard. All Rights Reserved.
      </footer>
    </div>
  );
}
