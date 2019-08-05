import React, { Component } from 'react';
import { CustomInput, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

import './FiltersPanel.css';

const checkboxProps = {
  daily: {
    className:"since-checkbox",
    type:"checkbox",
    value:"daily",
    label:"Dzienie"
  },
  weekly: {
    className: "since-checkbox",
    type:"checkbox",
    value:"weekly",
    label:"Tygodniowo"
  },
  monthly: {
    className: "since-checkbox",
    type:"checkbox",
    value:"monthly",
    label: "Miesięcznie"
  }
}

@observer
class FiltersPanel extends Component {
  @observable isOpen = false;
  @observable currentLngName = '';

  @action updateLng = (e) => {
    const { triggerFilterLng } = this.props;
    this.currentLngName = e.currentTarget.getAttribute('data-name');
    triggerFilterLng(e.currentTarget.getAttribute('data-url'))
  }

  @action toggle() {
    this.isOpen = !this.isOpen;
  };

  render(){
    const { currentFilters, triggerFilterSince, languagesList } = this.props;

    return (
      <div className="filters-container">
        <div className="filters-since">
          <CustomInput
            id="daily"
            checked={currentFilters.since === 'daily'}
            onChange={triggerFilterSince}
            {...checkboxProps.daily}
          />
          <CustomInput
            id="weekly"
            checked={currentFilters.since === 'weekly'}
            onChange={triggerFilterSince}
            {...checkboxProps.weekly}
          />
          <CustomInput
            id="monthly"
            checked={currentFilters.since === 'monthly'}
            onChange={triggerFilterSince}
            {...checkboxProps.monthly}
          />
        </div>
        <div className="filters-lng">
          <ButtonDropdown direction="down" isOpen={this.isOpen} toggle={() => this.toggle()}>
            <DropdownToggle className="dropdown-toggle" color="primary" caret>
              {this.currentLngName ? this.currentLngName : 'Wybierz język programownia'}
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu">
              <DropdownItem
                data-url=''
                data-name='Wybierz'
                onClick={(e) => this.updateLng(e)}
              >
                Wszystkie  
              </DropdownItem>
              {languagesList.map(item => (
                <DropdownItem
                  key={item.urlParam}
                  data-url={item.urlParam}
                  data-name={item.name}
                  onClick={(e) => this.updateLng(e)}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    )
  }
}

export default FiltersPanel;
