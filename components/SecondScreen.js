import React from 'react';
import {Text, View, TextInput, Button, AsyncStorage,Alert} from 'react-native';

export default class SecondScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
    Login() {
        if (this.state.data === null ) {
            Alert.alert('Echec', 'Champs vide');
            console.log('ok')
        } else {

            fetch('https://api.snapchat.wac.epitech.eu/connection', {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    //console.log(responseData);
                    if (responseData.data != "Unauthorized Access") {
                        this.saveItem('id_token', responseData.data.token),
                            this.props.navigation.navigate('Z');
                        console.log(responseData);
                    } else{
                        Alert.alert('Cet identifiant n\'existe pas');
                        return;
                    }
                })
             /*   .then((responseData) => {
                    var retrievedItem =  AsyncStorage.getItem("id_token", responseData);
                    var item = JSON.parse(retrievedItem);
                    console.log(item);
                    return item;
                    var value = AsyncStorage.getItem('id_token',responseData.data.token);
                    console.log(value);
                })*/

        }
    }

    render() {
        return (
            <View>
                <Text style={{fontSize:20, textAlign: 'center', marginTop: 50}}>Connexion</Text>
                <Text style ={{marginLeft: 80, marginTop:20}}>NOM D'UTILISATEUR OU E-MAIL</Text>
                <TextInput
                    style={{height: 40, marginLeft: 155 ,marginTop:40}}
                    placeholder="Entrez ici"
                    maxlength='3'
                    //value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                />
                <Text style ={{marginLeft: 80, marginTop:20}}>MOT DE PASSE</Text>
                <TextInput
                    style={{height: 40, marginLeft: 155 ,marginTop:20}}
                    placeholder="Entrez ici"
                    secureTextEntry={true}
                    maxlength="20"
                    //value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    title="CONNEXION"
                    color="#FB1352"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => this.Login() }
                />
            </View>
        );
    }
}