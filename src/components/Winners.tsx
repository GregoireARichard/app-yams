import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Toaster } from "react-hot-toast";
import '../style/winners.css'

interface Winner {
  prizesWon: number;
  email: string;
  wonAt: Date;
}

const Winners: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Winner[]> = await axios.get(`${import.meta.env.VITE_BACK_ADDRESS}:${import.meta.env.VITE_BACK_PORT}/game/results`);
        setWinners(response.data);
        winners.map(winner => console.log(winner))
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="winners-container">
    <Toaster />
    <table className="winners-table">
      <thead>
        <tr>
          <th className="winners-table-header">Gagnant</th>
          <th className="winners-table-header">Prix gagné(s)</th>
          <th className="winners-table-header">Date</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={index} className="winners-table-row">
            <td className="winners-table-cell winners-table-cell-winner">{winner.email}</td>
            <td className="winners-table-cell">{winner.prizesWon}</td>
            <td className="winners-table-cell">{new Date(winner.wonAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Winners;
