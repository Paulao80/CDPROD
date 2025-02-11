import "./style.css";
import Api from "../../Services/Api";
import { useEffect, useState } from "react";
import { House, LocalDrink, People } from "@mui/icons-material";

interface Info {
  Produtores: number;
  Propriedades: number;
  Tanques: number;
}

const initialInfo: Info = {
  Produtores: 0,
  Propriedades: 0,
  Tanques: 0,
};

const Static = () => {
  const [info, setInfo] = useState<Info>(initialInfo);

  useEffect(() => {
    Api.get("/info")
      .then((response) => {
        setInfo(response.data);
      })
      .catch(() => {
        setInfo(initialInfo);
        return;
      });
  }, []);

  return (
    <div className="static">
      <div
        className="item"
        style={{
          backgroundColor: "#ED6E6E",
        }}
      >
        <span className="item-valor">{info.Produtores}</span>
        <span className="item-nome">
          {info.Produtores > 1 ? "Produtores" : "Produtor"}
        </span>
        <People className="item-icon" />
      </div>
      <div
        className="item"
        style={{
          backgroundColor: "#7ECD7C",
        }}
      >
        <span className="item-valor">{info.Propriedades}</span>
        <span className="item-nome">
          {info.Propriedades > 1 ? "Propriedades" : "Propriedade"}
        </span>
        <House className="item-icon" />
      </div>
      <div
        className="item"
        style={{
          backgroundColor: "#9CC4FF",
        }}
      >
        <span className="item-valor">{info.Tanques}</span>
        <span className="item-nome">
          {info.Tanques > 1 ? "Tanques" : "Tanque"}
        </span>
        <LocalDrink className="item-icon" />
      </div>
    </div>
  );
};

export default Static;
