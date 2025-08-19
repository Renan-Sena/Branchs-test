import SOPBranchTree from './react_flow';
import VersionDiagram from './joints';

const SOPsView = () => {
  return (
    <div>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
      }}>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th style={{ padding: '10px', border: '1px solid #007bff', width: '10%' }}></th>
            <th style={{ padding: '10px', border: '1px solid #007bff', width: '90%' }}>history</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '10%' }}>ECU1</td>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '90%', zoom: 1.0 }}>
              <VersionDiagram />
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '10%' }}>ECU2</td>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '90%', zoom: 0.5 }}>
              <SOPBranchTree />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SOPsView;