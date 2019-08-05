import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';

import ItemList from './ListItem/ListItem';
import FiltersPanel from './FIltersPanel/FiltersPanel';
import { ReactComponent as ArrowUp } from '../../images/sort-up.svg';
import { ReactComponent as ArrowDown } from '../../images/sort-down.svg';

import './ReposList.css';

@observer
class ReposList extends Component {
  componentDidMount() {
    const { store } = this.props;
    const { filters } = this.props.store;
    store.fetchReposList(filters);
    store.fetchLanguagesList();
  }

  render(){
    const { store } = this.props;
    const  { list, languages, filters, hasFetchError } = this.props.store;
    return (
      <div className="RepoList">
        <FiltersPanel
          currentFilters={filters}
          languagesList={languages}
          triggerFilterSince={(e) => store.updateSinceFilters(e)}
          triggerFilterLng={(e) => store.updateLngFilters(e)}
        />
        <Table>
        <thead>
          <tr>
            <th className="col-20">
              <div className="flex-container">
                <p className="th-center th-text">Liczba gwiazdek</p>
                <div className="sort-container">
                  <ArrowUp className="arrows-img" onClick={(e) => store.handleSortByStarsNumberUp(e)} />
                  <ArrowDown className="arrows-img" onClick={(e) => store.handleSortByStarsNumberDown(e)}/>
                </div>
              </div>
            </th>
            <th>
              <p className="th-center th-text">Autor</p>
            </th>
            <th>
              <p className="th-center th-text">URL</p>
            </th>
            <th>
              <p className="th-center th-text">Opis</p>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => <ItemList key={item.url} item={item} />)}
        </tbody>
        </Table>
        {!list.length && !hasFetchError && (
          <div className="no-data-container flex-container">
            <p>Nie znaleziono wyników zgodnych z wybranymi filtrami. </p>
          </div>
        )}
         {hasFetchError && (
          <div className="error-container flex-container">
            <p>Wystapił problem techniczny. Odśwież stronę lub spróbuj póżniej</p>
          </div>
        )}
      </div>
    );
  }
}

export default ReposList;
