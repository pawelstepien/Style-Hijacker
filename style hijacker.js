
var styles = [];
var regex =  /([\@\w\s\-\{\(\)\:\.]*[\.\#\,\w\d\-\+\s\>\:\(\)\*\@]+{)([\w\d\s\:\;\-\+\#\"\'\.\,\%\/\=\<\>\(\)\!\@]+}}?)/;
//var groups = sheet.match(regex);
/*
do {
    styles.push({
        selector: groups[1],
        style: groups[2]
    });
    sheet = sheet.replace(groups[1] + groups[2], '');
    groups = sheet.match(regex);
} while (styles.length < 500 && groups !== null);
*/

function addPrefix(selector, prefix) {
    if (selector[0] === '@') {
        var mediaQuery = selector.match(/(\@[\w\s\-\(\)\:\.]+\{)/)[1];
        selector = selector.replace(mediaQuery, '');
    }
    selector = selector.split(',').map(function (el, index, array) {
        length = array.length;
            return prefix + el;
        }).join(',');


    return mediaQuery ? mediaQuery + selector : selector;
};


function getSelectors(html, styles) {
    var domManipulator = document.createElement('div');
    domManipulator.id = 'dom-manipulator';
    domManipulator.style.display = 'none';
    domManipulator.innerHTML = html;
    document.body.insertAdjacentElement('beforeend', domManipulator);
    return styles.filter(function (el) {
        if (el.selector[0] === '@') {
            var mediaQuery = el.selector.match(/(\@[\w\s\-\(\)\:\.]+\{)/)[1];
            el.selector = el.selector.replace(mediaQuery, '');
        }
        return el.selector.match(/:(active|hover|focus)/) !== null || domManipulator.querySelector(el.selector.replace(/{/g, '')) !== null;
    });
};

/*styles.forEach(function (el) {
    el.selector = addPrefix(el.selector, '#%QDPI% ');
});*/

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('input-form').addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(event);
    });
})
