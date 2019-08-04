import { observable, action } from "mobx";

export default class ReposListModel {
  @observable hasFetchError = false;
  @observable  list = [];
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
}
