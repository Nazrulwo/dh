import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import '../../App.css';
import CardGrid from "./CardGrid";
import _ from "lodash";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { NavigationBar } from '../Nav/NavigationBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveAction } from '../../actions';
import logo from '../../images/logo.png';
import save from '../../images/save.png';
import plusTab from '../../images/plusTab.png';
import Trans from './Trans';
import { translateCell } from './Trans';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const delay = 350;

class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    const saveUser = props.saveUser;
    const saveUser1 = localStorage.getItem("savedData3");
    this.changeCategory = this.changeCategory.bind(this);
    console.log(saveUser1);
    let realUser = "";
    if (saveUser1) {
      realUser = saveUser1;
    } else {
      realUser = JSON.stringify(this.props.saveUser);
    }
    console.log("rerererer", realUser);
    console.log(JSON.parse(realUser));
    this.state = {
      topbarVisible: true,
      sidebarVisible: true,
      isMouseInTop: false,
      tabsKey: Math.random(),
      items: JSON.parse(realUser).items,
      currentTabIndex: 0,
      tabs: JSON.parse(realUser).tabs,
      newCounter: 0,
      isEditingCard: false,
      showWidgets: false,
      showTopWidgets: true,
      linkSearch: '',
      hideNav: false,
      category: "1",
      changeColor: localStorage.getItem('changeColor'),
      changeSide: localStorage.getItem('changeSide'),
      sidebarPosition: localStorage.getItem('sidebarPosition')
    }
  };


  sideLinks = [
    { name: 'Dashboard', type: 'component', value: 'Component1', category: 1 },
    { name: 'Händelselista', type: 'component', value: 'Component2', category: 1 },
    { name: 'Rättidighet', type: 'component', value: 'Component3', category: 1 },
    { name: 'Notice', type: 'component', value: 'Component9', category: 1 },
    { name: 'Simulering', type: 'component', value: 'Component5', category: 1 },
    { name: 'Form', type: 'component', value: 'Component5', category: 1 },
    { name: 'Personal', type: 'component', value: 'Component7', category: 1 },
    { name: 'Rättidighet', type: 'component', value: 'Component3', category: 1 },
    { name: 'Notice', type: 'component', value: 'Component9', category: 1 },
    { name: 'Simulering', type: 'component', value: 'Component5', category: 1 },
    { name: 'Form', type: 'component', value: 'Component5', category: 1 },
    { name: 'Personal', type: 'component', value: 'Component7', category: 1 },
    { name: 'Resenärslistan', type: 'component', value: 'Component8', category: 2 },
    { name: 'Beslut', type: 'component', value: 'Component3', category: 2 },
    { name: 'Analys', type: 'component', value: 'Component1', category: 2 },
    { name: 'Övergångar', type: 'component', value: 'Component6', category: 2 },
    { name: 'Resenärslistan', type: 'component', value: 'Component8', category: 2 },
    { name: 'Personal', type: 'component', value: 'Component7', category: 3 },
    { name: 'Simulering', type: 'component', value: 'Component5', category: 3 },
    { name: 'Rättidighet', type: 'component', value: 'Component2', category: 3 },
    { name: 'Övergångar', type: 'component', value: 'Component6', category: 3 },
    { name: 'Cities', type: 'component', value: 'Component8', category: 3 },
    { name: 'Personal', type: 'component', value: 'Component5', category: 3 },
    { name: 'Analys', type: 'component', value: 'Component1', category: 4 },
    { name: 'Övergångar', type: 'component', value: 'Component3', category: 4 },
    { name: 'Cities', type: 'component', value: 'Component8', category: 4 },
    { name: 'Personal', type: 'component', value: 'Component7', category: 4 },
    { name: 'Simulering', type: 'component', value: 'Component5', category: 4 },
  ];
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
    document.title = 'My Account';
  }

  resize = () => {
    let currentHideNav = (window.innerWidth <= 992);
    if (currentHideNav !== this.state.hideNav) {
      this.setState({
        hideNav: currentHideNav,
        sidebarVisible: !currentHideNav,
      });
    }
  };

  toggleTopbar = () => {
    this.setState({
      topbarVisible: !this.state.topbarVisible,
    });
    setTimeout(window.dispatchEvent, delay, new Event('resize'));
  };

  toggleSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible,
    });
    setTimeout(window.dispatchEvent, delay, new Event('resize'));
  };
  toggleAll = () => {
    this.setState({
      topbarVisible: !this.state.topbarVisible,
      sidebarVisible: !this.state.sidebarVisible,
    });
    setTimeout(window.dispatchEvent, delay, new Event('resize'));
  };

  onMouseMove = (e) => {
    if (e.clientY < 20) {
      this.setState({
        isMouseInTop: true,
      });
    } else if (e.clientY > 100) {
      this.setState({
        isMouseInTop: false,
      });
    }
  };

  onMouseLeave = (e) => {
    console.log('Mouse Leaving');
    this.setState({
      isMouseInTop: false,
    });
  };

  onCurrentTabChanged = (index) => {
    let { tabs, items } = this.state;
    if (tabs.length === index) {
      index--;
    }
    this.setState({
      currentTabIndex: index,
    });
  };

  onAddTab = () => {
    let { tabs, items } = this.state;
    if (tabs.length < 6) {
      var tabindex;
      switch (tabs.length) {
        case 1: tabindex = 'Sök Tåg'; break;
        case 2: tabindex = 'Välj Tåg'; break;
        case 3: tabindex = 'Stor Analys'; break;
        case 4: tabindex = 'Plats och Tid'; break;
        case 5: tabindex = 'Händelse Lista'; break;
      }
      tabs.push({
        id: Math.random(),
        name: tabindex,
      });
      items.push([

      ]);

      this.setState({
        tabs: tabs,
        items: items,
        currentTabIndex: tabs.length - 1,
      });
      console.log('onAddTab', tabs.length);
    }
    else {
      alert('you can not add tab more');
    }
  }
  onAddTab1 = (e) => {
    let { tabs, items } = this.state;
    if (tabs.length < 6) {
      var tabindex;
      switch (e) {
        case 1: tabindex = 'Sök Tåg'; break;
        case 2: tabindex = 'Välj Tåg'; break;
        case 3: tabindex = 'Stor Analys'; break;
        case 4: tabindex = 'Plats och Tid'; break;
        case 5: tabindex = 'Händelse Lista'; break;
      }
      tabs.push({
        id: Math.random(),
        name: tabindex,
      });
      items.push([

      ]);

      this.setState({
        tabs: tabs,
        items: items,
        currentTabIndex: tabs.length - 1,
      });
      console.log('onAddTab', tabs.length);
    }
    else {
      alert('you can not add tab more');
    }
  }
  onCloseTab = (index) => {
    let { tabs, items } = this.state;
    tabs.splice(index, 1);
    items.splice(index, 1);
    // items = _.remove(items, index);
    this.setState({
      tabs: tabs,
      items: items,
    });
    console.log(index, JSON.stringify(tabs), JSON.stringify(items));
  };

  onAddItem = (type, value) => {
    const { currentTabIndex, items } = this.state;
    console.log(value, items);
    items[currentTabIndex].push({
      id: Math.random(),
      type: type,
      value: value,
      x: (this.state.items[currentTabIndex].length) % 3,
      y: Infinity, // puts it at the bottom
      w: 1,
      h: 2,
    });
    this.setState({
      tabsKey: Math.random(),
      items: items
    });
  };

  onRemoveItem = (id) => {
    let { items, currentTabIndex } = this.state;
    items[currentTabIndex] = _.reject(items[currentTabIndex], { id: id })
    this.setState({ items });
  };

  onEditClicked = () => {
    console.log("sfdsdfs");
    let flag = this.state.isEditingCard;
    let items = this.state.items;
    let currentTab = this.state.currentTabIndex;
    console.log(items);
    console.log(this.state.currentTab);
    items[currentTab].map((item) => {
      item.isDraggable = flag;
      item.isResizable = flag;
    });

    this.setState({
      isEditingCard: !flag,
      items: items
    });
  };

  onShowMore = (e) => {
    this.setState({
      showAllLink: e,
    });
  };

  onMore = (e) => {
    this.setState({
      showWidgets: !e,
      showTopWidgets: e,
    });
  };

  onLinkSearchChanged = (e) => {
    const text = e.target.value;
    // console.log('onLinkSearchChanged', text);
    this.setState({
      linkSearch: text,
    });
  };

  saveUser = () => {
    let {
      items,
      tabs,
      // userrole
    } = this.state;
    let saveUser = {
      items: items,
      tabs: tabs,
      // userrole: userrole,
    }
    this.props.SaveActions.saveAction(saveUser);
    console.log("saveState", saveUser);
    localStorage.setItem("savedData3", JSON.stringify(saveUser));
    console.log("saveuser", saveUser);
    alert('Saved!')
  }
  changeCategory(e) {
    this.setState({
      category: e.target.value
    })
    console.log(e.target.value);
  }
  render() {
    const { sideLinks, category } = this;
    const { topbarVisible, sidebarVisible, isMouseInTop, tabsKey, tabs, showTopWidgets, showWidgets, currentTabIndex, items, isEditingCard, showAllLink, linkSearch } = this.state;
    const { user, users } = this.props;
    const searchedLink = _.filter(sideLinks, (item) => {
      if (linkSearch != "") {
        const res = item.name.toLowerCase().search(linkSearch.toLowerCase()) >= 0
        return res;
      } else {
        const res = item.name.toLowerCase().search(linkSearch.toLowerCase()) >= 0 && item.category == this.state.category;
        return res;
      }

    });
    console.log("props", this.props);
    return (
      <Grid container onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave} className={this.state.changeColor}>
        <Grid item lg={12} id={"toggle"} className={topbarVisible ? '' : (isMouseInTop ? '' : 'toggle-full-mode')}
          onClick={this.toggleAll}></Grid>
        <Grid container id={"topBar"} className={topbarVisible ? "" : "topBar-hide"}>
          <Grid item lg={1} md={1} className={"logo-main"}>
            <a href="../home"><img src={logo} className="App-logo" alt="logo" /></a>
          </Grid>
          <Grid item lg={11} md={11} className={"nav-bar"}>
            <div className="edit">
              <a className={isEditingCard ? 'end-edit' : 'start-edit'} onClick={this.onEditClicked} title="Edit">Edit</a>
            </div>
            <a href="#" className="save" title="Save" onClick={this.saveUser}><SaveAltIcon /></a>
            <NavigationBar />
          </Grid>
        </Grid>

        <div id={"sideBar"} className={sidebarVisible ? localStorage.getItem('sidebarPosition') : 'sideBar-hide'}>
          <div className={localStorage.getItem('changeSide')}>
            <div className="leftArrow">
              <a href="#" id={"toggle2"} className={topbarVisible ? '' : (isMouseInTop ? '' : 'toggle-full-mode')} onClick={this.toggleSidebar}></a>
            </div>
            {!showTopWidgets && <div><a className="button cl" onClick={() => this.onMore(true)}><Trans word={'area'} /></a></div>}
            {showTopWidgets && <div><a className="button" onClick={() => this.onMore(false)}><Trans word={'area'} /></a></div>}
            <ul className={this.state.showTopWidgets ? "block" : "displayNone"}>
              <li><a href="#" onClick={() => this.onAddTab1(1)}><Trans word={'soktag'} /></a></li>
              <li><a href="#" onClick={() => this.onAddTab1(2)}><Trans word={'valjtag'} /></a></li>
              <li><a href="#" onClick={() => this.onAddTab1(3)}><Trans word={'storanalys'} /></a></li>
              <li><a href="#" onClick={() => this.onAddTab1(4)}><Trans word={'platsochtid'} /></a></li>
              <li><a href="#" onClick={() => this.onAddTab1(5)}><Trans word={'handelse'} /></a></li>
            </ul>
            {!showWidgets && <div><a className="button cl" onClick={() => this.onMore(false)}>Widgets</a></div>}
            {showWidgets && <div><a className="button" onClick={() => this.onMore(true)}>Widgets</a></div>}
            <div className={this.state.showWidgets ? "block" : "displayNone"}>
              <ul>
                <li className="catList"><input value={linkSearch} placeholder="Search.." onChange={this.onLinkSearchChanged} /></li>
                <li className="catList"><select onChange={this.changeCategory}>
                  <option value="1">{translateCell("select_train")}</option>
                  <option value="2">{translateCell("search_train")}</option>
                  <option value="3">{translateCell("location_time")}</option>
                  <option value="4">{translateCell("event_list")}</option>
                </select></li>
                {_.map(searchedLink, (ln, index) => {
                  if (showAllLink) {
                    return (
                      <li key={index}><a className={"link"} onClick={() => this.onAddItem(ln.type, ln.value)}>{translateCell(ln.name.toLowerCase())}</a></li>
                    );
                  } else {
                    if (index < 9) {
                      return (
                        <li key={index}><a className={"link"} onClick={() => this.onAddItem(ln.type, ln.value)}>{translateCell(ln.name.toLowerCase())}</a></li>
                      );
                    }
                  }
                })}
                {!showAllLink && searchedLink.length > 9 && <li key={'show-more'} className="btm"><a onClick={() => this.onShowMore(true)}><Trans word={'showmore'} /></a></li>}
                {showAllLink && searchedLink.length > 9 && <li key={'show-less'} className="btm"><a onClick={() => this.onShowMore(false)}><Trans word={'showless'} /></a></li>}
              </ul>
            </div>
          </div>
        </div>
        <div className={sidebarVisible ? "content-normal" : "content-full"} id={localStorage.getItem('sidebarPosition')}>
          <div id={"mainContent"} className={topbarVisible ? "main-content-normal" : "main-content-full"}>
            <Tabs
              key={tabsKey}
              selectedIndex={currentTabIndex}
              onSelect={this.onCurrentTabChanged}>
              <TabList>
                {_.map(tabs, (tab, index) => {
                  return (
                    <Tab key={tab.id}>
                      <div className={"tab-child-item"}>{tab.name}</div> <div className={"tab-child-item close-icon"} onClick={() => this.onCloseTab(index)}>×</div>
                    </Tab>
                  );
                })}
                <Tab><img onClick={this.onAddTab} src={plusTab} className="plusTab" alt="Plus" /></Tab>
              </TabList>

              {_.map(items, (item, index) => {
                return (
                  <TabPanel key={tabs[index]['id']}>
                    <CardGrid items={item} isEditingCard={isEditingCard} onRemoveItem={this.onRemoveItem} />
                  </TabPanel>
                );
              })}
            </Tabs>
          </div>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    saveUser: state.saves
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({
    SaveActions: bindActionCreators({ saveAction }, dispatch)
  })
)(List);