import React, { useEffect, useRef } from "react";
import * as joint from "jointjs";

const VersionDiagram: React.FC = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new joint.dia.Graph();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paper = new joint.dia.Paper({
      el: graphRef.current,
      model: graph,
      width: 800,
      height: 450,
      gridSize: 1,
      drawGrid: true,
    });

    // Define the version hierarchy
    const data: Record<string, string[]> = {
      "1.0": ["1.1", "1.2"],
      "1.1": [],
      "1.2": ["1.2.1", "1.2.2", "1.2.3"],
      "1.2.1": [],
      "1.2.2": ["1.2.2.1"],
      "1.2.3": [],
      "1.2.2.1": []
    };

    // Layout settings
    const nodeWidth = 120;
    const nodeHeight = 50;
    const horizontalSpacing = 180;
    const verticalSpacing = 90;
    const startX = 50;
    const startY = 200;

    // Store node positions
    const nodePositions: Record<string, { x: number; y: number }> = {};

    // Recursive function to set positions
    const positionNodes = (version: string, x: number, y: number) => {
      nodePositions[version] = { x, y };
      const children = data[version];
      const numChildren = children.length;
      
      let offset = -(numChildren - 1) * verticalSpacing / 2;
      children.forEach((child) => {
        const childX = x + horizontalSpacing;
        const childY = y + offset;
        offset += verticalSpacing;
        positionNodes(child, childX, childY);
      });
    };

    // Start positioning from the root node
    positionNodes("1.0", startX, startY);

    // Function to create version nodes
    const nodes: Record<string, joint.dia.Element> = {};
    Object.entries(nodePositions).forEach(([version, { x, y }]) => {
      nodes[version] = new joint.shapes.standard.Rectangle({
        position: { x, y },
        size: { width: nodeWidth, height: nodeHeight },
        attrs: {
          body: { fill: "#f8f9fa", stroke: "#333" },
          label: { text: `Version: ${version}` , fill: "#000" },
        },
      }).addTo(graph);
    });

    // Function to create orthogonal links
    Object.entries(data).forEach(([parent, children]) => {
      children.forEach((child) => {
        new joint.shapes.standard.Link({
          source: { id: nodes[parent].id },
          target: { id: nodes[child].id },
          router: { name: "manhattan" },
          connector: { name: "normal" },
          attrs: {
            line: { stroke: "#333", strokeWidth: 2, targetMarker: { type: 'metro' } },
          },
        }).addTo(graph);
      });
    });
  }, []);

  return <div ref={graphRef} style={{ border: "0px solid black" }}></div>;
};

export default VersionDiagram;
