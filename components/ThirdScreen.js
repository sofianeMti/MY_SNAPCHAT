import React from 'react';
import axios from 'axios';
import {Text, View, TextInput, Button, Alert} from 'react-native';

export default class ThirdScreen extends React.Component {
    User(){
        axios({
            method: 'post',
            url: 'https://api.snapchat.wac.epitech.eu/inscription',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        }).then(reponse =>{
            this.props.navigation.navigate('Second')
            console.log(reponse);
            console.log(reponse.data);
        })
            .catch(error =>{
                console.log(error);
                Alert.alert('email déja existant')
            });
    }


    render() {
        return (
            <View>
                <Text style={{fontSize:20, textAlign: 'center', marginTop: 50}}>inscription</Text>
                <Text style ={{marginLeft: 80, marginTop:20}}>NOM D'UTILISATEUR OU E-MAIL</Text>
                <TextInput
                    style={{height: 40, marginLeft: 155 ,marginTop:40}}
                    placeholder="Entrez ici"
                    onChangeText={(email) => this.setState({email})}
                />
                <Text style ={{marginLeft: 80, marginTop:20}}>MOT DE PASSE</Text>
                <TextInput
                    style={{height: 40, marginLeft: 155 ,marginTop:20}}
                    placeholder="Entrez ici"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    title="JE M'INSCRIS"
                    color="#40BCF8"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => this.User() }
                    //onPress={()=>this.props.navigation.navigate('Second')}
                />
            </View>
        );
    }
}