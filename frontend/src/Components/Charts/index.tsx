import { ChartData, Tanque } from "../../Interfaces";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import Api from "../../Services/Api";

interface Municipios {
  Municipio: string;
  QTD: number;
}

interface Tipos {
  TipoTanque: number;
  QTD: number;
}

const initialChartData = {
  labels: {
    categories: [],
  },
  series: [
    {
      name: "",
      data: [],
    },
  ],
};

export const ChartMedia = () => {
  const [chartData, setChartData] = useState<ChartData>(initialChartData);

  useEffect(() => {
    Api.get("/tanques")
      .then((response) => {
        const data = response.data as Tanque[];
        const myLabels = data.map((x) => String(x.TanqueId));
        const mySeries = data.map((x) => (x.MediaDiaria ? x.MediaDiaria : 0));

        setChartData({
          labels: {
            categories: myLabels,
          },
          series: [
            {
              name: "Média Diária (L)",
              data: mySeries,
            },
          ],
        });
      })
      .catch(() => {
        setChartData(initialChartData);
        return;
      });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  };

  return (
    // @ts-ignore
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="300"
    />
  );
};

export const ChartPropByMunicipio = () => {
  const [chartData, setChartData] = useState<ChartData>(initialChartData);

  useEffect(() => {
    Api.get("/propriedades", {
      params: {
        group: "Municipio",
      },
    })
      .then((response) => {
        const data = response.data as Municipios[];
        const myLabels = data.map((x) => x.Municipio);
        const mySeries = data.map((x) => x.QTD);

        setChartData({
          labels: {
            categories: myLabels,
          },
          series: [
            {
              name: "Quantidade por Municipio",
              data: mySeries,
            },
          ],
        });
      })
      .catch(() => {
        setChartData(initialChartData);
        return;
      });
  }, []);

  const options = {
    legend: {
      show: true,
    },
  };

  return (
    // @ts-ignore
    <Chart
      options={{ ...options, labels: chartData.labels.categories }}
      series={chartData.series[0].data}
      type="donut"
      height="240"
    />
  );
};

export const ChartTipoTanque = () => {
  const [chartData, setChartData] = useState<ChartData>(initialChartData);

  useEffect(() => {
    Api.get("/tanques", {
      params: {
        group: "TipoTanque",
      },
    })
      .then((response) => {
        const data = response.data as Tipos[];
        const myLabels = data.map((x) => {
          switch (x.TipoTanque) {
            case 1:
              return "Individual";
            default:
              return "Comunitário";
          }
        });
        const mySeries = data.map((x) => x.QTD);

        setChartData({
          labels: {
            categories: myLabels,
          },
          series: [
            {
              name: "Tipo de Tanque",
              data: mySeries,
            },
          ],
        });
      })
      .catch(() => {
        setChartData(initialChartData);
        return;
      });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    // @ts-ignore
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
};
