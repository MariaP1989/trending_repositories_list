import React from 'react';
import { observer } from 'mobx-react';
import { ReactComponent as Star } from '../../../images/star.svg';

import './ListItem.css';

const listItem = observer(({item}) => (
  <tr className="tr mouse-ponter">
    <td className="td-starts td-center-content">
      {item.stars || '-'}
      <Star className="star-img" />
    </td>
    <td className="td-center fw-bold">{item.author || '-'}</td>
    <td className="td-center">
      <a href={item.url} target="blank">{item.url || '-'}</a>
    </td>
    <td>{item.description || '-'}</td>
    <td className="td-center">
      {item.avatar && <img className="avatar-img" src={item.avatar} alt="None avatar" />}
    </td>
  </tr>
));

export default listItem;
