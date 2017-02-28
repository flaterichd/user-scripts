// ==UserScript==
// @name         DD-WRT Usability Enchancements
// @namespace    flaterichd
// @version      0.2
// @author       flaterichd
// @match        http://192.168.50.1/Services.asp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // helpers: find DOM element
    function find(selector) {
        return document.querySelector(selector);
    }

    function findAll(selector) {
        return document.querySelectorAll(selector);
    }


    // setup enchancements
    function setup()
    {
        var staticLeaseTableRows = findAll('.table.center tr');

        // object present in DOM?
        if (window && staticLeaseTableRows){
            //alert(staticLeaseTableRows.length);
            for (var i = 2; i < staticLeaseTableRows.length; i++) {
                var lastColumn = staticLeaseTableRows[i].childNodes[4];
                lastColumn.appendChild(createSwapButton('↑', "u", i-2, staticLeaseTableRows.length-3));
                lastColumn.appendChild(createSwapButton('↓', "d", i-2, staticLeaseTableRows.length-3));
                //debugger;
            }
        } else {
            // try again later
            setTimeout(setup, 500);
        }
    }

    // create link button
    function createSwapButton(innerHTML, mode, index, lastIndex) {
        var button = document.createElement('a');
        button.innerHTML = innerHTML;
        button.href = "javascript:void(0);";
        button.setAttribute('style', 'display: inline-block; font-size: 1.7em; margin: -0.4em 0 0 0.4em; color: #000; text-decoration: none');
        button.onmouseenter = function() { button.style.color = 'rgb(68,187,255)'; };
        button.onmouseleave = function() { button.style.color = '#000'; };

        button.addEventListener("click", function() {
            var swapIndex = index + (mode == 'u' ? - 1 : + 1);
            if (swapIndex < 0) {
                swapIndex = lastIndex;
            } else if (swapIndex > lastIndex) {
                swapIndex = 0;
            }
            //debugger;
            swapFields('lease', '_hwaddr', index, swapIndex);
            swapFields('lease', '_hostname', index, swapIndex);
            swapFields('lease', '_ip', index, swapIndex);
            swapFields('lease', '_time', index, swapIndex);
        });

        return button;
    }

    function swapFields(prefix, suffix, index, swapIndex) {
        var fieldSource = findField(prefix + index + suffix);
        var fieldTarget = findField(prefix + swapIndex + suffix);
        var fieldTargetOld = fieldTarget.value;
        fieldTarget.value = fieldSource.value;
        fieldSource.value = fieldTargetOld;
    }

    function findField(name) {
        return find('input[name="' + name + '"]');
    }


    // start setup script
    setup();

})();
