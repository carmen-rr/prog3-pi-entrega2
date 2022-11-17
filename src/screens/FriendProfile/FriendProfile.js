import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config'

export default class ProfileFriends extends Component {
    constructor(props){
        super(props)
    }
    
    
render() {
    console.log(this.props)
    return (
      <View>
        <Text>ProfileFriends</Text>
      </View>
    )
  }
}