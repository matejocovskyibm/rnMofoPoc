/**
 * Copyright 2018 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, flex} from 'react-native';
import {WLAuthorizationManager, WLResourceRequest } from 'react-native-ibm-mobilefirst'

export default class App extends Component {
  constructor(props){
    super(props);
  }

  pingNode() {
    WLAuthorizationManager.obtainAccessToken("").then(
      (token) => {
        console.log('-->  pingMFP(): Success ', token);
        var resourceRequest = new WLResourceRequest("/adapters/NodeAdapter/getCurrentTime",
          WLResourceRequest.GET
        );
        // resourceRequest.setQueryParameters({ name: "world" });
        resourceRequest.send().then(
          (response) => {
            // Will display "Hello world" in an alert dialog.
            var newJson = JSON.parse(response.responseText);
            alert("Success: " + newJson.time);
          },
          (error) => {
            console.error(error);
            alert("Failure: Resource Request");
          }
        );
      }, (error) => {
        console.error(error);
        alert("Failed to connect to MobileFirst Server");
      });
  }

  pingSpring() {
    WLAuthorizationManager.obtainAccessToken("").then(
      (token) => {
        console.log('-->  pingMFP(): Success ', token);
        var resourceRequest = new WLResourceRequest("/adapters/SpringAdapter1/springHello",
          WLResourceRequest.GET
        );
        // resourceRequest.setQueryParameters({ name: "world" });
        resourceRequest.send().then(
          (response) => {
            // Will display "Hello world" in an alert dialog.
            var newJson = JSON.parse(response.responseText);
            alert("Success: " + newJson.message);
          },
          (error) => {
            console.error(error);
            alert("Failure: Resource Request");
          }
        );
      }, (error) => {
        console.error(error);
        alert("Failed to connect to MobileFirst Server");
      });
  }
  
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.welcome}>Hello Fixed Test</Text>
        <View style={styles.buttonContainer}>
          <Button title="NodeJs Backend" color="black" onPress={this.pingNode} accessibilityLabel="NodeJs Backend"></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Spring Backend" color="blue" onPress={this.pingSpring} accessibilityLabel="Spring Backend"></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  welcome: {
    marginBottom: 10
  },
  buttonContainer:{
      marginBottom: 10
  }
});
