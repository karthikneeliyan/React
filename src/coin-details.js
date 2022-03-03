import "./App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CoinDetails = () => {
  let params = useParams();
  const [coin, setCoin] = useState({});
  console.log(params);
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoin(data);
      });
  }, []);

  return (
    <div>
      <Link to={`/`}>Homepage </Link>
      <ul>
        <li>Name : {coin?.name}</li>
        <li>Symbol: {coin?.symbol}</li>
        <li>Hashing algorithm :{coin?.hashing_algorithm}</li>
        <li>Market cap in Euro: {coin?.market_data?.market_cap?.eur}</li>
        <li>Homepage : {coin?.links?.homepage[0]} </li>
        <li>Genesis Date : {coin?.genesis_date}</li>
      </ul>{" "}
    </div>
  );
};

export default CoinDetails;
