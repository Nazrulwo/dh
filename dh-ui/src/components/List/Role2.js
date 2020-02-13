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
import Trans from '../List/Trans';
import { translateCell } from './Trans';
const delay = 350;

class Role2 extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    const saveUser = props.saveUser;
    const saveUser1 = localStorage.getItem("savedData");
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
      showWidgets: false,
      showTopWidgets: true,
      isEditingCard: false,
      showAllLink: false,
      linkSearch: '',
      hideNav: false,
      username: "Role 2"
    }
  };

  sideLinks = [
    { name: 'Role Two', type: 'component', value: 'Component1' },
    { name: 'Resenärslistan', type: 'component', value: 'Component8' },
    { name: 'Beslut', type: 'component', value: 'Component3' },
    { name: 'Analys', type: 'component', value: 'Component1' },
    { name: 'Händelselista', type: 'component', value: 'Component2' },
    { name: 'Rättidighet', type: 'component', value: 'Component3' },
    { name: 'Notice', type: 'component', value: 'Component9' },
    { name: 'Simulering', type: 'component', value: 'Component5' },
    { name: 'Form', type: 'component', value: 'Component5' },
    { name: 'Personal', type: 'component', value: 'Component7' },
    { name: 'Övergångar', type: 'component', value: 'Component6' },
    { name: 'Resenärslistan', type: 'component', value: 'Component8' },
    { name: 'Personal', type: 'component', value: 'Component7' },
    { name: 'Simulering', type: 'component', value: 'Component5' },
    { name: 'Rättidighet', type: 'component', value: 'Component2' },
    { name: 'Övergångar', type: 'component', value: 'Component6' },
    { name: 'Cities', type: 'component', value: 'Component8' },
    { name: 'Personal', type: 'component', value: 'Component5' },
    { name: 'Analys', type: 'component', value: 'Component1' },
    { name: 'Övergångar', type: 'component', value: 'Component3' },
    { name: 'Cities', type: 'component', value: 'Component8' },
    { name: 'Personal', type: 'component', value: 'Component7' },
    { name: 'Simulering', type: 'component', value: 'Component5' },
  ];
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
    document.title = 'Role Two';
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
    if (tabs.length < 5) {
      var tabindex;
      switch (tabs.length) {
        case 1: tabindex = 'Välj Tåg'; break;
        case 2: tabindex = 'Sök Tåg'; break;
        case 3: tabindex = 'Plats Och Tid'; break;
        case 4: tabindex = 'Händelselista'; break;
      }
      tabs.push({
        id: Math.random(),
        name: tabindex,
      });
      items.push([
        { id: Math.random(), type: 'component', value: 'Component2', x: 0, y: Infinity, w: 1, h: 2, add: false },
        { id: Math.random(), type: 'component', value: 'Component5', x: 1, y: Infinity, w: 1, h: 2, add: false },
        { id: Math.random(), type: 'component', value: 'Component6', x: 2, y: Infinity, w: 1, h: 2, add: false },
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
    this.setState({
      isEditingCard: !this.state.isEditingCard,
    });
  };

  onShowMore = () => {
    this.setState({
      showAllLink: true,
    });
  };
  onShowLess = () => {
    this.setState({
      showAllLink: false,
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
    localStorage.setItem("savedData", JSON.stringify(saveUser));
    console.log("saveuser", saveUser);
    alert('Saved!')
  }

  render() {
    const { sideLinks } = this;
    const { topbarVisible, sidebarVisible, isMouseInTop, tabsKey, tabs, showTopWidgets, showWidgets, currentTabIndex, items, isEditingCard, showAllLink, linkSearch } = this.state;
    const { user, users } = this.props;
    const searchedLink = _.filter(sideLinks, (item) => {
      const res = item.name.toLowerCase().search(linkSearch.toLowerCase()) >= 0;
      // console.log(res, item.name, linkSearch);
      return res;
    });
    console.log("props", this.props);
    return (
      <Grid container onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave}>
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
            <a href="#" className="save" title="Save" onClick={this.saveUser}><img src={save} alt="Save" /></a>
            <div className="profileName">
              <div className="pro">{this.state.username}
                <ul>
                  <li className="role1"><a href="/RoleOne" onClick={this.changeName}><Trans word={'role1'} /><small>(<Trans word={'default'} />)</small></a></li>
                  <li className="role2"><a href="/RoleTwo"><Trans word={'role2'} /></a></li>
                  <li className="role3"><a href="/RoleThree"><Trans word={'role3'} /></a></li>
                  <li className="logout"><a href="/"><Trans word={'logout'} /></a></li>
                </ul>
              </div>
            </div>
            <NavigationBar />
          </Grid>
        </Grid>
        <div id={"sideBar"} className={sidebarVisible ? '' : 'sideBar-hide'}>
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
        <div className={sidebarVisible ? "content-normal" : "content-full"}>
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
)(Role2);