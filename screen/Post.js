import React from 'react';
import {Block, Button, Input, Text} from 'galio-framework';
import Axios from 'axios';
import {ScrollView} from 'react-native';

class Post extends React.Component {
    state = {
        post: [],
        loading: true,
        loadingButton: false,
        title: '',
        body: '',
    };

    componentDidMount() {
        Axios.get(`https://jsonplaceholder.typicode.com/posts`).then(data => {
            this.setState({
                post: data.data,
                loading: false,
            });
        }).catch(err => alert('no connection'));
    }

    addPost = () => {
        if (this.state.body && this.state.title) {
            this.setState({
                loadingButton: true,
            }, () =>
                Axios.post('https://jsonplaceholder.typicode.com/posts', {
                    title: this.state.title,
                    body: this.state.body,
                })
                    .then(data => this.setState({
                        title: '',
                        body: '',
                        userId: Math.random(),
                    }, () => {
                        alert('data added');
                        const {post} = this.state;
                        post.push(data.data);
                        this.setState({
                            post: post,
                        });
                    }))
                    .catch(err => alert('no connection')));
            this.setState({loadingButton: false});
        }
    };

    render() {
        return (
            <>

                <ScrollView>
                    <Block center width={'100%'} style={{marginTop: 20}}>
                        <Block width={'80%'} style={{paddingBottom: 20, paddingTop: 10}} center card>
                            <Input style={{width: '70%'}} onChangeText={text => this.setState({title: text})}
                                   label={'Title :'} value={this.state.title} placeholder={'Title here ... '}/>
                            <Input style={{width: '70%'}} onChangeText={text => this.setState({body: text})}
                                   label={'Body :'} value={this.state.body} placeholder={'Body here ... '}/>
                            <Button onPress={this.addPost} title={'Add'} size={'s'}
                                    loading={this.state.loadingButton}>Add</Button>
                        </Block>
                    </Block>
                    {
                        this.state.loading ?
                            <Text center>Loading Post . . .</Text>
                            :
                            this.state.post.map(data =>
                                <Block center width={'50%'}>
                                    <Block style={{
                                        margin: 10,
                                        padding: 10,
                                    }} width={'100%'} center card>
                                        <Text h4>{data.title}</Text>
                                        <Text>{data.body}</Text>
                                    </Block>
                                </Block>,
                            )
                    }
                </ScrollView>
            </>
        );
    }

}

export default Post;
