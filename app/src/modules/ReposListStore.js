import { observable, action, runInAction } from "mobx";
import axios from 'axios';

export default class ReposListModel {
  @observable hasFetchError = false;
  @observable fetchPending = false;
  @observable  list = [];
  @observable languages = [];
  @observable filterDESC = false;
  @observable filterASC = false;
  @observable filters = {
    since: 'daily',
    language: ''
  }

  @action fetchReposList = (filters) => {
    this.fetchPending = true;
    axios.get('https://private-anon-1cb86096e1-githubtrendingapi.apiary-proxy.com/repositories', {
      params: {
        since: filters.since,
        language: filters.language,
      }
    }).then(response => {
      runInAction(() => {
        this.list = response.data;
        this.hasFetchError = false;
        this.fetchPending = false;
      })
    }).catch(() => {
      runInAction(() => {
        this.hasFetchError = true;
        this.fetchPending = false;
      });
    });
  }

  @action fetchLanguagesList = () => {
    axios.get('https://private-anon-1cb86096e1-githubtrendingapi.apiary-proxy.com/languages').then(response => {
      runInAction(() => {
        this.languages = response.data;
        this.hasFetchError = false;
      })
    }).catch(() => {
      runInAction(() => {
        this.hasFetchError = true;
      });
    });
  }

  @action handleSortByStarsNumberUp = (e) => {
    e.currentTarget.style.fill = '#ffc100';
    const arrowDown = document.querySelector('#arrowDown');
    arrowDown.style.fill = 'black';
    this.list = this.list.slice().sort((a, b) => a.stars - b.stars);
  }

  @action handleSortByStarsNumberDown = (e) => {
    e.currentTarget.style.fill = '#ffc100';
    const arrowUp = document.querySelector('#arrowUp');
    arrowUp.style.fill = 'black';
    this.list = this.list.slice().sort((a, b) => b.stars - a.stars);
  }

  @action updateSinceFilters = (e) =>  {
    this.filters.since = e.currentTarget.value;
    this.fetchReposList(this.filters);
  }

  @action updateLngFilters = (lng) =>  {
    this.filters.language = lng;
    this.fetchReposList(this.filters);
  }

  @action updateFilters = (filters) => {
    this.filters = filters;
  }
}
