export const fetchQuickChart = async (data: {
  labels: string[];
  datasets: [
    { data: unknown[]; backgroundColor?: string[]; borderColor?: string[] },
  ];
}): Promise<Uint8Array> => {
  const { labels, datasets } = data;

  /**
   * TODO: Improve flexibility
   */
  const chartConfig = {
    type: 'horizontalBar',
    data: {
      labels,
      datasets,
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
            },
            ticks: {
              min: new Date('2025-01-01'),
              max: new Date('2025-12-31'),
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  };

  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
  const imageResponse = await fetch(chartUrl);
  const imageArrayBuffer = await imageResponse.arrayBuffer();

  return new Uint8Array(imageArrayBuffer);
};
