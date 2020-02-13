import React from "react";
import RGL, { WidthProvider, Responsive, GridItem } from "react-grid-layout";
import * as MyComponent from '.';
import _ from "lodash";
import '../../CardGrid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class CardGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    //  isDragable: this.props.isEditingCard,
     // isResizable: this.props.isEditingCard,
      items: this.props.items,
      isDraggable: false,
      isResizable: false,
    };
  }
  static defaultProps = {
    className: "layout",
    cols: { lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 },
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // cols: ,
    rowHeight: 200,
    onLayoutChange: function() {},
  };

  componentDidMount () {
    setTimeout(() => {
      const evt = document.createEvent('UIEvents');
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    }, 301);
  }

  componentWillReceiveProps (props) {
    this.setState({
      isEditingCard: props.isEditingCard,
      items:props.items
    })
  }

  createElement = (el, index) => {
    const {isEditingCard} = this.props;
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    if (el.type === 'component') {
      // console.log(el.id, el.component);
    }
    if (el.y == null) {
      el.y = Infinity;
    }
   // console.log("dfdfdfdf", e1.type)
    
    return (
     
      <div key={index} data-grid={el}>
        {el.type === 'component' ? (<div className="component">{React.createElement(MyComponent[el.value], {})}</div>) : (
          <span className="text">{el.value}</span>
        )}
        {!!isEditingCard && <span
          className="remove"
          style={removeStyle}
          onClick={() => this.props.onRemoveItem(el.id)}
        >
          x
        </span>}
      </div>
    );
  };

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    // this.setState({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  };

  onLayoutChange = (layout) => {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  };

  render() {
    return (
      <ResponsiveReactGridLayout
        useCSSTransforms={false}
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        isDraggable={this.state.isEditingCard}
        //isResizable={this.state.isEditingCard}

        {...this.props}
      >
        {_.map(this.state.items, (el, index) => this.createElement(el, index))}
      </ResponsiveReactGridLayout>
    );
  }
}
