// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui-icons/ArrowBack';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import styles from './DetailPage.css';
import * as NetworkActions from '../actions/network';
import type { itemType } from "../reducers/network";

const clipboard = require('electron').clipboard

type Props = {
  fetchDetail: (category: string, id: string) => void,
  data: {},
  location: {},
};

class DetailPage extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = { page: 1 };
  }
  handleClick(magnent,e) {
    clipboard.writeText(magnent)
  }
  componentWillMount() {
    const { id, category } = this.props.match.params;
    if (this.props.data[category].byId[id].detail === undefined)
      this.props.fetchDetail(category, id);
  }

  render() {
    const { id, category } = this.props.match.params;
    const item: itemType = this.props.data[category].byId[id]
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Link to="/">
              <IconButton aria-label="Menu">
                <ArrowBack/>
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
              <CircularProgress style={{ color: 'white' }} thickness={7}/>
            </div> : this.renderContent(item)
          }
        </div>
      </div>
    );
  }

  renderContent(item) {

    return (
      <div>
        {item.detail.magnent!==''?
        <Card className={styles.card}>
          <CardContent className={styles.magnentContent}>{item.detail.magnent}
            <Button color="primary" onClick={this.handleClick.bind(this,item.detail.magnent)}>
              复制
            </Button></CardContent>
        </Card>:<div/>
        }
        <div className={styles.contentCard} dangerouslySetInnerHTML={{ __html: item.detail.content }}
        />
      </div>)
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

