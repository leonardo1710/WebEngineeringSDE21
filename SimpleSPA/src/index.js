
import './styles/style.scss';
import Dashboard from "./views/Dashboard.js";
import Profile from "./views/Profile.js";
import About from "./views/About.js";


/**
 *  If link is clicked navigate to route
 */
const navigateTo = url => {
  history.pushState(null, null, url); //push url to history api
  router();
};

const router = async () => {
  const routes = [
      { path: "/", view: Dashboard },
      { path: "/about", view: About },
      { path: "/profile/:id" },
      { path: "/profile", view: Profile }
  ];

  const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

  const potentialMatches = routes.map(route => {
    return {
        route,
        result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  /* Route not found - return first route OR a specific "not-found" route */
  if (!match) {
      match = {
          route: routes[0],
          result: [location.pathname]
      };
  }

  // create instance of matched view
  const view = new match.route.view();

  // append view html to the app element
  document.querySelector("#app").innerHTML = await view.getHtml();
}

window.addEventListener("popstate", router);  //re-run router if navigating through history api

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
      if (e.target.matches("[data-link]")) {
          e.preventDefault(); // dont refresh page
          navigateTo(e.target.href); // insteat call navigateTo
      }
  });

  /* Document has loaded -  run the router! */
  router();
});