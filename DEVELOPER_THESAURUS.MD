# ZORROMUSIQUE DEVELOPER THESAURUS

This document is intended for developers who wants to be part of this project or just understand the software design

# Architectures in use

## Model View Controller (MVC)

* The busisness logic is within the Model Layer (Like Ruby on Rails)
* Data Access Object (DAO) design pattern is used (Like JavaEE) @TODO
* Singlethon, Bridge & Proxy design pattern is in heavy use

<a id="atomic_design"></a>
## Atomic design

Designers just follow the raw guideline. For developers:

* Many variables and namespaces follow the atomic design concepts, I.E.: play_button_atom, media_molecule, player_organism

# Engines / Frameworks

## React
* The (react)components are stored in `views_components` and follow the [atomic design](#atomic_design) naming
* The (react)containers are stored in `controllers_containers` and follow the [atomic design](#atomic_design) naming
* Data states without redux are handled by the controller of the organism and actions are published via Class methods (static+clousure custom events)
## Redux
* (redux)stores are only available for the main app and Pages
* @TODO

## React Routes
@TODO

# VOCABULARY LIST
* __Atom__:
	*  A repeatable DOM element with no complex element within (I.E.): a button and the logic behind
	*  The atom IDE
	* AKA: Element
* __Molecule__:
	* A repeatable DOM element with atoms within (I.E.): an Album and the logic behind
	* AKA: (non react)Component
* __Organism__:
	* A non repeatable DOM element with atoms within (I.E.): The player and the logic behind
	* AKA: Widget
	* note: Normally named end in *er like player or searcher
* __Page__:
	* A view related to a route
	* A non repeatable DOM element with organism within


* __Media__: A video or a song info
* __Album__: A colection of medias
* __Playlist__: A colection of albums
* __Player__: An organism that play medias
* __Searcher__: An organism that search medias
