function getStyles(css) {
    var regex =  /([\@\w\s\-\{\(\)\:\.]*[\.\#\,\w\d\-\+\s\>\:\(\)\*\@]+{)([\w\d\s\:\;\-\+\#\"\'\.\,\%\/\=\<\>\(\)\!\@]+}}?)/;
    var styles = [];
    var groups = css.match(regex);
    do {
        styles.push({
            selector: groups[1],
            style: groups[2]
        });
        css = css.replace(groups[1] + groups[2], '');
        groups = css.match(regex);
    } while (styles.length < 1500 && groups !== null);

    return styles;
};

function isSelectorValid(selector) {
    var dummy = document.createElement('br');
    try {
        dummy.querySelector(selector);
    } catch (e) {
        return false;
    }
    return true;
};

function getSelectors(html, styles) {
    var domManipulator = document.createElement('div');
    domManipulator.id = 'dom-manipulator';
    domManipulator.style.display = 'none';
    domManipulator.innerHTML = html;
    document.body.insertAdjacentElement('beforeend', domManipulator);
    return styles.filter(function (el, index) {
        if (el.selector[0] === '@') {
            var mediaQuery = el.selector.match(/(\@[\w\s\-\(\)\:\.]+\{)/)[1];
            el.selector = el.selector.replace(mediaQuery, '');
        }
        if (el.selector===')') {
            console.log(index);
        }
        return el.selector.match(/:(active|hover|focus)/) !== null || (isSelectorValid(el.selector.replace(/{/g, '')) && domManipulator.querySelector(el.selector.replace(/{/g, '')) !== null);
    });
};

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




/*styles.forEach(function (el) {
    el.selector = addPrefix(el.selector, '#%QDPI% ');
});*/

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('input-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var css = document.querySelector('#input-form .css-input').value;
        var html = document.querySelector('#input-form .html-input').value;
        var prefix = document.querySelector('#input-form .prefix').value;
        console.log(css);
        var styles = getStyles(css);
        console.log(styles);
        styles = getSelectors(html, styles)
        console.log(styles);


    });
})
