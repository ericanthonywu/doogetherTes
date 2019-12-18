import React from 'react';
import {Block, Button, Checkbox, Input, Text} from 'galio-framework';
import {AsyncStorage, TouchableOpacity} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Snackbar} from 'react-native-paper';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            data: [],
            snackbar: false
        };
    }


    addList = () => {
        const {data, input} = this.state;
        if (input) {
            data.push({list: input, checked: false});
            this.setState({
                data: data,
                input: ''
            }, () => AsyncStorage.setItem('TodoListData', JSON.stringify(this.state.data)));
        } else {
            this.setState({
                snackbar: "Input Cannot be empty."
            })
        }
    };

    changeChecked = (index, checkedStatus) => {
        const {data} = this.state;
        // data[index].checked = checkedStatus;
        this.setState({
            data: data,
        }, () => AsyncStorage.setItem('TodoListData', JSON.stringify(this.state.data)));
    };

    deleteList = index => {
        const {data} = this.state;
        data.splice(index,1)
        this.setState({
            data: data,
        }, () => AsyncStorage.setItem('TodoListData', JSON.stringify(this.state.data)));
    };

    async componentDidMount() {
        const data = await AsyncStorage.getItem('TodoListData');
        if (data !== '') {
            this.setState({data: JSON.parse(data) || []});
        }
    }

    render() {
        console.log(this.state.data);
        return (
            <>
                <Snackbar
                    visible={this.state.snackbar}
                    onDismiss={() => this.setState({ snackbar: false })}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    {this.state.snackbar}
                </Snackbar>
                <Block width={'80%'} style={{top: 20}} center>
                    <Block width={'100%'}>
                        <Input style={{width: '85%'}}  borderless onChangeText={text => this.setState({input: text})}
                               placeholder={'Add List ... '}/>
                    </Block>
                    <Button onlyIcon icon="add" iconFamily="MaterialIcons" iconSize={30} color="primary"
                            iconColor="#fff" style={{width: 40, height: 40, position: 'absolute', right: 0, top: 10}}
                            onPress={this.addList}/>

                    <Block width={'100%'} style={{marginTop: 20}}>
                        {this.state.data.length ? this.state.data.map((data, index) =>
                                <Block width={'70%'}>
                                    <Checkbox label={data.list} initialValue={data.checked}
                                              onChange={checkedStatus => this.changeChecked(index, checkedStatus)}
                                              style={{marginTop: 10, width: '100%'}}/>
                                    <TouchableOpacity onPress={() => this.deleteList(index)}
                                                      style={{position: 'absolute', right: 0, top: 12}}>
                                        <AntDesignIcon name={'close'} size={20}/>
                                    </TouchableOpacity>
                                </Block>
                            ,
                        ) : <Text muted>No List Available</Text>}
                    </Block>
                </Block>
            </>
        );
    }
}

export default TodoList;
