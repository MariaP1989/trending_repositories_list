import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { observer } from 'mobx-react';

import ItemList from './ListItem/ListItem';
import { ReactComponent as ArrowUp } from '../../images/sort-up.svg';
import { ReactComponent as ArrowDown } from '../../images/sort-down.svg';

import './ReposList.css';

@observer
class ReposList extends Component {
  componentDidMount() {
    this.fetchReposList();
  }

  fetchReposList = () => {
    const { store } = this.props;
    axios.get('https://private-anon-1cb86096e1-githubtrendingapi.apiary-proxy.com/repositories', {
      params: {
        since: store.filters.since,
        language: store.filters.language,
      }
    })
    .then(function (response) {
      store.setListData(response.data);
    })
    .catch(function () {
      store.toggleError(true);
    });
  }

  render(){
    const { store } = this.props;
    const  { list } = this.props.store;
    return (
      <div className="RepoList"> 
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
      </div>
    );
  }
}

export default ReposList;
