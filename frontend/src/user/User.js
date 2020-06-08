import React, { Component } from 'react';
import { list } from './apiUser';
import defaultAvatar from '../images/ava.jpg';
import { Link } from 'react-router-dom';

class User extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({users: data});
            }
        })
    }
    
    renderUsers =(users) => (
        <div className="row">
        
            {users.map((user, index) => 
                (
                <div className="card col-md-3 m-5" style={{width: '18rem'}} key ={index}>
                    <img className="card-img-top" src={defaultAvatar} alt="Image's caption" 
                    style={{width:"100%", height:"15vw", objectFit: "cover"}}/>
                    <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                        <Link to={`user/${user._id}`} className="btn btn-raised btn-sm">View detail profile.</Link>
                    </div>
                </div>
                )
            )}
        
        </div>
    )

    render() {
        const {users} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default User;