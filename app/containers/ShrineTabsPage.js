import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import ContentPage from './ContentPage';

export const categories = {
  anime: '动画', age: '文章', comic: '漫画', game: '游戏', op: '音乐', book: '轻小说'
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
    overflowY: 'hidden',
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
  saveCategoryState: () => void,
  saveCategoryOffset: () => void,
  fetchDetail:()=>void,
  data: {},
  history:{}
};

class ShrineTabsPage extends React.Component<shrineTabsProps> {
  props: shrineTabsProps
  state = {};

  handleChange = (event, value) => {
    this.props.saveCategoryState(value);
  };


  render() {
    const { data, classes, theme } = this.props;
    let currentCategory = data.currentCategory;
    if (currentCategory === undefined) {
      currentCategory = 0;
    }
    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position="static" color="default">
          <Tabs
            value={currentCategory}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {Object.keys(categories).map(it => (<Tab
              key={`t${it}`}
              style={{ widthsaveCategoryStatesaveCategoryState: 100 }}
              label={categories[it]}
            />))}
          </Tabs>
        </AppBar>
        <div className={classes.content}>
          <ContentPage
            key={currentCategory}
            fetchHome={this.props.fetchHome}
            addData={this.props.addData}
            category={Object.keys(categories)[currentCategory]}
            saveCategoryOffset={this.props.saveCategoryOffset}
            fetchDetail={this.props.fetchDetail}
            history={this.props.history}
            data={this.props.data}
            dir={theme.direction}
          />
        </div>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(ShrineTabsPage);
