import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import ContentPage from './ContentPage';

export const categories = {
  动画: 'anime', 文章: 'age', 漫画: 'comic', 游戏: 'game', 音乐: 'op', 轻小说: 'book'
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'absolute',
    top: 50,
    bottom: 10,
    left: 10,
    right: 10,
  }
});
type shrineTabsProps = {
  classes: {},
  theme: {},
  fetchHome: (page: number, category: string) => void,
  addData: () => void,
  data: {}
};

class ShrineTabsPage extends React.Component<shrineTabsProps> {
  props: shrineTabsProps
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {Object.keys(categories).map(it => (<Tab
              key={`t${it}`}
              style={{ width: 100 }}
              label={it}
            />))}
          </Tabs>
        </AppBar>
        <div className={classes.content}>
          <ContentPage
            key={`t${this.state.value}`}
            fetchHome={this.props.fetchHome}
            addData={this.props.addData}
            category={categories[Object.keys(categories)[this.state.value]]}
            data={this.props.data}
            dir={theme.direction}
          />
        </div>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(ShrineTabsPage);
