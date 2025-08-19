import { memo, useState, useEffect } from 'react';
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
} from '@xyflow/react';
import dagre from 'dagre';
import '@xyflow/react/dist/style.css';

type SOPNode = {
  name: string;
  version: string;
  date: string;
  sops: SOPNode[];
};

type CustomNodeData = {
  version: string;
  date: string;
  tooltip: string;
  nodeId: string;
  collapsed: boolean;
  toggleNode: (nodeId: string) => void;
};

const data: SOPNode = {
  name: 'Teste1',
  version: '1.0',
  date: '2025-01-01',
  sops: [
    {
      name: 'Teste1.1',
      version: '1.1',
      date: '2025-01-01',
      sops: [],
    },
    {
      name: 'Teste1.2',
      version: '1.2',
      date: '2025-01-01',
      sops: [
        {
          name: 'Teste1.2.1',
          version: '1.2.1',
          date: '2025-01-01',
          sops: [],
        },
        {
          name: 'Teste1.2.2',
          version: '1.2.2',
          date: '2025-01-01',
          sops: [
            {
              name: 'Teste1.2.2.1',
              version: '1.2.2.1',
              date: '2025-01-01',
              sops: [],
            },
          ],
        },
        {
          name: 'Teste1.2.3',
          version: '1.2.3',
          date: '2025-01-01',
          sops: [],
        },
      ],
    },
  ],
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 100 });

const generateNodesAndEdges = (
  node: SOPNode,
  toggleNode: (nodeId: string) => void,
  parentId?: string,
  level = 0,
  nodes: Node<CustomNodeData>[] = [],
  edges: Edge[] = [],
  collapsedNodes: Set<string> = new Set()
) => {
  const nodeId = `${node.name}-${level}`;
  const collapsed = collapsedNodes.has(nodeId);

  nodes.push({
    id: nodeId,
    data: {
      version: node.version,
      date: node.date,
      tooltip: `${node.name}\nData: ${node.date}`,
      nodeId,
      collapsed,
      toggleNode,
    },
    position: { x: 0, y: 0 },
    type: 'step',
  });

  if (parentId) {
    edges.push({ id: `${parentId}-${nodeId}`, source: parentId, target: nodeId, animated: true, type: 'step' });
  }

  if (!collapsed) {
    node.sops.forEach((child) => {
      generateNodesAndEdges(child, toggleNode, nodeId, level + 1, nodes, edges, collapsedNodes);
    });
  }

  return { nodes, edges };
};

const applyDagreLayout = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 100 });
  nodes.forEach((node) => dagreGraph.setNode(node.id, { width: 200, height: 100 }));
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);
  return nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return { ...node, position: { x, y } };
  });
};

const CustomNode = memo(({ data }: { data: CustomNodeData }) => {
  return (
    <div
      style={{ border: '1px solid #007bff', borderRadius: 8, background: '#fff', padding: 10, cursor: 'pointer' }}
      onClick={() => data.toggleNode(data.nodeId)}
    >
      <Handle type='target' position={Position.Left} />
      <div>version: {data.version}</div>
      <div>date: {data.date}</div>
      <Handle type='source' position={Position.Right} />
    </div>
  );
});

const SOPBranchTree = () => {
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const toggleNode = (nodeId: string) => {
    setCollapsedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const { nodes: generatedNodes, edges: generatedEdges } = generateNodesAndEdges(data, toggleNode, undefined, 0, [], [], collapsedNodes);
    const updatedNodes = applyDagreLayout(generatedNodes, generatedEdges);
    setNodes(updatedNodes);
    setEdges(generatedEdges);
  }, [collapsedNodes]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow nodeTypes={{ step: CustomNode }} nodes={nodes} edges={edges} nodesDraggable={false} zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false} panOnScroll={false} panOnDrag={false} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default SOPBranchTree;
