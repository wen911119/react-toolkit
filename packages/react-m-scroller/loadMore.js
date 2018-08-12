import React, { PureComponent, cloneElement } from "react";

const DefaultFooter = ({ nomore }) => (
  <div style={{ lineHeight: "50px", textAlign: "center", fontSize: "14px" }}>
    {nomore ? "没有更多了～" : "正在加载中..."}
  </div>
);

export default class LoadMore extends PureComponent {
  resetLoadMore() {
    this.setState({ nomore: false });
  }
  constructor(props) {
    super(props);
    if (props.loadMoreFooter) {
      this.renderFooter = nomore => () => (
        <props.loadMoreFooter nomore={nomore} />
      );
    } else {
      this.renderFooter = nomore => () => <DefaultFooter nomore={nomore} />;
    }
    this.resetLoadMore = this.resetLoadMore.bind(this);
    this.onLoading = false;
    this.state = {
      nomore: false
    };
  }
  componentDidUpdate() {
    if (
      this.props.position === "bottom" &&
      !this.state.nomore &&
      !this.onLoading
    ) {
      // 触发loadmore
      if (this.props.onLoadMore) {
        this.onLoading = true;
        const p = new Promise(resolve => {
          this.props.onLoadMore(resolve);
        });
        p.then(nomore => {
          this.props.recomputeLayout && this.props.recomputeLayout();
          this.setState({ nomore: !!nomore }, () => {
            this.onLoading = false;
          });
        });
      } else {
        console.warn("需要提供onLoadMore方法");
      }
    }
  }
  render() {
    const {
      children,
      contentHeight,
      containerHeight,
      ...otherProps
    } = this.props;
    const { nomore } = this.state;
    return cloneElement(children, {
      ...otherProps,
      resetLoadMore: this.resetLoadMore,
      footer: contentHeight > containerHeight && this.renderFooter(nomore) // 内容大于一屏才显示footer
    });
  }
}
