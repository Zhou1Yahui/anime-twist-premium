// ==UserScript==
// @name          Anime Twist Premium
// @description   Your Anime Twist's favorite accessory..
// @include       *://twist.moe/*
// @version       0.0.3
// @author        Romain Lebesle <oss@thoughtsunificator.me> (https://thoughtsunificator.me)
// @homepageURL   https://thoughtsunificator.me
// @copyright     2019, Romain Lebesle <oss@thoughtsunificator.me> (https://thoughtsunificator.me)
// @license       MIT
// @require       https://gitcdn.xyz/repo/thoughtsunificator/userinterface.js/master/src/userinterface.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/userinterface.js-collection/master/userinterface/popup.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/userinterface.js-collection/master/userinterface/popup-confirm.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/object/watch-list.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/object/watch-list-entry.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/userinterface/watch-list-add.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/userinterface/watch-list-entry.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/userinterface/watch-list-entries.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/userinterface/watch-list-menu.js
// @require       https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/userinterface/watch-list.js
// @resource      https://gitcdn.xyz/repo/thoughtsunificator/anime-twist-premium/master/resource/anime-twist-premium.css
// @namespace https://greasyfork.org/users/257151
// ==/UserScript==

UserInterface.runModel("watchlist", { parentNode: document.documentElement })
