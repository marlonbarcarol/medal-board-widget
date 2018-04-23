import React from 'react';
import PropTypes from 'prop-types';
import 'Components/MedalTable/MedalTable.css';

import MedalTableRows from 'Components/MedalTable/MedalTableRows';
import SortableColumn from 'Components/SortableColumn';

const MedalTable = ({ medals, activeSort, sortableColumn, sortMedals }) => (
  <table className="medal-board-table">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th width="110"></th>
        <SortableColumn
          className="medal-sort circle gold-medal"
          isActive={ activeSort === sortableColumn.GOLD }
          onSort={ () => sortMedals(sortableColumn.GOLD) }
          ariaLabel={ 'Order by gold medals' }
        ></SortableColumn>

        <SortableColumn
          className="medal-sort circle silver-medal"
          isActive={ activeSort === sortableColumn.SILVER }
          onSort={ () => sortMedals(sortableColumn.SILVER) }
          ariaLabel={ 'Order by silver medals' }
        ></SortableColumn>

        <SortableColumn
          className="medal-sort circle bronze-medal"
          isActive={ activeSort === sortableColumn.BRONZE }
          onSort={ () => sortMedals(sortableColumn.BRONZE) }
          ariaLabel={ 'Order by bronze medals' }
        ></SortableColumn>

        <SortableColumn
          className="medal-sort"
          isActive={ activeSort === sortableColumn.TOTAL_MEDALS }
          onSort={ () => sortMedals(sortableColumn.TOTAL_MEDALS) }
          ariaLabel={ 'Order by total of medals' }
        >
          <b className="text-bold">Total</b>
        </SortableColumn>
      </tr>
    </thead>
    <tbody>
      <MedalTableRows medals={medals} />
    </tbody>
  </table>
);

MedalTable.propTypes = {
  medals: PropTypes.array.isRequired,
  activeSort: PropTypes.string.isRequired,
  sortableColumn: PropTypes.object.isRequired,
  sortMedals: PropTypes.func.isRequired
};

export default MedalTable;