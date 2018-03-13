// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui-icons/ArrowBack';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { clipboard, shell } from 'electron';
import Slide from 'material-ui/transitions/Slide';
import styles from './DetailPage.css';
import * as NetworkActions from '../actions/network';
import type { itemType } from '../reducers/network';


type Props = {
  fetchDetail: (category: string, id: string) => void,
  data: {},
  match: {}
};

function TransitionDown(props) {
  return <Slide direction="down" {...props} />;
}

class DetailPage extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = { showSnack: false, message: '' };
  }

  handleCopyClick(magnent, e) {
    clipboard.writeText(magnent);
    this.setState({ showSnack: true, message: `${magnent} 已复制到剪贴板` });
    setTimeout(() => this.setState({ showSnack: false }), 1000);
  }

  handleOpenClick(url, e) {
    shell.openExternal(url);
  }
  componentWillMount() {
    const { id, category } = this.props.match.params;
    if (this.props.data[category].byId[id].detail === undefined) {
      this.props.fetchDetail(category, id);
    }
  }

  render() {
    const { id, category } = this.props.match.params;
    const item: itemType = this.props.data[category].byId[id];
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Link to="/">
              <IconButton aria-label="Menu">
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography variant="title" color="inherit">
              {item.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.content}>
          {item.detail === undefined ?
            <div className={styles.progressContainer}>
              <CircularProgress style={{ color: 'white' }} thickness={7} />
            </div> : this.renderContent(item)
          }
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.showSnack}
          onClose={this.handleClose}
          transition={TransitionDown}
          message={<span>{this.state.message}</span>}
        />
      </div>
    );
  }

  renderContent(item) {
    return (
      <div>
        {this.renderCopyContent(item.detail.magnent)}
        {this.renderCopyContent(item.detail.baidupan, false)}
        <div
          className={styles.contentCard}
          dangerouslySetInnerHTML={{ __html: item.detail.content }}
        />
      </div>);
  }

  renderCopyContent(str, isCopy = true) {
    return str !== '' ?
      <Card className={styles.card}>
        <CardContent className={styles.magnentContent}>{str}
          <Button
            color="primary"
            onClick={isCopy ? this.handleCopyClick.bind(this, str)
              : this.handleOpenClick.bind(this, str)}
          >
            {isCopy ? '复制' : '打开'}
          </Button>
        </CardContent>
      </Card> : <div />;
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

