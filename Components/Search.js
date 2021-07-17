import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.serachedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  _loadFilms() {
    if (this.serachedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.serachedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            //films: this.state.films.concat(data.results), //it the same
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        }
      );
    }
  }

  _searchTextInputChanged(text) {
    this.serachedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        this._loadFilms();
      }
    );
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.textinput}
          placeholder="Titre du film"
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
        <FlatList
          data={this.state.films}
          //J'ai ajouter key={data} pour résoudre ce problème: Encountered two children with the same key
          key={data}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              //J'ai ajouter key={data} pour résoudre ce problème: Encountered two children with the same key
              //key={item}
              isFilmFavorite={
                (this.props.favoritesFilm.findIndex(
                  (film) => film.id === item.id
                ) !== -1) ?true: false
              }
              keyExtractor={(item2) => item.title.toString()}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  }
}
export default connect(mapStateToProps)(Search);
