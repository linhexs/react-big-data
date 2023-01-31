// 时间分片
import React, { useState, CSSProperties } from "react";
import { getColor, getPostion } from "@/utils/util";
import type { Size } from "@/types/list";

interface StateTypes {
  renderList: JSX.Element[];
  dataList: number[];
  position: Size;
  eachRenderNum: number;
}

/* 色块组件 */
function Circle({ position }: { position: Size }) {
  const style: CSSProperties = React.useMemo(() => {
    return {
      background: getColor(),
      position: "absolute",
      width: "20px",
      height: "20px",
      ...getPostion(position),
    };
  }, [position]);
  return <div style={style} className="circle" />;
}

class Index extends React.Component {
  state: StateTypes = {
    dataList: [], //数据源列表
    renderList: [], //渲染列表
    position: { width: 0, height: 0 }, // 位置信息
    eachRenderNum: 500, // 每次渲染数量
  };

  wrapperRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.wrapperRef.current) {
      const { offsetHeight, offsetWidth } = this.wrapperRef.current;
      const originList = new Array(20000).fill(1);
      // 计算需要渲染次数
      const times = Math.ceil(originList.length / this.state.eachRenderNum);
      let index = 1;
      this.setState(
        {
          dataList: originList,
          position: { height: offsetHeight, width: offsetWidth },
        },
        () => {
          this.toRenderList(index, times);
        }
      );
    }
  }

  toRenderList = (index: number, times: number) => {
    if (index > times) return; /* 如果渲染完成，那么退出 */
    const { renderList } = this.state;
    renderList.push(this.renderNewList(index));
    this.setState({
      renderList,
    });
    // // 浏览器空闲执行下一批渲染
    requestIdleCallback(() => {
      this.toRenderList(++index, times);
    });
  };

  renderNewList(index: number) {
    /* 得到最新的渲染列表 */
    const { dataList, position, eachRenderNum } = this.state;
    const list = dataList.slice(
      (index - 1) * eachRenderNum,
      index * eachRenderNum
    );
    return (
      <React.Fragment key={index}>
        {list.map((_, listIndex) => (
          <Circle key={listIndex} position={position} />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "100vh", position: "relative" }}
        ref={this.wrapperRef}
      >
        {this.state.renderList}
      </div>
    );
  }
}

export default () => {
  const [show, setShow] = useState(false);
  const [btnShow, setBtnShow] = useState(true);

  const handleClick = () => {
    setBtnShow(false);
    setTimeout(() => {
      setShow(true);
    }, 0);
  };

  return (
    <div>
      {btnShow && <button onClick={handleClick}>展示效果</button>}
      {show && <Index />}
    </div>
  );
};
