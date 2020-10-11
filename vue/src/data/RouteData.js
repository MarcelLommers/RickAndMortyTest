// Pages
import RickAndMortyPage from "../pages/RickAndMorty/RickAndMortyPage";

import RMCharacterPage from "../pages/RickAndMorty/CharacterPage";
import RMCharactersPage from "../pages/RickAndMorty/CharactersPage";

import RMEpisodePage from "../pages/RickAndMorty/EpisodePage";
import RMEpisodesPage from "../pages/RickAndMorty/EpisodesPage";

import RMLocationPage from "../pages/RickAndMorty/LocationPage";
import RMLocationsPage from "../pages/RickAndMorty/LocationsPage";


export default [
  {
    path: "/RickAndMorty",
    name: "Rick and Morty",
    components: {
      content: RickAndMortyPage
    },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/RickAndMortyCharacters",
    name: "Rick and Morty - Characters",
    components: {
      content: RMCharactersPage
    },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/RickAndMortyCharacter/:characterId",
    name: "Rick and Morty - Character",
    components: {
      content: RMCharacterPage
    },
    props: {
      content: route => ({
        characterId: route.params.characterId
      })
    },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/RickAndMortyLocations",
    name: "Rick and Morty - Locations",
    components: {
      content: RMLocationsPage
    },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/RickAndMortyLocation/:locationId",
    name: "Rick and Morty - Location",
    components: {
      content: RMLocationPage
    },
    props: {
      content: route => ({
        locationId: route.params.locationId
      })
    },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/RickAndMortyEpisodes",
    name: "Rick and Morty - Episodes",
    components: {
      content: RMEpisodesPage
    },
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/RickAndMortyEpisode",
    name: "Rick and Morty - Episode",
    components: {
      content: RMEpisodePage
    },
    meta: {
      allowAnonymous: true
    }
  }
]
