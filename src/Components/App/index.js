import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'Components/App/App.css';

import { getMedals } from 'Utils/resource';

import MedalTable from 'Components/MedalTable';
import SortableColumnEnum from 'Components/SortableColumn/SortableColumnEnum';

const createMedals = (nationMedal) => {
  return {
    code: nationMedal.code,
    gold: nationMedal.gold,
    silver: nationMedal.silver,
    bronze: nationMedal.bronze,
    total: nationMedal.gold + nationMedal.silver + nationMedal.bronze,
  };
};

class App extends Component {
  state = {
    allMedals: [],
    paginatedMedals: [],
    activeSort: this.props.activeSort || SortableColumnEnum.GOLD,
    isLoading: true,
    failToLoad: false 
  };

  constructor(props) {
    super(props);

    this.setActiveColumn = this.setActiveColumn.bind(this);
  }

  componentDidMount () {
    getMedals()
      .then(response => response.map(createMedals))
      .then(response => {
        this.setState({
          nationMedals: response,
          paginatedMedals: this.sortMedalsByColumn(response),
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({ failToLoad: true, isLoading: false });
      });
  }

  sortMedalsByColumn(medals, column = this.state.activeSort) {
    const getColumnSortingRule = (a, b) => {
      switch (column) {
        case SortableColumnEnum.GOLD:
          return b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze;

        case SortableColumnEnum.SILVER:
          return b.silver - a.silver || b.gold - a.gold || b.bronze - a.bronze;
  
        case SortableColumnEnum.BRONZE:
          return b.bronze - a.bronze || b.gold - a.gold || b.silver - a.silver;
  
        case SortableColumnEnum.TOTAL_MEDALS:
          return b.total - a.total || b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze;

        default:
          throw new Error(`Unexpected sorted column: ${column}`);
      }
    };

    return medals.sort(getColumnSortingRule)
      .slice(0, 10);
  }

  setActiveColumn(sortingColumn) {
    this.setState({
      paginatedMedals: this.sortMedalsByColumn(this.state.nationMedals, sortingColumn),
      activeSort: sortingColumn,
    });
  }

  render() {
    let medalTableWhenDone = (
      <MedalTable
        activeSort={ this.state.activeSort }
        medals={ this.state.paginatedMedals }
        sortMedals={ this.setActiveColumn }
        sortableColumn={ SortableColumnEnum }
      />
    );

    if (this.state.isLoading) {
      medalTableWhenDone = 'Loading the medal count.';
    }

    if (this.state.failToLoad) {
      medalTableWhenDone = 'Oops something went wrong. The medal count could not be loaded.';
    }

    return (
      <div className="App">
        <header className="App-header text-left">
          MEDAL COUNT
        </header>

        { medalTableWhenDone }
      </div>
    );
  }
}

App.propTypes = {
  activeSort: PropTypes.string,
};

export default App;
