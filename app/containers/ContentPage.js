// @flow
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';
import { itemType } from '../reducers/network';
import styles from './Contentpage.css';

type Props = {
  fetchHome: (page: number, dataType: string) => void,
  addData: (items: itemType[], category: string, page: number) => void,
  data: {},
  category: string,
  classes: {}
};

class ContentPage extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = { page: 1 };
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    this.fetchData();
  }
  componentWillUnmount() {
  }

  fetchData() {
    const category = this.props.data[this.props.category];
    if (category === undefined || category.page === undefined) {
      this.props.fetchHome(this.state.page, this.props.category);
    }
  }

  renderArticalContent(item) {
    return (
      <div className={styles.itemContent} style={{ margin: 0 }}>
        <div className={styles.tags}>
          {item.tags.map(it => (<div className={styles.tag}><span>{it}</span></div>))}
        </div>
        <div className={styles.articalTitle}>{item.author} · {item.date}</div>
        <div
          className={styles.articalCaption}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>);
  }

  renderImageContent(item) {
    return (
      <div className={styles.itemContent} style={{ margin: 0 }}>
        <div className={styles.tags}>
          {item.tags.map(it => (<div className={styles.tag}><span>{it}</span></div>))}
        </div>
        <div className={styles.title}>{item.author} · {item.date}</div>
        <div className={styles.content}>
          {item.title}
        </div>
        <div
          className={styles.caption}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>);
  }

  render() {
    const { data, classes } = this.props;
    const categoryItem = data[this.props.category];
    if (categoryItem === undefined) {
      return (
        <div className={styles.progressContainer}>
          <CircularProgress className={classes.progress} style={{ color: 'white' }} thickness={7}/>
        </div>);
    }
    return (
      <div className={styles.container}>
        <List style={{ maxWidth: 800, margin: 'auto' }}>
          {
            categoryItem.allIds.map((itemId) => {
              const item: itemType = categoryItem.byId[itemId];
              return (
                <Link key={itemId} to={`/detail/${this.props.category}/${itemId}`}>
                  <div className={styles.item} style={{ margin: 0 }}>
                    <img
                      alt=""
                      className={styles.image}
                      src={item.image}
                      width="100%"
                    />
                    <span
                      className={styles.cover}
                      style={{
                        backgroundColor: 'rgba(0,0,0,.5)',
                        backgroundSize: '100%'
                      }}
                    />
                    {item.image === '' ?
                      this.renderArticalContent(item) :
                      this.renderImageContent(item)
                    }
                  </div>
                </Link>
              );
            })
          }
        </List>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContentPage);

