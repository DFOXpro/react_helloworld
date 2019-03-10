# ZORROMUSIQUE DEVELOPER THESAURUS

This document is intended for developers who want to be part of this project or just understand the software design

## ARCHITECTURES IN USE

### Model View Controller (MVC)

* The business logic is within the Model Layer (Like Ruby on Rails)
* Data Access Object (DAO) design pattern is used (Like JavaEE) @TODO
* Singleton, Bridge & Proxy design pattern is in heavy use

<a id="atomic_design"></a>
### Atomic design

Designers just follow the raw guideline. For developers:

* Many variables and namespaces follow the atomic design concepts, I.E.: play_button_atom, media_molecule, player_organism

## ENGINES / FRAMEWORKS

### React
* The (react)components are stored in `views_components` and follow the [atomic design](#atomic_design) naming
* The (react)containers are stored in `controllers_containers` and follow the [atomic design](#atomic_design) naming
* Data states without redux are handled by the controller of the organism and actions are published via Class methods (static+clousure custom events)
### Redux
* (redux)stores are only available for the main app and Pages
* @TODO

### React Routes
@TODO

## VOCABULARY LIST
### Extra to MVC
* **Entrypoint**:
	* A (JS/HTML/CSS)file that will be requested via browser page request
	* Taken from module bundlers thesaurus
* **Routes**:
	* A list of URIs/URLs to be used within the client SPA router or any server XHR
* **Vendors**:
	* A set bridge/proxy code for 3party systems (I.E.): youtube, vimeo, dailyMotion
	* A set of code outside the business logic (I.E.): a search engine

The next terms are based(with some variation) from atomic design thesaurus
* **Atom**:
	* A repeatable DOM element with no complex element within (I.E.): a button its style and the logic behind it
	* A react component without container controller
* **Molecule**:
	* A repeatable DOM element with atoms within (I.E.): an Album and the logic behind
	* A react component with a container controller
	* AKA: (not react)Component
	* note: Normally named in singular form if it's based in an entity
* **Organism**:
	* A non-repeatable DOM element with atoms or molecules within (I.E.): The player and the logic behind
	* AKA: Widget
	* note: Normally named end in *er like header, footer, player or searcher
* **Page**:
	* A view related to a route
	* A non-repeatable DOM element with organism and molecules within
	* note: Normally named in Plural form if it's based in an entity
* **Layout**:
	* A non-repeatable DOM element with pages or organisms
	* To be directly rendered in the reactDOMHook

### Business logic entities
* **Media**: A video or a song info
* **Album**: A collection of medias
* **Playlist**: A collection of albums
* **Player**: An organism that plays media
* **Searcher**: An organism that search medias

## CODING GUIDELINE

* **Variable naming** Appending to the JS variable naming convention:
	* Private Static (var|const|func) Is precesed by 2 underscores

* Entry points should be clousured
* MVC js should be module classes
* Vendors|Utils should be modules
