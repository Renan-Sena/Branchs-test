import React from 'react';
import SOPBranchTree from './../SOPs/SOPBranchTree';

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
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '90%' }}>
              <SOPBranchTree />
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '10%' }}>ECU2</td>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '90%' }}>
              <SOPBranchTree />
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '10%' }}>ECU3</td>
            <td style={{ padding: '10px', border: '1px solid #007bff', width: '90%' }}>
              <SOPBranchTree />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SOPsView;