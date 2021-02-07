import React, { Component } from "react";
import Store from './Redux/Store';
import {
  ActionSetInputValue,
  ActionAddTodoItem,
  ActionDeleteTodoItem,
  SagaGetInitList,
  SagaGetInitList2
} from './Redux/ActionCreators';
import AppUi from './AppUi';

class App extends Component {
  constructor(props) {
    super(props);
    Store.subscribe(this.handleStoreChange);
  }
  state = Store.getState();
  componentDidMount() {
    const action = SagaGetInitList();
    Store.dispatch(action);
    const action2 = SagaGetInitList2();
    Store.dispatch(action2); 
  }

  handleInputChange = (e) => {
    const action = ActionSetInputValue(e.target.value)
    Store.dispatch(action);
  }
  handleStoreChange = () => {
    this.setState(Store.getState());
  }
  handleBtnClick = () => {
    const action = ActionAddTodoItem();
    Store.dispatch(action);
  }
  handleItemDelete = (index) => {
    const action = ActionDeleteTodoItem(index);
    Store.dispatch(action);
  }

  render() {
    return (
      <AppUi
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleItemDelete={this.handleItemDelete}
        list={this.state.list}
      />
    )
  }
}

export default App;
