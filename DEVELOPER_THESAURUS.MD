# ZORROMUSIQUE DEVELOPER THESAURUS

This document is intended for developers who wants to be part of this project or just understand the software design

## ARCHITECTURES IN USE

### Model View Controller (MVC)

* The busisness logic is within the Model Layer (Like Ruby on Rails)
* Data Access Object (DAO) design pattern is used (Like JavaEE) @TODO
* Singlethon, Bridge & Proxy design pattern is in heavy use

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
* **Atom**:
	*  A repeatable DOM element with no complex element within (I.E.): a button its style and the logic behind
	*  The atom IDE
	* AKA: Element
* **Molecule**:
	* A repeatable DOM element with atoms within (I.E.): an Album and the logic behind
	* AKA: (non react)Component
* **Organism**:
	* A non repeatable DOM element with atoms or molecules within (I.E.): The player and the logic behind
	* AKA: Widget
	* note: Normally named end in *er like player or searcher
* **Page**:
	* A view related to a route
	* A non repeatable DOM element with organism and molecules within
* **Layout**:
	* A non repeatable DOM element with pages or organisms to be directly render in the reactDOMHock


* **Media**: A video or a song info
* **Album**: A colection of medias
* **Playlist**: A colection of albums
* **Player**: An organism that play medias
* **Searcher**: An organism that search medias


* **Entrypoint**: A (JS/HTML/CSS)file that will be requested via browser page request

## CODING GUIDELINE

* **Variable naming** Appending to the JS variable naming convention:
	* Private Static (var|const|func) Is precesed by 2 underscores

* Entrypoints should be clousured
* MVC js should be module clases
* Vendors|Utils should be modules
