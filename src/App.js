import React, { Component } from 'react';
import 'App.css';
import MedalTable from 'Components/MedalTable';

const MEDALS_ENDPOINT = 'https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json';

const SortableColumn = {
  TOTAL_MEDALS: 'sort-total-medals',
  GOLD: 'sort-gold',
  SILVER: 'sort-silver',
  BRONZE: 'sort-bronze',
};

const createNationMedals = (nationMedal) => {
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
    nationMedals: [],
    displayedMedals: [],
    activeSort: SortableColumn.GOLD,
  };

  constructor(props) {
    super(props);

    this.sortNationMedals = this.sortNationMedals.bind(this);
  }

  componentDidMount () {
    fetch(MEDALS_ENDPOINT, { cache: 'no-cache', mode: 'cors' })
      .then(response => response.json())
      .then(response => response.map(createNationMedals))
      .then(response => {
        this.setState({
          nationMedals: response,
          displayedMedals: this.sortByColumn(response)
        });
      });
  }

  getSortingFnRulesDependingOnColumn(sortingColumn) {
    switch (sortingColumn) {
      case SortableColumn.GOLD:
        return (a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze;
        
      case SortableColumn.SILVER:
        return (a, b) => b.silver - a.silver || b.gold - a.gold || b.bronze - a.bronze;

      case SortableColumn.BRONZE:
        return (a, b) => b.bronze - a.bronze || b.gold - a.gold || b.silver - a.silver;

      default:
        return (a, b) => b.total - a.total || b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze;
    }
  }

  sortByColumn(medals, sortingColumn) {
    return medals.sort(
      this.getSortingFnRulesDependingOnColumn(sortingColumn)
    );
  }

  sortNationMedals(sortingColumn) {
    this.setState({
      displayedMedals: this.sortByColumn(this.state.nationMedals, sortingColumn),
      activeSort: sortingColumn,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header text-left">
          MEDAL COUNT
        </header>

        <MedalTable
          activeSort={ this.state.activeSort }
          medals={ this.state.displayedMedals }
          sortMedals={ this.sortNationMedals } 
          sortableColumn={ SortableColumn }
        />
      </div>
    );
  }
}

export default App;
