import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';

const LazyNewPost = React.lazy(() => import('./NewPost/NewPost'));

// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });

class Blog extends Component {
    state = {
        auth: true
    }
    
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: 'new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>home</h1>} /> */}
                <Switch>
                    {/* normal without lazy loading */}
                    {/* {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null} */}

                    {/* use hoc for for lazy loading of routes */}
                    {/* {this.state.auth ? <Route path="/new-post" component={AsyncComponent} /> : null} */}

                    {/* async loading using lazy loading suspense for react and can be used outside of route, anywhere such as toggling buttons blah blah */}
                    {this.state.auth ? <Route path="/new-post" render={() => <Suspense fallback={<h1>loading...</h1>}><LazyNewPost /></Suspense>} /> : null}
                    
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                    {/* <Route render={() => <h1>Page Not Found</h1>} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;