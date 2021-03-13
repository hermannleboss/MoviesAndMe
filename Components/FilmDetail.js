// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text , ActivityIndicator, ScrollView} from 'react-native'
import {getFilmDetailFromApi} from '../API/TMDBApi'

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
              <Text key={this.state.film.id}> {this.state.film.title}</Text>
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
  scrollview_container: {
    flex: 1,
  }
})

export default FilmDetail
