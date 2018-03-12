// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NetworkActions from '../actions/network';
import { itemType } from '../reducers/network';
import styles from './DetailPage.css';

type Props = {
  fetchDetail: (category: string, id: string) => void,
  data: {},
  location: {}
};

class DetailPage extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = { page: 1 };
  }

  componentWillMount() {
    const { id, category } = this.props.location.param;
    this.props.fetchDetail(category, id);
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ maxWidth: 800, margin: 'auto' }}>{this.props}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.shrineData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NetworkActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);

