"use client";

import { ResponsiveRadialBar } from "@nivo/radial-bar";

const data = [
  {
    id: "Supermarket",
    data: [
      {
        x: "Vegetables",
        y: 32,
      },
      {
        x: "Fruits",
        y: 136,
      },
      {
        x: "Meat",
        y: 201,
      },
      {
        x: "Fish",
        y: 93,
      },
    ],
  },
  {
    id: "Combini",
    data: [
      {
        x: "Vegetables",
        y: 133,
      },
      {
        x: "Fruits",
        y: 212,
      },
      {
        x: "Meat",
        y: 20,
      },
      {
        x: "Fish",
        y: 31,
      },
    ],
  },
  {
    id: "Online",
    data: [
      {
        x: "Vegetables",
        y: 66,
      },
      {
        x: "Fruits",
        y: 99,
      },
      {
        x: "Meat",
        y: 122,
      },
      {
        x: "Fish",
        y: 145,
      },
    ],
  },
  {
    id: "Marché",
    data: [
      {
        x: "Vegetables",
        y: 272,
      },
      {
        x: "Fruits",
        y: 196,
      },
      {
        x: "Meat",
        y: 104,
      },
      {
        x: "Fish",
        y: 277,
      },
    ],
  },
];

const RadialBarChart = () => (
  <ResponsiveRadialBar
    data={data}
    valueFormat=">-.2f"
    padding={0.4}
    cornerRadius={2}
    margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
    radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
    circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
    legends={[
      {
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 80,
        translateY: 0,
        itemsSpacing: 6,
        itemDirection: "left-to-right",
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        symbolSize: 18,
        symbolShape: "square",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default RadialBarChart;