import React from 'react';
import PropTypes from 'prop-types';
import 'Components/SortableColumn/SortableColumn.css';

const SortableColumn = ({ isActive, onSort, ariaLabel, children, ...props }) => (
  <th {...props}>
    <span className={`d-block medal-border ${isActive ? 'active' : ''}`}>
      <button
        type="button"
        className="btn-unstyled d-block btn-unstyled"
        aria-label={ ariaLabel }
        onClick={ () => onSort() }
      >
        { children }
      </button>
    </span>
  </th>
);

SortableColumn.propTypes = {
  isActive: PropTypes.bool.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  children:PropTypes.element,
};

export default SortableColumn;