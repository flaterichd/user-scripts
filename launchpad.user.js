// ==UserScript==
// @name        Launchpad - Hide Inactive PPAs
// @description Hides removed PPAs which are usually shown in grey.
// @namespace   flaterichd
// @version     0.2
// @author      flaterichd
// @match       http://launchpad.net/~*
// @match       https://launchpad.net/~*
// @grant       none
// ==/UserScript==

var ippas = document.getElementsByClassName('ppa-icon-inactive')
for (var i=0; i < ippas.length; i++)
    ippas[i].style.display = 'none';
