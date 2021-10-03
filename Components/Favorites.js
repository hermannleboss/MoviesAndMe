import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FilmList from "./FilmList";
import { connect } from "react-redux";

class Favorites extends React.Component {
  render() {
    console.log("Affichage des favoris"+ this.props.favoritesFilm);
    return (
      <View style={styles.main_container}>
        <FilmList
          films={this.props.favoritesFilm} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          favoriteList={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});


const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);
