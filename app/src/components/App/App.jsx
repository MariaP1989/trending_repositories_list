import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReposList from '../ReposList/ReposList';
import ListStore from '../../modules/ReposListStore';
import './App.css';

const storeForList = new ListStore();

const App = () => (
  <Container fluid>
    <Row>
      <Col
        className="CenteredCol"
        sm={{ size: 10, offset: 1 }}
      >
        <ReposList store={storeForList} />
      </Col>
    </Row>
  </Container>
);

export default App;
