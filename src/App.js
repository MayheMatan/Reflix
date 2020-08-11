import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetail from './components/MovieDetail'
import NavBar from './components/NavBar';

class App extends React.Component {
  state = {
    movies: [
      { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
      { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
      { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
      { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
      { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
    ],
    rented: [],
    budget: 10,
  }

  findMovieById = movieId => {
    return this.state.movies.find(movie => movie.id === parseInt(movieId));
  }

  saveUserInfo = () => {
    const currentUserName = localStorage.getItem("currentUser");
    const data = {
      rented: this.state.rented,
      budget: this.state.budget
    }
    localStorage.setItem(`${currentUserName}-info`, JSON.stringify(data));
  }

  addToRented = movie => {
    if(this.state.budget > 3) {
      const allRented = [...this.state.rented];
      movie.isRented = true;
      allRented.push(movie);
      this.setState({rented: allRented, budget: this.state.budget - 3}, this.saveUserInfo)
    } else {
      alert("Sorry you have no more money left to rent more movies, Consider to retrive old movies to store.")
    }
  }

  removeFromRented = movieId => {
    const movieToRemove = this.state.movies.find(movie => movie.id === parseInt(movieId))
    movieToRemove.isRented = false;
    this.setState({rented: this.state.rented.filter(movie => movie.id !== movieId), budget: this.state.budget + 3}, this.saveUserInfo)
  }

  retriveInfoAboutUser = userName => {
    const userInfo = JSON.parse(localStorage.getItem(userName + "-info"))
    if(userInfo) {
      this.setState({rented: userInfo.rented, budget: userInfo.budget})
    } else {
      this.setState({rented: [], budget: 10})
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <Route exact path="/" component={Landing}/>
          <Route exact path="/catalog/:user" render={({history, match}) => <Catalog retriveInfoAboutUser={this.retriveInfoAboutUser} match={match} remove={this.removeFromRented} rent={this.addToRented} history={history} state={this.state}/>}/>
          <Route exact path="/movies/:id" render={({ match }) => <MovieDetail movie={this.findMovieById(match.params.id)}/>}/>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
