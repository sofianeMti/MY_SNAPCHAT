import React from 'react';
import {View, Text, AsyncStorage, Alert, Button, TouchableOpacity, StyleSheet, ImagePickerIOS,Image, ScrollView, Picker} from 'react-native';
import axios from 'axios';
export default class ZScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            image: null,
            quotes:[],
            user: '',
            count: '1',
            tok: '',
        };
    }
    // recuperer le token afin d'avoir acces aux users inscris
    getProtectedQuote() {
            AsyncStorage.getItem('id_token')
            .then((token) => {
            fetch('https://api.snapchat.wac.epitech.eu/all', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'token': JSON.stringify(token) }
            })
                .then((response) => response.json())
                //console.log(response)
                .then((quote) => {
                     this.setState({ quotes:quote.data });
                     console.log(this.state.quotes)
                })
                .done();
        })
    }
    //permet l'acces a la gallery photo du smartphone
    pickImage() {
        // openSelectDialog(config, successCallback, errorCallback);
        ImagePickerIOS.openSelectDialog({}, imageUri => {
            this.setState({ image: imageUri });
            //console.log(this.state.image);
            Alert.alert('success', this.state.image);
        }, error => Alert.alert(error,'Vous n\'avez pas choisis d\'image'));
    }
    //envoi de l'image vers serveur
    picture(){
        const token = AsyncStorage.getItem('id_token');
        const formObj = new FormData();
        formObj.append("duration","5");
        formObj.append("to", this.state.user);
        formObj.append ("image", {
            uri : this.state.image,
            type: 'image/jpg',
            name: 'soso.jpg'
        });
        token.then((tokenString) => {
            //console.log(tokenString);
            this.setState({tok: tokenString})
        });
        axios.post('https://api.snapchat.wac.epitech.eu/snap', formObj,{

            headers: {
                'token': this.state.tok,
            }
        }).then(token => {
            if(this.state.image != null){
                //console.log(formObj);
                //console.log(token);
                //console.log(this.state.tok);
                console.log(token.data.data);
                // ca m'alerte rien
                if(token.data.data == "Snap Created"){
                    Alert.alert("snap envoyé");
                }else{
                    Alert.alert('error');
                }
            }
            else{
                Alert.alert('error', 'veuillez choisir une image');
            }
        })
    }
    //permet de se déconnecter
    async userLogout() {
        const jeton = AsyncStorage.getItem('id_token');
        try {
            await AsyncStorage.removeItem(JSON.stringify(jeton));
            //Alert.alert('Logout Success!');
            console.log(await AsyncStorage.removeItem(JSON.stringify(jeton)));
            this.props.navigation.navigate('First', Alert.alert('Success','Vous êtes deconnecté'))
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    render(){
        return(
            <View>
                <Button title="Load Images" onPress={() => this.pickImage()} />
                {this.state.image?
                    <Image style={{width: 400, height: 200,  display: 'block', marginLeft: 'auto', marginRight: 'auto'}} source={{ uri: this.state.image }} /> :
                    null
                }
                <Button title="Send" onPress={() => this.picture()}/>
                <Button title="show users"  onPress={() => this.getProtectedQuote()}/>
                <Picker
                    selectedValue={this.state.user}
                    onValueChange={(itemValue, itemIndex) => this.setState({user: itemValue})}>
                    {this.state.quotes.map((val) => (
                        <Picker.Item label={val.email} value={val.email} key={val.email} />
                    ))}
                </Picker>
                <TouchableOpacity
                    onPress={() => this.userLogout()}>
                    <View style={{width:380}}>
                        <Text style={styles.backred}>LOGOUT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    backred: {
        backgroundColor: "#40BCF8",
        //alignSelf : 'stretch',
        textAlign: 'center',
        //   marginTop: 5,
        color: 'white',
        height:55,
        fontSize:20,
        paddingTop: 15,
    },
});