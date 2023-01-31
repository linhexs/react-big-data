import React, { useState, CSSProperties } from "react";
import { getColor, getPostion } from "@/utils/util";
import type { Size } from "@/types/list";

interface StateTypes {
  renderList: JSX.Element[];
  dataList: number[];
  position: Size;
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
    dataList: [],
    renderList: [],
    position: { width: 0, height: 0 }, // 位置信息
  };

  wrapperRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.wrapperRef.current) {
      const { offsetHeight, offsetWidth } = this.wrapperRef.current;
      const originList = new Array(20000).fill(1);
      this.setState({
        position: { height: offsetHeight, width: offsetWidth },
        dataList: originList,
        renderList: originList,
      });
    }
  }
  render() {
    const { renderList, position } = this.state;
    return (
      <div
        ref={this.wrapperRef}
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >
        {renderList.map((_item, index) => (
          <Circle position={position} key={index} />
        ))}
      </div>
    );
  }
}

const DefaultDrawing: React.FC = () => {
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

export default DefaultDrawing;
