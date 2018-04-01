import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getUserByUsername } from '../actions/security';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null
    }
  }

  componentDidMount() {
    const { sid, username, getUserByUsername } = this.props;
    getUserByUsername(sid, username);
    this.setState({ isLoading: false });
  }

  render = () => {
    const { userProfile } = this.props;

    if (this.state.isLoading && (typeof userProfile == 'undefined' || !userProfile)) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Please wait ...
      </Text>
        </View>
      )
    }

    return (<ScrollView style={{
      flex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <View style={{flex: 1, marginTop: 50, alignItems: 'center'}}>
        <Text style={[styles.title, {fontSize: 20}]}>User Profile</Text>
      </View>
      <View style={[styles.section]}>
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>User name</Text>
          <Text style={[styles.content]}>
            {`${userProfile.firstName} ${userProfile.name}`}
          </Text>
        </View>
        {this.renderSpacer()}
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={[styles.title]}>Email</Text>
          <Text style={[styles.content]}>
            {userProfile.email}
          </Text>
        </View>
      </View>
    </ScrollView>);
  }

  renderSpacer() {
    return (
      <View style={styles.spacer}></View>
    )
  }
}

function select(store) {
  return {
    username: store.auth.user.username,
    sid: store.auth.user.token.sid,
    userProfile: store.security.user,
  };
}

function dispatch(dispatch) {
  return {
    getUserByUsername: (sid, username) => { dispatch(getUserByUsername(sid, username)) }
  }
};

export default connect(select, dispatch)(ProfileScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  section: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  title: {
    flex: 1,
    marginRight: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 3,
    marginRight: 10,
    // textAlign: 'left',
  },
  spacer: {
    height: 1,
    backgroundColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
  },
});
