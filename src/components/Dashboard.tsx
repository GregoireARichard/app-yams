import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import WonPastries from "./WonPastries";
import "../style/Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface GameData {
  success: string;
  dice: number[];
  prize: any[];
}

const Dashboard = () => {
  const [data, setData] = useState<GameData | null>(null);
  const [diceValues, setDiceValues] = useState<number[]>([0, 0, 0, 0, 0]);
  const navigate = useNavigate();
  const email = useSelector((state: any) => state.auth.user.email);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_ADDRESS}:${
          import.meta.env.VITE_BACK_PORT
        }/game/roll-dices`,
        {
          email: email,
        }
      );

      setData(response.data);
      setDiceValues(response.data.dice);
    } catch (error) {
      console.error(error);
      toast.error(
        "Vous ne pouvez jouer que 3 fois ou qu'une seule si vous avez gagné."
      );
    }
  };

  const moveToLeaderboard = () => {
    navigate("/results");
  };

  return (
    <div className="dashboard-container">
      <Toaster />
      <h1 className="main-title">Yummy yams</h1>

      {!data && (
        <div className="upper-square">
          <button onClick={handleClick}>Play</button>
        </div>
      )}

      {data && (
        <div className="square">
          {data.prize.length > 0 ? (
            <WonPastries prize={data.prize} />
          ) : (
            <div>
              <p>Vous n'avez gagné aucune pâtisserie</p>
            </div>
          )}

          <p>Score: {data.dice.join(", ")}</p>
          <div className="dice-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="dice">
                <div className="dice-face face-1">{diceValues[i]}</div>
                <div className="dice-face face-2">{diceValues[i]}</div>
                <div className="dice-face face-3">{diceValues[i]}</div>
                <div className="dice-face face-4">{diceValues[i]}</div>
                <div className="dice-face face-5">{diceValues[i]}</div>
                <div className="dice-face face-6">{diceValues[i]}</div>
              </div>
            ))}
          </div>
          <button onClick={handleClick} className="rejouer-btn">
            Rejouer
          </button>
        </div>
      )}
      <div className="container">
        <button onClick={moveToLeaderboard} className="leaderboard-btn">
          Voir le classement
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
