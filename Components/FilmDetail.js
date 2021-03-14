// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image , ActivityIndicator, ScrollView} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    }
  }
    componentDidMount() {
       console.log("Component FilmDetail monté");
       getFilmDetailFromApi(this.props.route.params.idFilm).then(data=>{
         this.setState({
           film: data,
           isLoading: false
         })//,
         //console.log(this.state.film.title);
       })
     }

     _displayFilm(){
      console.log("Display Film");
      if (this.state.film != undefined) {
         return (
           <ScrollView
              style={styles.scrollview_container}
              key={styles.scrollview_container}>
              <Image
                  style={styles.image}
                  source={{uri: getImageFromApi(this.state.film.poster_path)}}
                  />
              <Text style={styles.title_text}> {this.state.film.title}</Text>
              <Text style={styles.description_text}> {this.state.film.overview}</Text>
              <Text style={styles.default_text}> Sorti Le {this.state.film.release_date}</Text>
              <Text style={styles.default_text}> Note{this.state.film.vote_average}/10</Text>
              <Text style={styles.default_text}> Nombre de votes{this.state.film.vote_count}</Text>
              <Text style={styles.default_text}> Budget{this.state.film.budget}</Text>
              <Text style={styles.default_text}> Genre(s) {this.state.film.release_date}</Text>
              <Text style={styles.default_text}> Compagnie(s){this.state.film.release_date}</Text>
           </ScrollView>
         )
       }
     }
  _displayLoading() {

       console.log("Display Loadin");
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
      {this._displayLoading()}
      {this._displayFilm()}
      </View>
    )
  }



}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
  },
  image: {
    height: 169,
    margin: 5
  },
  scrollview_container: {
    flex: 1,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default FilmDetail
