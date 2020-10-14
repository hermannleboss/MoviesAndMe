import React, {Component} from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false,
        }
        this.serachedText = ""
    }

    _loadFilms() {
        this.setState({isLoading: true})
        console.log("Début du Chargment des films \n")
        if (this.serachedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.serachedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: this.state.films.concat(data.results), //it the same
                    //films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            });
            console.log("Fin du chargement des films \n");
        }
    }

    _searchTextInputChanged(text) {
        this.serachedText = text
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large'/>
                {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
        )
    }
    _searchFilms(){
      this.page=0
      this.totalPages=0
      this.setState({
        films:[]
      }, () => {
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
      })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()}
                           onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput}
                           placeholder='Titre du film'/>
                <Button title='Rechercher' onPress={() => this._searchFilms()}/>
                {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
                <FlatList
                    data={this.state.films}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log(this.totalPages + "Pages au totale\n");
                        console.log("Chargment de la page " + this.page);
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        main_container: {
            flex: 1
        },
        textinput: {
            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: '#000000',
            borderWidth: 1,
            paddingLeft: 5
        },
        loading_container: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

export default Search
