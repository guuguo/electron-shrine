import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NetworkActions from '../actions/network';
import FullWidthTabs from './ShrineTabsPage';

function mapStateToProps(state) {
  return {
    data: state.shrineData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NetworkActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FullWidthTabs);
