import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.scss';

import { Nav } from './layout'

import PlumbusPage from "./RickAndMorty/pages/PlumbusPage";

import CharacterPage from './RickAndMorty/pages/CharacterPage.js'
import CharactersPage from './RickAndMorty/pages/CharactersPage.js'

import LocationPage from './RickAndMorty/pages/LocationPage.js'
import LocationsPage from './RickAndMorty/pages/LocationsPage.js'

import EpisodePage from './RickAndMorty/pages/EpisodePage.js'
import EpisodesPage from './RickAndMorty/pages/EpisodesPage.js'

export default class App extends React.Component {

  render () {

    return (
      <Router>
        <div className='app'>

          <Nav className='nav'/>

          <div className='content'>

            <Switch>
              <Route path="/characters"
                     component={ CharactersPage }
              />
              <Route path="/character/:characterId"
                     component={ CharacterPage }
              />
              <Route path="/episodes"
                     component={ EpisodesPage }
              />
              <Route path="/episode/:episodeId"
                     component={ EpisodePage }
              />
              <Route path="/locations"
                     component={ LocationsPage }
              />
              <Route path="/location/:locationId"
                     component={ LocationPage }
              />
              <Route path="/"
                     component={ PlumbusPage }
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
