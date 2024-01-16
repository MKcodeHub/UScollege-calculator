import React from 'react';

const listReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          list: state.list.concat({ name: action.name, id: action.id }),
        };
      default:
        throw new Error();
    }
  };
  
  const App = () => {
    const [listData, dispatchListData] = React.useReducer(listReducer, {
      list: initialList,
      isShowList: true,
    });
    const [name, setName] = React.useState('');
  
    function handleChange(event) {
      setName(event.target.value);
    }
  
    function handleAdd() {
      dispatchListData({ type: 'ADD_ITEM', name, id: uuidv4() });
  
      setName('');
    }
  
    return (
      <div>
        <AddItem
          name={name}
          onChange={handleChange}
          onAdd={handleAdd}
        />
  
        <List list={listData.list} />
      </div>
    );
  };