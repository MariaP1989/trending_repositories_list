import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { observer } from 'mobx-react';

import ItemList from './ListItem/ListItem';

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
    const  { list } = this.props.store;
    return (
      <div className="RepoList"> 
        <Table>
        <thead>
          <tr>
            <th className="col-20 th-text">
              Liczba gwiazdek
            </th>
            <th className="th-center th-text">Autor</th>
            <th className="th-center th-text">URL</th>
            <th className="th-center th-text">Opis</th>
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
