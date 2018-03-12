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
    const category = this.props.data[this.props.category];
    if (category === undefined || category.page === undefined) {
      this.props.fetchHome(this.state.page, this.props.category);
    }
    // this.props.addData([{
    //   id: '12123',
    //   title: 'sdaasdd',
    //   date: '12-12',
    //   content: '',
    //   author: 'guuguo',
    //   image: 'https://ww1.sinaimg.cn/large/005zWjpngy1fp99xvmhfej30zk0k0761.jpg',
    //   tags: ['1', '2'],
    // }], this.props.category, 1);
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
      <List style={{ maxWidth: 800, margin: 'auto' }}>
        {
          categoryItem.allIds.map((itemId) => {
          const item: itemType = categoryItem.byId[itemId];
          return (
            <Link to={`/detail/${this.props.category}/${itemId}`}>
              <div className={styles.item} style={{ margin: 0 }} >
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
              </div>
            </div>
            </Link>
          );
        })
        }
      </List>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContentPage);

