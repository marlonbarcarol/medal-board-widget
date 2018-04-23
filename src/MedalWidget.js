import React from 'react';
import ReactDOM from 'react-dom';

import App from 'Components/App';
import SortableColumnEnum from 'Components/SortableColumn/SortableColumnEnum';

export default class MedalWidget {
  element = null;
  sortBy = null;

  constructor (sortBy = SortableColumnEnum.GOLD, element = document.getElementById('root')) {
    this.sortBy = sortBy;
    this.element = element;
  }

  initialize () {
    ReactDOM.render(<App activeSort={ this.sortBy } />, this.element);
  }

  destroy () {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}
