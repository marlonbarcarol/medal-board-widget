import React from 'react';
import PropTypes from 'prop-types';

const MedalTableRows = ({ medals }) => (
  medals.map((medal, index) => (
    <tr key={medal.code}>
      <td className="text-center">{ index + 1 }</td>
      <td>
        <div className={`flag ${medal.code.toLowerCase()}`}></div>
      </td>
      <td className="text-bold">{ medal.code }</td>
      <td className="text-center">{ medal.gold }</td>
      <td className="text-center">{ medal.silver }</td>
      <td className="text-center">{ medal.bronze }</td>
      <td className="text-center table-total text-bold">{ medal.total }</td>
    </tr>
  ))
);

MedalTableRows.propTypes = {
  medals: PropTypes.array
};

export default MedalTableRows;