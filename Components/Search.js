import React, {Component} from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends Component {

  constructor(props) {
   super(props)
   this.state = {
     films:[]
   }
   this.serachedText=""
 }
  _loadFilms() {
    if (this.serachedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.serachedText).then(data => this.setState({films: data.results}));
    }
  }
  _searchTextInputChanged(text){
    this.serachedText = text
  }
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.textinput} placeholder='Titre du film'/>
                <Button title='Rechercher' onPress={() => this._loadFilms()}/>
                {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>  <FilmItem film={item}/>}
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
