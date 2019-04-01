import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
export default class FirstScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.icone}/>
                <Text>Project SnapChat By SOFIANE MTIMET</Text>
                <Image
                    style={{width: 90, height: 90, marginBottom: 100}}
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/c4/Snapchat_logo.svg/1024px-Snapchat_logo.svg.png'}}/>
                  {/*<Text style = {styles.backred}>CONNEXION</Text>
                <Text style = {styles.backblue}>S'INSCRIRE</Text>*/}
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Second')}>
                    <View style={{width:380, marginTop: 240}}>
                        <Text style={styles.backblue}>CONNEXION</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Third')}>
                    <View style={{width:380}}>
                        <Text style={styles.backred}>S'INSCRIRE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icone: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',

    },
    backred: {
            backgroundColor: "#40BCF8",
            //alignSelf : 'stretch',
            textAlign: 'center',
            //   marginTop: 5,
            color: 'white',
            height:80,
            fontSize:27,
            paddingTop: 25,
        },
    backblue: {
            backgroundColor: "#FB1352",
            height:80,
            alignSelf : 'stretch',
            textAlign: 'center',
            //marginTop: 5,
            color: 'white',
            fontSize:25,
            paddingTop: 25,
        },
});
