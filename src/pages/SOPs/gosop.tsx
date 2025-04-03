import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { useEffect, useRef, useCallback } from "react";

type NodeData = {
  key: number;
  text: string;
  date: string;
};

type LinkData = {
  from: number;
  to: number;
};

function Diagram() {
  const diagramRef = useRef<go.Diagram | null>(null);

  const nodeDataArray: NodeData[] = [
    { key: 1, text: "Version 1.0", date: "2025-01-01" },
    { key: 2, text: "Version 1.1", date: "2025-02-01" },
    { key: 3, text: "Version 1.2", date: "2025-03-01" },
    { key: 4, text: "Version 1.2.1", date: "2025-04-01" },
    { key: 5, text: "Version 1.2.2", date: "2025-05-01" },
    { key: 6, text: "Version 1.2.2.1", date: "2025-06-01" },
    { key: 7, text: "Version 1.2.3", date: "2025-07-01" },
  ];

  const linkDataArray: LinkData[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
    { from: 3, to: 7 },
  ];

  const initDiagram = useCallback(() => {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      "grid.visible": false,
      initialAutoScale: go.Diagram.Uniform, // Garante que os nós fiquem visíveis
      contentAlignment: go.Spot.Center,
      layout: $(go.TreeLayout, {
        angle: 90,
        layerSpacing: 80,
        nodeSpacing: 60,
      }),
    });

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { zOrder: 10 }, // Garante que os nós fiquem acima de outros elementos
      $(go.Shape, "RoundedRectangle", {
        fill: "lightblue",
        stroke: "black",
        strokeWidth: 2,
        width: 140,
        height: 70,
      }),
      $(
        go.Panel,
        "Table",
        { margin: 5 },
        $(go.TextBlock, {
          font: "bold 10pt sans-serif",
          textAlign: "center",
          margin: 4,
          row: 0,
        }, new go.Binding("text", "text")),
        $(go.TextBlock, {
          font: "9pt sans-serif",
          textAlign: "center",
          margin: 4,
          row: 1,
        }, new go.Binding("text", "date"))
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 10 },
      $(go.Shape, { strokeWidth: 2, stroke: "gray" }),
      $(go.Shape, { toArrow: "Standard", stroke: "gray", fill: "gray" })
    );

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    return diagram;
  }, []);

  useEffect(() => {
    if (diagramRef.current) {
      diagramRef.current.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    }
  }, [nodeDataArray, linkDataArray]);

  return (
    <div style={{ width: "100%", height: "600px", border: "2px solid black" }}>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
      />
    </div>
  );
}

export default Diagram;
