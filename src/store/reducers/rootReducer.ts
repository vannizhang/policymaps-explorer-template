import { combineReducers } from 'redux';
import UI from './UI';
import Map from './Map';
import MyFavItems from './myFavItems';
import MyCollections from './MyCollections';
import GroupContent from './GroupContent';

export default combineReducers({
    UI,
    Map,
    GroupContent,
    MyFavItems,
    MyCollections,
});
