import { observable, action } from "mobx";

export default class ReposListModel {
  @observable hasFetchError = false;
  @observable  list = [];
  @observable filterDESC = false;
  @observable filterASC = false;
  @observable filters = {
    since: 'daily',
    language: ''
  }

  @action setListData = (data) => {
    this.list = data;
  }

  @action toggleError = (value) => {
    this.hasFetchError = value;
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
}
