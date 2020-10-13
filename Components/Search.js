import React, {Component} from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder='Titre du film'/>
                <Button title='Rechercher' onPress={() => {
                }}/>
                {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>  <FilmItem/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search