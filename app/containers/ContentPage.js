// @flow
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
import Button from 'material-ui/Button';
import LinkIcon from 'material-ui-icons/Link';
import { Link } from 'react-router-dom';
import { itemType } from '../reducers/network';
import styles from './Contentpage.css';

type Props = {
  fetchHome: (page: number, category: string) => void,
  fetchDetail: (category: string, id: string) => void,
  addData: (items: itemType[], category: string, page: number) => void,
  saveCategoryOffset: (category: string, page: number) => void,
  data: {},
  category: string,
  classes: {},
  theme: {}
};

class ContentPage extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {};
  }

  page = 1
  container = null;
  isLoad = false
  hasData = false;
  isScrollBottom = false;

  componentWillMount() {
    console.log('mount')
    this.fetchData();
  }

  componentDidMount() {
    this.applyOffset();
    if (this.container) {
      this.container.addEventListener('scroll', this.onScrollHandle.bind(this));
    }
  }

  applyOffset() {
    if (this.hasData) {
      const category = this.props.data[this.props.category]
      if (category.offset !== undefined) {
        this.container.scrollTop = category.offset
      } else {
        this.container.scrollTop = 0
      }
    }
  }

  updateOffsetData() {
    if (this.hasData) {
      const category = this.props.data[this.props.category]
      if (category.offset === undefined)
        category.offset = 0
      if (this.container.scrollTop !== category.offset)
        this.props.saveCategoryOffset(this.props.category, this.container.scrollTop)
    }
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    this.updateOffsetData();
    if (this.container) {
      this.container.removeEventListener('scroll', this.onScrollHandle.bind(this));
    }
  }

  onScrollHandle(event) {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const isBottom = (clientHeight + scrollTop >= scrollHeight - 40)
    if (this.isScrollBottom !== isBottom) {
      this.isScrollBottom = isBottom
      if (isBottom && !this.isLoad) {
        this.page++
        this.fetchData()
      }
    }
  }

  fetchData() {
    this.isLoad = true
    this.props.fetchHome(this.page, this.props.category);
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

  handleUrlButtonClick(e, item) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
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

    this.hasData = categoryItem !== undefined;
    return (
      <div id='container' ref={c => this.container = c} className={styles.container}>
        {categoryItem === undefined ?
          <div className={styles.progressContainer}>
            <CircularProgress className={classes.progress} style={{ color: 'white' }} thickness={7}/>
          </div>
          : this.renderList(categoryItem)}
      </div>
    );
  }

  renderList(categoryItem) {
    if (categoryItem.page === this.page)
      this.isLoad = false
    return <List style={{ maxWidth: 800, margin: 'auto' }}>
      {
        categoryItem.allIds.map((itemId) => {
          const item: itemType = categoryItem.byId[itemId];
          return (
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
              <Link className={styles.navLink} to={`/detail/${this.props.category}/${itemId}`}>
              </Link>
              <div className={styles.iconButton}>
                <Button
                  className={styles.absolute}
                  variant="fab"
                  color="inherit"
                  onClick={this.handleUrlButtonClick.bind(this, item)}
                >
                  <LinkIcon/>
                </Button>
              </div>

            </div>
          );
        })
      }
      <div className={styles.bottomProgress}>
        <CircularProgress style={{ color: 'white' }} thickness={4} size={30}/>
      </div>
    </List>;
  }
}

export default withStyles(styles, { withTheme: true })
(
  ContentPage
);

