import "babel-polyfill";
import $ from "./libs/jquery";
import App from "./components/app";

$(() => {
    App.init();
});
