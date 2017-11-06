import React, { Component } from 'react';
import { Header, Form, Card, Image, Button } from 'semantic-ui-react';
import { firebaseAuth, ref } from '../../constants';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        displayName: '',
        email: '',
        uid: '',
        photoURL: '',
      },
      userExtra: {
        nickname: '',
      },
      loading: true,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
        ref('users/' + user.uid + '/').on('value', (data) => {
          if (data.val() != null) {
            this.setState({userExtra: data.val(), loading: false})
          }          
        })
      }
    });
  }

  componentWillUnmount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        ref('users/' + user.uid + '/').off()
      }
    })
  }

  handleSave(data) {
    const user = firebaseAuth().currentUser;
    if (user) ref('users/' + user.uid + '/').set(data);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      userExtra: {
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    this.handleSave({...this.state.userExtra})
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Header as='h1' textAlign='center' content='User Settings' />     
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <Image src={this.state.user.photoURL} />
            <Card.Content>
              <Card.Header>{this.state.user.email}</Card.Header>
              <Card.Meta><span>{this.state.user.uid}</span></Card.Meta>
              <Card.Description>
                <input 
                  type="text"
                  name="nickname"
                  onChange={this.handleInputChange} 
                  onBlur={this.handleSubmit}
                  value={this.state.userExtra.nickname}
                />
              </Card.Description>
            </Card.Content>
          </Card>
          <Button type="submit">Speichern</Button>
        </Form>
      </div>
    )
  }
}

export default User;
