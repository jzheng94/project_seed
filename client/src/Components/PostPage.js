import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar';
import CommentsFeed from './CommentsFeed';

import { Header, Container} from 'semantic-ui-react'

import { Query, Mutation } from 'react-apollo';
import { GET_ONE_POST, DELETE_POST } from '../queries'
import Like from './Like';


class PostPage extends Component {

    handleDelete = (deletePost, history) => {
    const confirmDelete = window.confirm("There is no coming back from this...are you sure you want to delete?");
    if(confirmDelete){
        deletePost().then(({ data }) => {
            console.log(data);
            this.props.history.push("/ideas");
        });
    }
}

    render() {
        const { _id } = this.props.match.params;
        const user = this.props.session.getCurrentUser.username;
        return (
            <Query query={GET_ONE_POST} variables={{ _id }}>
            {({ data, loading, error}) => {
                if(loading) return <div>Loading</div>
                if (error) return <div>Error</div>
                console.log(data);

                return (
                <div>
                    <Navbar/>
                    <br/>
                    <Container>
                    <div className="ui piled segment">
                    <Header as='h3'>Subject: {data.getOnePost.subject}</Header>
                    <Header as='h4'>Author: {data.getOnePost.username}</Header>
                    <Header as='h4'>Created: {data.getOnePost.createdAt}</Header>
                    <Header as='h4'>Post:</Header>
                    <p>{data.getOnePost.content}</p>
                <br/>
                    <div className="ui left labeled button" tabindex="0">
                    <div className="ui basic right pointing label">
                    {data.getOnePost.likes}
                    </div>
                    <div className="ui red button">
                    <i className="heart icon"></i> <Like _id={_id}/>
                    </div>
                    </div>
                    <Mutation mutation={DELETE_POST} variables={{ _id }}>
                    {deletePost => (
                        <button className="ui blue button"
                        onClick={() => this.handleDelete(deletePost)}
                        disabled={user !== data.getOnePost.username}
                        >
                        Delete
                        </button>
       )}
                    </Mutation>
                <br />
                <br />
                    
                   
                    
                  <div className="visible content">
                  
                    <div className="hidden content">
                     
                    </div>
                    </div>
                    <CommentsFeed/>
                
                </div>
                    </Container>

                </div>
                )}}
            </Query>
        );
    }
}

export default withRouter(PostPage);