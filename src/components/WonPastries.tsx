import "../style/WonPastries.css";
interface WonPastryProps {
    imageLink: string;
    stockWon: number;
    name: string;
  }
  
  interface WonPastriesProps {
    prize: WonPastryProps[];
  }
  
  const WonPastry = ({ imageLink: imageName, stockWon: numberWon, name }: WonPastryProps) => {
    return (
      <div className="won-pastry">
        <img src={`/assets/${imageName}`} alt={name} className="won-pastry-image" />
        <h3 className="won-pastry-title">{name}</h3>
        <p className="won-pastry-number">{numberWon} gagnée(s)</p>
      </div>
    );
  };
  
  const WonPastries = ({ prize }: WonPastriesProps) => {
    return (
      <div className="won-pastries-container">
        {prize.map((pastry, index) => (
          <WonPastry key={index} {...pastry} />
        ))}
      </div>
    );
  };

  export default WonPastries;