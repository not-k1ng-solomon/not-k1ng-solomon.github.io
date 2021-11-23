/* begin: ../../blocks-common/i-global/__ready/i-global__ready.js */
Ya.ready = function(callback) {
    // @see https://clck.ru/AK63K
    if (document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        callback();
    } else if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', onReady, false);
        window.addEventListener('load', onReady, false);
    } else {
        // IE8 и ниже: нет addEventListener, нет DOMContentLoaded
        window.attachEvent('onload', onReady);
    }

    function onReady() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMContentLoaded', onReady, false);
            window.removeEventListener('load', onReady, false);
        } else {
            window.detachEvent('onload', onReady);
        }
        callback();
    }
};

/* end: ../../blocks-common/i-global/__ready/i-global__ready.js */
/* begin: ../../blocks-common/i-ecma/__date/i-ecma__date.js */
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

/* end: ../../blocks-common/i-ecma/__date/i-ecma__date.js */
/* begin: ../../blocks-common/i-log/i-log.js */
/* eslint-disable no-unused-vars */
/* globals JSON */

var eventParamRegex = /baobab_event_id=(\w+)/;

/**
 * Проверка нужен ли проброс идентификатора баобаб события в ссылку
 * @param {HTMLAnchorElement} linkNode Ссылочный узел
 *  @returns {Boolean}
 */
function isCounterEventIdRequired(linkNode) {
    return Boolean(linkNode && linkNode.getAttribute && linkNode.getAttribute('data-event-required'));
}

/**
 * Вставка идентификатора баобаб события в адрес
 * @param {String} url Адрес для вставки
 * @param {String} eventId Идентификатор баобаб события
 * @returns {String} Измененный адрес
 */
function injectCounterEventId(url, eventId) {
    if (!url || !eventId) return url;

    var match = eventParamRegex.exec(url);

    if (match) {
        // замена event id в ссылке
        return url.replace(match[1], eventId);
    }

    var eventIdPart = 'baobab_event_id=' + eventId;
    var isFirstParam = url.indexOf('?') === -1;

    return url + (isFirstParam ? '?' : '&') + eventIdPart;
}

/**
 * Генерирует идентификатор события Баобаб.
 *
 * @param {number} cts Метка времени возникновения события.
 */
function getEventId(cts) {
    return cts.toString(36) + Math.floor(Math.random() * 36 * 36).toString(36);
}

/**
 * Возвращает данные для счетчика.
 *
 * @param {HTMLElement} domNode Элемент, для которого хотим отправить событие
 * @param {Object} params
 *
 * @returns {Object} данные счетчика
 */
function getCounterData(node, params) {
    var event = params.event || (node && node.getAttribute('data-log-event')) || 'click',
        cts = Date.now(),
        hdTime = Ya.getHdTime(),
        data = {
            event: event,
            id: params.nodeId || node.getAttribute('data-log-node'),
            cts: cts,
            'event-id': params.eventId || (node && node.getAttribute('data-log-event-id')) || getEventId(cts),
            mc: window.BEM && BEM.blocks['i-mcounter'] ? BEM.blocks['i-mcounter'].get() : '',
            type: params.type,
            data: params.data
        };

    if (hdTime) {
        data.hdtime = hdTime;
    }

    if (isCounterEventIdRequired(node)) {
        node.href = injectCounterEventId(node.href, data['event-id']);
    }

    return data;
}

/* end: ../../blocks-common/i-log/i-log.js */
/* begin: ../../blocks-common/i-global/__load-counter/i-global__load-counter.js */
/* global w:false */
Ya.ready(function() {
    var helpers = {
        offset: function(elem) {
            var offsetParent = elem.offsetParent,
                offsetTop = elem.offsetTop,
                offsetLeft = elem.offsetLeft;

            while (offsetParent !== document.body) {
                offsetLeft += offsetParent.offsetLeft;
                offsetTop += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }

            return { top: offsetTop, left: offsetLeft };
        },

        isInArea: function(area, item, useHeight) {
            if (!item || !(item instanceof Element)) return false;

            var itemOffset = this.offset(item),
                itemOffsetTop = itemOffset.top;

            useHeight && (itemOffsetTop += item.offsetHeight);

            return itemOffset.left < area.right &&
                itemOffsetTop < area.bottom &&
                itemOffsetTop > area.top;
        },

        titleCount: function(area, items) {
            if (!items || !items.length) return {};

            var visibilityFlag = false,
                serpAdvTitlesCount = 0,
                serpTitlesCount = 0;

            for (var i = 0; i < items.length; i++) {
                var item = items[i],
                    title = item.querySelector('.organic__title') || item.querySelector('.serp-item__title'),
                    inArea = this.isInArea(area, title, true);

                if (!inArea) {
                    // считаем все organic__title-wrapper и serp-title, которые попадают в видимую область,
                    // если перестают попадать, значит мы дошли до границы области и цикл можно остановить
                    if (visibilityFlag) break;

                    // если не попадает title в область видимости,
                    // то значит ещё не дошли до области видимости и пропускаем след действия
                    continue;
                }

                // дошли до title, попадающего в область видимости
                visibilityFlag = true;

                if (item.querySelector('.organic_adv')) {
                    serpAdvTitlesCount++;
                } else {
                    serpTitlesCount++;
                }
            }

            return {
                organic: serpTitlesCount,
                adv: serpAdvTitlesCount
            };
        },

        getViewportParams: function() {
            var winWidth = window.innerWidth || document.documentElement.clientWidth,
                winScrollTop = window.scrollY || window.pageYOffset,
                winHeight = window.innerHeight || document.documentElement.clientHeight,
                area = {
                    top: winScrollTop,
                    right: winWidth,
                    bottom: winScrollTop + winHeight,
                    left: 0
                },
                titles = this.titleCount(area, document.querySelectorAll('.serp-item'));

            return {
                serpTitlesCount: titles.organic,
                serpAdvTitlesCount: titles.adv,
                bannerInArea: this.isInArea(area, document.querySelectorAll('.serp-adv__banner')),
                winWidth: winWidth,
                winHeight: winHeight
            };
        },

        getBaobabData: function() {
            var viewportParams = this.getViewportParams();

            return {
                event: 'tech',
                type: 'serp-page-loaded',
                nodeId: Ya.clckId,
                data: {
                    vis: document.visibilityState || 'unknown',
                    visible: {
                        webCount: viewportParams.serpTitlesCount,
                        directCount: viewportParams.serpAdvTitlesCount,
                        banner: viewportParams.bannerInArea
                    },
                    viewportSize: {
                        width: viewportParams.winWidth,
                        height: viewportParams.winHeight
                    }
                }
            };
        }
    };

    function getStyles(element) {
        return window.getComputedStyle ?
            window.getComputedStyle(element) :
            element.currentStyle;
    }

    function _makeSend() {
        var container = document.querySelector('[data-log-node="' + Ya.clckId + '"]') || document.body;

        w(
            null,
            // на серверной стороне вызов все равно нужен
            // вызывается в i-global__load-counter.priv.js
            '471.143.1007', // /serp/page/loaded
            null,
            helpers.getBaobabData()
        );

        w(null, null, null, {
            event: 'tech',
            type: 'coords',
            nodeId: Ya.clckId,
            data: {
                nodes: getBlocksLayout(container),
                pageNodes: getPageLayout(document)
            }
        });
    }

    function _shownAlready() {
        if (window.requestAnimationFrame) {
            requestAnimationFrame(_makeSend);
        } else {
            // http://caniuse.com/#feat=requestanimationframe
            // IE 9- FF 22- Chrome 23- Safari 6- iOS Safari 6.1- Opera 12-
            // Opera Mobile 12- Opera Mini Android Browser 4.3-
            setTimeout(_makeSend, 0);
        }
    }

    if ('onvisibilitychange' in document && document.visibilityState !== 'visible') {
        document.addEventListener('visibilitychange', function onVisChange() {
            if (document.visibilityState !== 'visible') return;

            document.removeEventListener('visibilitychange', onVisChange);
            _shownAlready();
        });
    } else {
        _shownAlready();
    }

    function getPageLayout(container) {
        var selectors = [
            '.b-page[data-log-node]',
            '.main .content__left[data-log-node], .main[data-log-node]',
            '.main__top[data-log-node]',
            '.serp-header[data-log-node], .header3[data-log-node]',
            '.navigation[data-log-node]',
            '.serp-footer[data-log-node]',
            '.related[data-log-node]',
            '.pager[data-log-node]',
            '.more[data-log-node]',
            '.region-change[data-log-node]',
            '.competitors[data-log-node]'
        ];
        var result = {};

        for (var i = 0; i < selectors.length; i++) {
            var selector = selectors[i];
            var elementData = _getElementData(container.querySelector(selector));

            if (!elementData || !elementData.id) continue;

            var calcHeight = elementData.offsetHeight + elementData.marginTop + elementData.marginBottom;

            result[elementData.id] = [
                elementData.left,
                elementData.top,
                elementData.offsetWidth,
                elementData.offsetHeight,
                calcHeight
            ];
        }

        return result;
    }

    /**
     * Возвращает расположение баобаб-блоков на странице.
     *
     * @param {Element} container - элемент, в котором располагаются актуальные элементы поисковой выдачи
     * @returns {[String, Number, Number, Number, Number, Number][]}
     * по порядку: logNodeId, left, top, width, height, calcHeight
     */
    function getBlocksLayout(container) {
        var serpItems = getElementsLayout(container.querySelectorAll('.serp-list .distr-default-search, .serp-item')),
            // В одном блоке .mispell может быть несколько "колдунщиков". Правильный селектор - misspell__level
            misspell = getElementsLayout(container.querySelectorAll('.misspell__level'));

        for (var key in misspell) {
            if (misspell.hasOwnProperty(key)) {
                serpItems[key] = misspell[key];
            }
        }

        return serpItems;
    }

    function getElementsLayout(elements) {
        var layout = {};

        if (elements.length === 0) return layout;

        var elementsData = [],
            i = 0;

        for (; i < elements.length; i++) {
            var elem = elements[i],
                data = _getElementData(elem);

            if (data) {
                elementsData.push(data);
            }
        }

        for (i = 0; i < elementsData.length; i++) {
            var prev = elementsData[i - 1],
                curr = elementsData[i],
                next = elementsData[i + 1],
                calcHeight = curr.offsetHeight +
                    ((prev ? Math.max(curr.marginTop - prev.marginBottom, 0) : curr.marginTop) || 0) +
                    ((next ? Math.max(curr.marginBottom - next.marginTop, 0) : curr.marginBottom) || 0) +
                    ((prev && next ? Math.min(prev.marginBottom, next.marginTop) : 0) || 0);

            layout[curr.id] = [
                curr.left,
                curr.top,
                curr.offsetWidth,
                curr.offsetHeight,
                calcHeight
            ];
        }

        return layout;
    }

    /**
     * Получить данные по HTML-элементу.
     *
     * @param {HTMLElement} element
     * @returns {Object}
     * @private
     */
    function _getElementData(element) {
        if (!element) return null;

        var compStyle = getStyles(element) || {},
            position = helpers.offset(element);

        if (compStyle && compStyle.display === 'none') {
            return {
                element: element,
                id: element.getAttribute('data-log-node'),
                left: position.left,
                top: position.top,
                offsetWidth: 0,
                offsetHeight: 0,
                marginTop: 0,
                marginBottom: 0
            };
        }

        function getComputedStyleFallback() {
            if (window.getComputedStyle) {
                return window.getComputedStyle.apply(window, arguments);
            }

            return 0;
        }

        // margin может быть в :before и/или :after. Он не учитывается в getComputedStyle основного элемента.
        var marginTopBefore = getComputedStyleFallback(element, ':before').marginTop,
            marginBottomAfter = getComputedStyleFallback(element, ':after').marginBottom;

        return {
            element: element,
            id: element.getAttribute('data-log-node'),
            left: position.left,
            top: position.top,
            offsetWidth: element.offsetWidth,
            offsetHeight: element.offsetHeight,
            // берём максимум, так как их margin схлопываются
            marginTop: Math.max(parseInt(compStyle.marginTop, 10) || 0, parseInt(marginTopBefore, 10) || 0),
            marginBottom: Math.max(parseInt(compStyle.marginBottom, 10) || 0, parseInt(marginBottomAfter, 10) || 0)
        };
    }
});

/* end: ../../blocks-common/i-global/__load-counter/i-global__load-counter.js */
/* begin: ../../blocks-desktop/i-jquery/__inherit/i-jquery__inherit.js */
/**
 * Inheritance plugin
 *
 * Copyright (c) 2010 Filatov Dmitry (dfilatov@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 1.3.5
 */

(function($) {

var hasIntrospection = (function(){'_';}).toString().indexOf('_') > -1,
    emptyBase = function() {},
    objCreate = Object.create || function(ptp) {
        var inheritance = function() {};
        inheritance.prototype = ptp;
        return new inheritance();
    },
    needCheckProps = true,
    testPropObj = { toString : '' };

for(var i in testPropObj) { // fucking ie hasn't toString, valueOf in for
    testPropObj.hasOwnProperty(i) && (needCheckProps = false);
}

var specProps = needCheckProps? ['toString', 'valueOf'] : null;

function override(base, result, add) {

    var hasSpecProps = false;
    if(needCheckProps) {
        var addList = [];
        $.each(specProps, function() {
            add.hasOwnProperty(this) && (hasSpecProps = true) && addList.push({
                name : this,
                val  : add[this]
            });
        });
        if(hasSpecProps) {
            $.each(add, function(name) {
                addList.push({
                    name : name,
                    val  : this
                });
            });
            add = addList;
        }
    }

    $.each(add, function(name, prop) {
        if(hasSpecProps) {
            name = prop.name;
            prop = prop.val;
        }
        if($.isFunction(prop) &&
           (!hasIntrospection || prop.toString().indexOf('.__base') > -1)) {

            var baseMethod = base[name] || function() {};
            result[name] = function() {
                var baseSaved = this.__base;
                this.__base = baseMethod;
                var result = prop.apply(this, arguments);
                this.__base = baseSaved;
                return result;
            };

        }
        else {
            result[name] = prop;
        }

    });

}

$.inherit = function() {

    var args = arguments,
        hasBase = $.isFunction(args[0]),
        base = hasBase? args[0] : emptyBase,
        props = args[hasBase? 1 : 0] || {},
        staticProps = args[hasBase? 2 : 1],
        result = props.__constructor || (hasBase && base.prototype.__constructor)?
            function() {
                return this.__constructor.apply(this, arguments);
            } : function() {};

    if(!hasBase) {
        result.prototype = props;
        result.prototype.__self = result.prototype.constructor = result;
        return $.extend(result, staticProps);
    }

    $.extend(result, base);

    var basePtp = base.prototype,
        resultPtp = result.prototype = objCreate(basePtp);

    resultPtp.__self = resultPtp.constructor = result;

    override(basePtp, resultPtp, props);
    staticProps && override(base, result, staticProps);

    return result;

};

$.inheritSelf = function(base, props, staticProps) {

    var basePtp = base.prototype;

    override(basePtp, basePtp, props);
    staticProps && override(base, base, staticProps);

    return base;

};

})(jQuery);

/* end: ../../blocks-desktop/i-jquery/__inherit/i-jquery__inherit.js */
/* begin: ../../blocks-desktop/i-jquery/__identify/i-jquery__identify.js */
/**
 * Identify plugin
 *
 * @version 1.0.0
 */

(function($) {

var counter = 0,
    expando = '__' + (+new Date),
    get = function() {
        return 'uniq' + ++counter;
    };

/**
 * Makes unique ID
 * @param {Object} [obj] Object that needs to be identified
 * @param {Boolean} [onlyGet=false] Return a unique value only if it had already been assigned before
 * @returns {String} ID
 */
$.identify = function(obj, onlyGet) {

    if(!obj) return get();

    var key = 'uniqueID' in obj? 'uniqueID' : expando; // Use when possible. native uniqueID for elements in IE

    return onlyGet || key in obj?
        obj[key] :
        obj[key] = get();

};

})(jQuery);
/* end: ../../blocks-desktop/i-jquery/__identify/i-jquery__identify.js */
/* begin: ../../blocks-desktop/i-jquery/__is-empty-object/i-jquery__is-empty-object.js */
(function($) {

$.isEmptyObject || ($.isEmptyObject = function(obj) {
        for(var i in obj) return false;
        return true;
    });

})(jQuery);

/* end: ../../blocks-desktop/i-jquery/__is-empty-object/i-jquery__is-empty-object.js */
/* begin: ../../blocks-desktop/i-jquery/__debounce/i-jquery__debounce.js */
/**
 * Debounce and throttle function's decorator plugin 1.0.6
 *
 * Copyright (c) 2009 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) {

$.extend({

    debounce : function(fn, timeout, invokeAsap, ctx) {

        if(arguments.length == 3 && typeof invokeAsap != 'boolean') {
            ctx = invokeAsap;
            invokeAsap = false;
        }

        var timer;

        return function() {

            var args = arguments;
            ctx = ctx || this;

            invokeAsap && !timer && fn.apply(ctx, args);

            clearTimeout(timer);

            timer = setTimeout(function() {
                invokeAsap || fn.apply(ctx, args);
                timer = null;
            }, timeout);

        };

    },

    throttle : function(fn, timeout, ctx) {

        var timer, args, needInvoke;

        return function() {

            args = arguments;
            needInvoke = true;
            ctx = ctx || this;

            timer || (function() {
                if(needInvoke) {
                    fn.apply(ctx, args);
                    needInvoke = false;
                    timer = setTimeout(arguments.callee, timeout);
                }
                else {
                    timer = null;
                }
            })();

        };

    }

});

})(jQuery);
/* end: ../../blocks-desktop/i-jquery/__debounce/i-jquery__debounce.js */
/* begin: ../../blocks-desktop/i-jquery/__observable/i-jquery__observable.js */
/**
 * Observable plugin
 *
 * Copyright (c) 2010 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 1.0.0
 * @requires $.identify
 * @requires $.inherit
 */

(function($) {

var storageExpando = '__' + (+new Date) + 'storage',
    getFnId = function(fn, ctx) {
        return $.identify(fn) + (ctx? $.identify(ctx) : '');
    },
    Observable = /** @lends $.observable.prototype */{

        /**
         * Builds full event name
         * @protected
         * @param {String} e Event type
         * @returns {String}
         */
        buildEventName : function(e) {

            return e;

        },

        /**
         * Adding event handler
         * @param {String} e Event type
         * @param {Object} [data] Additional data that the handler gets as e.data
         * @param {Function} fn Handler
         * @param {Object} [ctx] Handler context
         * @returns {$.observable}
         */
        on : function(e, data, fn, ctx, _special) {

            if(typeof e == 'string') {
                if($.isFunction(data)) {
                    ctx = fn;
                    fn = data;
                    data = undefined;
                }

                var id = getFnId(fn, ctx),
                    storage = this[storageExpando] || (this[storageExpando] = {}),
                    eList = e.split(' '),
                    i = 0,
                    eStorage;

                while(e = eList[i++]) {
                    e = this.buildEventName(e);
                    eStorage = storage[e] || (storage[e] = { ids : {}, list : {} });

                    if(!(id in eStorage.ids)) {
                        var list = eStorage.list,
                            item = { fn : fn, data : data, ctx : ctx, special : _special };
                        if(list.last) {
                            list.last.next = item;
                            item.prev = list.last;
                        } else {
                            list.first = item;
                        }

                        eStorage.ids[id] = list.last = item;
                    }
                }
            } else {
                var _this = this;
                $.each(e, function(e, fn) {
                    _this.on(e, fn, data, _special);
                });
            }

            return this;

        },

        onFirst : function(e, data, fn, ctx) {

            return this.on(e, data, fn, ctx, { one : true });

        },

        /**
         * Removing event handler(s)
         * @param {String} [e] Event type
         * @param {Function} [fn] Handler
         * @param {Object} [ctx] Handler context
         * @returns {$.observable}
         */
        un : function(e, fn, ctx) {

            if(typeof e == 'string' || typeof e == 'undefined') {
                var storage = this[storageExpando];
                if(storage) {
                    if(e) { // if event type was passed
                        var eList = e.split(' '),
                            i = 0,
                            eStorage;
                        while(e = eList[i++]) {
                            e = this.buildEventName(e);
                            if(eStorage = storage[e]) {
                                if(fn) {  // if specific handler was passed
                                    var id = getFnId(fn, ctx),
                                        ids = eStorage.ids;
                                    if(id in ids) {
                                        var list = eStorage.list,
                                            item = ids[id],
                                            prev = item.prev,
                                            next = item.next;

                                        if(prev) {
                                            prev.next = next;
                                        }
                                        else if(item === list.first) {
                                            list.first = next;
                                        }

                                        if(next) {
                                            next.prev = prev;
                                        }
                                        else if(item === list.last) {
                                            list.last = prev;
                                        }

                                        delete ids[id];
                                    }
                                } else {
                                    delete this[storageExpando][e];
                                }
                            }
                        }
                    } else {
                        delete this[storageExpando];
                    }
                }
            } else {
                var _this = this;
                $.each(e, function(e, fn) {
                    _this.un(e, fn, ctx);
                });
            }

            return this;

        },

        /**
         * Fires event handlers
         * @param {String|$.Event} e Event
         * @param {Object} [data] Additional data
         * @returns {$.observable}
         */
        trigger : function(e, data) {

            var _this = this,
                storage = _this[storageExpando],
                rawType;

            typeof e === 'string'?
                e = $.Event(_this.buildEventName(rawType = e)) :
                e.type = _this.buildEventName(rawType = e.type);

            e.target || (e.target = _this);

            if(storage && (storage = storage[e.type])) {
                var item = storage.list.first,
                    ret;
                while(item) {
                    e.data = item.data;
                    ret = item.fn.call(item.ctx || _this, e, data);
                    if(typeof ret !== 'undefined') {
                        e.result = ret;
                        if(ret === false) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }

                    item.special && item.special.one &&
                        _this.un(rawType, item.fn, item.ctx);
                    item = item.next;
                }
            }

            return this;

        }

    };

$.observable = $.inherit(Observable, Observable);

})(jQuery);
/* end: ../../blocks-desktop/i-jquery/__observable/i-jquery__observable.js */
/* begin: ../../blocks-desktop/i-jquery/__leftclick/i-jquery__leftclick.js */
/**
* leftClick event plugin
*
* Copyright (c) 2010 Filatov Dmitry (alpha@zforms.ru)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @version 1.0.0
*/

(function($) {

    var leftClick = $.event.special.leftclick = {

        setup: function() {

            $(this).bind('click', leftClick.handler);

        },

        teardown: function() {

            $(this).unbind('click', leftClick.handler);

        },

        handler: function(e) {

            if (!e.button) {
                e.type = 'leftclick';
                $.event.handle.apply(this, arguments);
                e.type = 'click';
            }

        }

    };

})(jQuery);

/* end: ../../blocks-desktop/i-jquery/__leftclick/i-jquery__leftclick.js */
/* begin: ../../blocks-desktop/i-bem/i-bem.js */
/** @requires jquery.inherit */
/** @requires jquery.isEmptyObject */
/** @requires jquery.identify */
/** @requires jquery.observable */

(function($, undefined) {

/**
 * Storage for deferred functions
 * @private
 * @type Array
 */
var afterCurrentEventFns = [],

/**
 * Storage for block declarations (hash by block name)
 * @private
 * @type Object
 */
    blocks = {},

/**
 * Communication channels
 * @static
 * @private
 * @type Object
 */
    channels = {};

/**
 * Builds the name of the handler method for setting a modifier
 * @static
 * @private
 * @param {String} elemName Element name
 * @param {String} modName Modifier name
 * @param {String} modVal Modifier value
 * @returns {String}
 */
function buildModFnName(elemName, modName, modVal) {

    return (elemName? '__elem_' + elemName : '') +
           '__mod' +
           (modName? '_' + modName : '') +
           (modVal? '_' + modVal : '');

}

/**
 * Transforms a hash of modifier handlers to methods
 * @static
 * @private
 * @param {Object} modFns
 * @param {Object} props
 * @param {String} [elemName]
 */
function modFnsToProps(modFns, props, elemName) {

    $.isFunction(modFns)?
        (props[buildModFnName(elemName, '*', '*')] = modFns) :
        $.each(modFns, function(modName, modFn) {
            $.isFunction(modFn)?
                (props[buildModFnName(elemName, modName, '*')] = modFn) :
                $.each(modFn, function(modVal, modFn) {
                    props[buildModFnName(elemName, modName, modVal)] = modFn;
                });
        });

}

function buildCheckMod(modName, modVal) {

    return modVal?
        Array.isArray(modVal)?
            function(block) {
                var i = 0, len = modVal.length;
                while(i < len)
                    if(block.hasMod(modName, modVal[i++]))
                        return true;
                return false;
            } :
            function(block) {
                return block.hasMod(modName, modVal);
            } :
        function(block) {
            return block.hasMod(modName);
        };

}

/** @namespace */
this.BEM = $.inherit($.observable, /** @lends BEM.prototype */ {

    /**
     * @class Base block for creating BEM blocks
     * @constructs
     * @private
     * @param {Object} mods Block modifiers
     * @param {Object} params Block parameters
     * @param {Boolean} [initImmediately=true]
     */
    __constructor : function(mods, params, initImmediately) {

        var _this = this;

        /**
         * Cache of block modifiers
         * @private
         * @type Object
         */
        _this._modCache = mods || {};

        /**
         * Current modifiers in the stack
         * @private
         * @type Object
         */
        _this._processingMods = {};

        /**
         * The block's parameters, taking into account the defaults
         * @protected
         * @type Object
         */
        _this._params = params; // это нужно для правильной сборки параметров у блока из нескольких нод
        _this.params = null;

        initImmediately !== false?
            _this._init() :
            _this.afterCurrentEvent(function() {
                _this._init();
            });

    },

    /**
     * Initializes the block
     * @private
     */
    _init : function() {

        if(!this._initing && !this.hasMod('js', 'inited')) {
            this._initing = true;

            if(!this.params) {
                this.params = $.extend(this.getDefaultParams(), this._params);
                delete this._params;
            }

            this.setMod('js', 'inited');
            delete this._initing;
            this.hasMod('js', 'inited') && this.trigger('init');
        }

        return this;

    },

    /**
     * Changes the context of the function being passed
     * @protected
     * @param {Function} fn
     * @param {Object} [ctx=this] Context
     * @returns {Function} Function with a modified context
     */
    changeThis : function(fn, ctx) {

        return fn.bind(ctx || this);

    },

    /**
     * Executes the function in the context of the block, after the "current event"
     * @protected
     * @param {Function} fn
     * @param {Object} [ctx] Context
     */
    afterCurrentEvent : function(fn, ctx) {

        this.__self.afterCurrentEvent(this.changeThis(fn, ctx));

    },

    /**
     * Executes the block's event handlers and live event handlers
     * @protected
     * @param {String} e Event name
     * @param {Object} [data] Additional information
     * @returns {BEM}
     */
    trigger : function(e, data) {

        this
            .__base(e = this.buildEvent(e), data)
            .__self.trigger(e, data);

        return this;

    },

    buildEvent : function(e) {

        typeof e == 'string' && (e = $.Event(e));
        e.block = this;

        return e;

    },

    /**
     * Checks whether a block or nested element has a modifier
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {Boolean}
     */
    hasMod : function(elem, modName, modVal) {

        var len = arguments.length,
            invert = false;

        if(len == 1) {
            modVal = '';
            modName = elem;
            elem = undefined;
            invert = true;
        }
        else if(len == 2) {
            if(typeof elem == 'string') {
                modVal = modName;
                modName = elem;
                elem = undefined;
            }
            else {
                modVal = '';
                invert = true;
            }
        }

        var res = this.getMod(elem, modName) === modVal;
        return invert? !res : res;

    },

    /**
     * Returns the value of the modifier of the block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @returns {String} Modifier value
     */
    getMod : function(elem, modName) {

        var type = typeof elem;
        if(type === 'string' || type === 'undefined') { // elem either omitted or undefined
            modName = elem || modName;
            var modCache = this._modCache;
            return modName in modCache?
                modCache[modName] :
                modCache[modName] = this._extractModVal(modName);
        }

        return this._getElemMod(modName, elem);

    },

    /**
     * Returns the value of the modifier of the nested element
     * @private
     * @param {String} modName Modifier name
     * @param {Object} elem Nested element
     * @param {Object} [elem] Nested element name
     * @returns {String} Modifier value
     */
    _getElemMod : function(modName, elem, elemName) {

        return this._extractModVal(modName, elem, elemName);

    },

    /**
     * Returns values of modifiers of the block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} [modName1, ..., modNameN] Modifier names
     * @returns {Object} Hash of modifier values
     */
    getMods : function(elem) {

        var hasElem = elem && typeof elem != 'string',
            _this = this,
            modNames = [].slice.call(arguments, hasElem? 1 : 0),
            res = _this._extractMods(modNames, hasElem? elem : undefined);

        if(!hasElem) { // caching
            modNames.length?
                modNames.forEach(function(name) {
                    _this._modCache[name] = res[name];
                }):
                _this._modCache = res;
        }

        return res;

    },

    /**
     * Sets the modifier for a block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @returns {BEM}
     */
    setMod : function(elem, modName, modVal) {

        if(typeof modVal == 'undefined') {
            modVal = modName;
            modName = elem;
            elem = undefined;
        }

        var _this = this;

        if(!elem || elem[0]) {

            var modId = (elem && elem[0]? $.identify(elem[0]) : '') + '_' + modName;

            if(this._processingMods[modId]) return _this;

            var elemName,
                curModVal = elem?
                    _this._getElemMod(modName, elem, elemName = _this.__self._extractElemNameFrom(elem)) :
                    _this.getMod(modName);

            if(curModVal === modVal) return _this;

            this._processingMods[modId] = true;

            var needSetMod = true,
                modFnParams = [modName, modVal, curModVal];

            elem && modFnParams.unshift(elem);

            [['*', '*'], [modName, '*'], [modName, modVal]].forEach(function(mod) {
                needSetMod = _this._callModFn(elemName, mod[0], mod[1], modFnParams) !== false && needSetMod;
            });

            !elem && needSetMod && (_this._modCache[modName] = modVal);

            needSetMod && _this._afterSetMod(modName, modVal, curModVal, elem, elemName);

            delete this._processingMods[modId];
        }

        return _this;

    },

    /**
     * Function after successfully changing the modifier of the block/nested element
     * @protected
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @param {String} oldModVal Old modifier value
     * @param {Object} [elem] Nested element
     * @param {String} [elemName] Element name
     */
    _afterSetMod : function(modName, modVal, oldModVal, elem, elemName) {},

    /**
     * Sets a modifier for a block/nested element, depending on conditions.
     * If the condition parameter is passed: when true, modVal1 is set; when false, modVal2 is set.
     * If the condition parameter is not passed: modVal1 is set if modVal2 was set, or vice versa.
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} modVal1 First modifier value
     * @param {String} [modVal2] Second modifier value
     * @param {Boolean} [condition] Condition
     * @returns {BEM}
     */
    toggleMod : function(elem, modName, modVal1, modVal2, condition) {

        if(typeof elem == 'string') { // if this is a block
            condition = modVal2;
            modVal2 = modVal1;
            modVal1 = modName;
            modName = elem;
            elem = undefined;
        }
        if(typeof modVal2 == 'undefined') {
            modVal2 = '';
        } else if(typeof modVal2 == 'boolean') {
            condition = modVal2;
            modVal2 = '';
        }

        var modVal = this.getMod(elem, modName);
        (modVal == modVal1 || modVal == modVal2) &&
            this.setMod(
                elem,
                modName,
                typeof condition === 'boolean'?
                    (condition? modVal1 : modVal2) :
                    this.hasMod(elem, modName, modVal1)? modVal2 : modVal1);

        return this;

    },

    /**
     * Removes a modifier from a block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @returns {BEM}
     */
    delMod : function(elem, modName) {

        if(!modName) {
            modName = elem;
            elem = undefined;
        }

        return this.setMod(elem, modName, '');

    },

    /**
     * Executes handlers for setting modifiers
     * @private
     * @param {String} elemName Element name
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @param {Array} modFnParams Handler parameters
     */
    _callModFn : function(elemName, modName, modVal, modFnParams) {

        var modFnName = buildModFnName(elemName, modName, modVal);
        return this[modFnName]?
           this[modFnName].apply(this, modFnParams) :
           undefined;

    },

    /**
     * Retrieves the value of the modifier
     * @private
     * @param {String} modName Modifier name
     * @param {Object} [elem] Element
     * @returns {String} Modifier value
     */
    _extractModVal : function(modName, elem) {

        return '';

    },

    /**
     * Retrieves name/value for a list of modifiers
     * @private
     * @param {Array} modNames Names of modifiers
     * @param {Object} [elem] Element
     * @returns {Object} Hash of modifier values by name
     */
    _extractMods : function(modNames, elem) {

        return {};

    },

    /**
     * Returns a named communication channel
     * @param {String} [id='default'] Channel ID
     * @param {Boolean} [drop=false] Destroy the channel
     * @returns {$.observable|undefined} Communication channel
     */
    channel : function(id, drop) {

        return this.__self.channel(id, drop);

    },

    /**
     * Returns a block's default parameters
     * @returns {Object}
     */
    getDefaultParams : function() {

        return {};

    },

    /**
     * Helper for cleaning up block properties
     * @param {Object} [obj=this]
     */
    del : function(obj) {

        var args = [].slice.call(arguments);
        typeof obj == 'string' && args.unshift(this);
        this.__self.del.apply(this.__self, args);
        return this;

	},

    /**
     * Deletes a block
     */
    destruct : function() {}

}, /** @lends BEM */{

    _name : 'i-bem',

    /**
     * Storage for block declarations (hash by block name)
     * @static
     * @protected
     * @type Object
     */
    blocks : blocks,

    /**
     * Declares blocks and creates a block class
     * @static
     * @protected
     * @param {String|Object} decl Block name (simple syntax) or description
     * @param {String} decl.block|decl.name Block name
     * @param {String} [decl.baseBlock] Name of the parent block
     * @param {String} [decl.modName] Modifier name
     * @param {String} [decl.modVal] Modifier value
     * @param {Object} [props] Methods
     * @param {Object} [staticProps] Static methods
     */
    decl : function(decl, props, staticProps) {

        if(typeof decl == 'string')
            decl = { block : decl };
        else if(decl.name) {
            decl.block = decl.name;
        }

        if(decl.baseBlock && !blocks[decl.baseBlock])
            throw('baseBlock "' + decl.baseBlock + '" for "' + decl.block + '" is undefined');

        props || (props = {});

        if(props.onSetMod) {
            modFnsToProps(props.onSetMod, props);
            delete props.onSetMod;
        }

        if(props.onElemSetMod) {
            $.each(props.onElemSetMod, function(elemName, modFns) {
                modFnsToProps(modFns, props, elemName);
            });
            delete props.onElemSetMod;
        }

        var baseBlock = blocks[decl.baseBlock || decl.block] || this;

        if(decl.modName) {
            var checkMod = buildCheckMod(decl.modName, decl.modVal);
            $.each(props, function(name, prop) {
                $.isFunction(prop) &&
                    (props[name] = function() {
                        var method;
                        if(checkMod(this)) {
                            method = prop;
                        } else {
                            var baseMethod = baseBlock.prototype[name];
                            baseMethod && baseMethod !== props[name] &&
                                (method = this.__base);
                        }
                        return method?
                            method.apply(this, arguments) :
                            undefined;
                    });
            });
        }

        if(staticProps && typeof staticProps.live === 'boolean') {
            var live = staticProps.live;
            staticProps.live = function() {
                return live;
            };
        }

        var block;
        decl.block == baseBlock._name?
            // makes a new "live" if the old one was already executed
            (block = $.inheritSelf(baseBlock, props, staticProps))._processLive(true) :
            (block = blocks[decl.block] = $.inherit(baseBlock, props, staticProps))._name = decl.block;

        return block;

    },

    /**
     * Processes a block's live properties
     * @private
     * @param {Boolean} [heedLive=false] Whether to take into account that the block already processed its live properties
     * @returns {Boolean} Whether the block is a live block
     */
    _processLive : function(heedLive) {

        return false;

    },

    /**
     * Factory method for creating an instance of the block named
     * @static
     * @param {String|Object} block Block name or description
     * @param {Object} [params] Block parameters
     * @returns {BEM}
     */
    create : function(block, params) {

        typeof block == 'string' && (block = { block : block });

        return new blocks[block.block](block.mods, params);

    },

    /**
     * Returns the name of the current block
     * @static
     * @protected
     * @returns {String}
     */
    getName : function() {

        return this._name;

    },

    /**
     * Retrieves the name of an element nested in a block
     * @static
     * @private
     * @param {Object} elem Nested element
     * @returns {String|undefined}
     */
    _extractElemNameFrom : function(elem) {},

    /**
     * Adds a function to the queue for executing after the "current event"
     * @static
     * @protected
     * @param {Function} fn
     * @param {Object} ctx
     */
    afterCurrentEvent : function(fn, ctx) {

        afterCurrentEventFns.push({ fn : fn, ctx : ctx }) == 1 &&
            setTimeout(this._runAfterCurrentEventFns, 0);

    },

    /**
     * Executes the queue
     * @private
     */
    _runAfterCurrentEventFns : function() {

        var fnsLen = afterCurrentEventFns.length;
        if(fnsLen) {
            var fnObj,
                fnsCopy = afterCurrentEventFns.splice(0, fnsLen);

            while(fnObj = fnsCopy.shift()) fnObj.fn.call(fnObj.ctx || this);
        }

    },

    /**
     * Changes the context of the function being passed
     * @protected
     * @param {Function} fn
     * @param {Object} ctx Context
     * @returns {Function} Function with a modified context
     */
    changeThis : function(fn, ctx) {

        return fn.bind(ctx || this);

    },

    /**
     * Helper for cleaning out properties
     * @param {Object} [obj=this]
     */
    del : function(obj) {

        var delInThis = typeof obj == 'string',
            i = delInThis? 0 : 1,
            len = arguments.length;
        delInThis && (obj = this);

        while(i < len) delete obj[arguments[i++]];

        return this;

	},

    /**
     * Returns/destroys a named communication channel
     * @param {String} [id='default'] Channel ID
     * @param {Boolean} [drop=false] Destroy the channel
     * @returns {$.observable|undefined} Communication channel
     */
    channel : function(id, drop) {

        if(typeof id == 'boolean') {
            drop = id;
            id = undefined;
        }

        id || (id = 'default');

        if(drop) {
            if(channels[id]) {
                channels[id].un();
                delete channels[id];
            }
            return;
        }

        return channels[id] || (channels[id] = new $.observable());

    }

});

})(jQuery);
/* end: ../../blocks-desktop/i-bem/i-bem.js */
/* begin: ../../blocks-common/i-ecma/__object/i-ecma__object.js */
(function() {
/**
 * Возвращает массив свойств объекта
 * @param {Object} obj объект
 * @returns {Array}
 */
Object.keys || (Object.keys = function(obj) {
    var res = [];

    for (var i in obj) obj.hasOwnProperty(i) &&
        res.push(i);

    return res;
});
})();

/* end: ../../blocks-common/i-ecma/__object/i-ecma__object.js */
/* begin: ../../blocks-common/i-ecma/__array/i-ecma__array.js */
(function() {

var ptp = Array.prototype,
    toStr = Object.prototype.toString,
    methods = {

        /**
         * Finds the index of an element in an array
         * @param {Object} item
         * @param {Number} [fromIdx] Starting from index (length - 1 - fromIdx, if fromIdx < 0)
         * @returns {Number} Element index or -1, if not found
         */
        indexOf: function(item, fromIdx) {

            fromIdx = +(fromIdx || 0);

            var t = this, len = t.length;

            if (len > 0 && fromIdx < len) {
                fromIdx = fromIdx < 0 ? Math.ceil(fromIdx) : Math.floor(fromIdx);
                fromIdx < -len && (fromIdx = 0);
                fromIdx < 0 && (fromIdx = fromIdx + len);

                while (fromIdx < len) {
                    if (fromIdx in t && t[fromIdx] === item)
                        return fromIdx;
                    ++fromIdx;
                }
            }

            return -1;

        },

        /**
         * Calls the callback for each element
         * @param {Function} callback Called for each element
         * @param {Object} [ctx=null] Callback context
         */
        forEach: function(callback, ctx) {

            var i = -1, t = this, len = t.length;
            while (++i < len) i in t &&
                (ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));

        },

        /**
         * Creates array B from array A so that B[i] = callback(A[i])
         * @param {Function} callback Called for each element
         * @param {Object} [ctx=null] Callback context
         * @returns {Array}
         */
        map: function(callback, ctx) {

            var i = -1, t = this, len = t.length,
                res = new Array(len);

            while (++i < len) i in t &&
                (res[i] = ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));

            return res;

        },

        /**
         * Creates an array containing only the elements from the source array that the callback returns true for. 
         * @param {Function} callback Called for each element
         * @param {Object} [ctx] Callback context
         * @returns {Array}
         */
        filter: function(callback, ctx) {

            var i = -1, t = this, len = t.length,
                res = [];

            while (++i < len) i in t &&
                (ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)) && res.push(t[i]);

            return res;

        },

        /**
         * Wraps the array using an accumulator
         * @param {Function} callback Called for each element
         * @param {Object} [initialVal] Initial value of the accumulator
         * @returns {Object} Accumulator
         */
        reduce: function(callback, initialVal) {

            var i = -1, t = this, len = t.length,
                res;

            if (arguments.length < 2) {
                while (++i < len) {
                    if (i in t) {
                        res = t[i];
                        break;
                    }
                }
            } else {
                res = initialVal;
            }

            while (++i < len) i in t &&
                (res = callback(res, t[i], i, t));

            return res;

        },

        /**
         * Checks whether at least one element in the array meets the condition in the callback
         * @param {Function} callback
         * @param {Object} [ctx=this] Callback context
         * @returns {Boolean}
         */
        some: function(callback, ctx) {

            var i = -1, t = this, len = t.length;

            while (++i < len)
                if (i in t && (ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)))
                    return true;

            return false;

        },

        /**
         * Checks whether every element in the array meets the condition in the callback
         * @param {Function} callback
         * @param {Object} [ctx=this] Context of the callback call
         * @returns {Boolean}
         */
        every: function(callback, ctx) {

            var i = -1, t = this, len = t.length;

            while (++i < len)
                if (i in t && !(ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)))
                    return false;

            return true;

        }

    };

for (var name in methods)
    ptp[name] || (ptp[name] = methods[name]);

Array.isArray || (Array.isArray = function(obj) {
    return toStr.call(obj) === '[object Array]';
});

})();

/* end: ../../blocks-common/i-ecma/__array/i-ecma__array.js */
/* begin: ../../blocks-common/i-ecma/__function/i-ecma__function.js */
(function() {
var slice = Array.prototype.slice;

Function.prototype.bind || (Function.prototype.bind = function(ctx) {
    var fn = this,
        args = slice.call(arguments, 1);

    return function () {
        return fn.apply(ctx, args.concat(slice.call(arguments)));
    };
});
})();

/* end: ../../blocks-common/i-ecma/__function/i-ecma__function.js */
/* begin: ../../blocks-desktop/i-bem/__internal/i-bem__internal.js */
/** @fileOverview Module for internal BEM helpers */
/** @requires BEM */

(function(BEM, $, undefined) {

/**
 * Separator for modifiers and their values
 * @const
 * @type String
 */
var MOD_DELIM = '_',

/**
 * Separator between names of a block and a nested element
 * @const
 * @type String
 */
    ELEM_DELIM = '__',

/**
 * Pattern for acceptable element and modifier names
 * @const
 * @type String
 */
    NAME_PATTERN = '[a-zA-Z0-9-]+';

function buildModPostfix(modName, modVal, buffer) {

    buffer.push(MOD_DELIM, modName, MOD_DELIM, modVal);

}

function buildBlockClass(name, modName, modVal, buffer) {

    buffer.push(name);
    modVal && buildModPostfix(modName, modVal, buffer);

}

function buildElemClass(block, name, modName, modVal, buffer) {

    buildBlockClass(block, undefined, undefined, buffer);
    buffer.push(ELEM_DELIM, name);
    modVal && buildModPostfix(modName, modVal, buffer);

}

BEM.INTERNAL = {

    NAME_PATTERN : NAME_PATTERN,

    MOD_DELIM : MOD_DELIM,
    ELEM_DELIM : ELEM_DELIM,

    buildModPostfix : function(modName, modVal, buffer) {

        var res = buffer || [];
        buildModPostfix(modName, modVal, res);
        return buffer? res : res.join('');

    },

    /**
     * Builds the class of a block or element with a modifier
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @param {Array} [buffer] Buffer
     * @returns {String|Array} Class or buffer string (depending on whether the buffer parameter is present)
     */
    buildClass : function(block, elem, modName, modVal, buffer) {

        var typeOf = typeof modName;
        if(typeOf == 'string') {
            if(typeof modVal != 'string' && typeof modVal != 'number') {
                buffer = modVal;
                modVal = modName;
                modName = elem;
                elem = undefined;
            }
        } else if(typeOf != 'undefined') {
            buffer = modName;
            modName = undefined;
        } else if(elem && typeof elem != 'string') {
            buffer = elem;
            elem = undefined;
        }

        if(!(elem || modName || buffer)) { // оптимизация для самого простого случая
            return block;
        }

        var res = buffer || [];

        elem?
            buildElemClass(block, elem, modName, modVal, res) :
            buildBlockClass(block, modName, modVal, res);

        return buffer? res : res.join('');

    },

    /**
     * Builds full classes for a buffer or element with modifiers
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {Object} [mods] Modifiers
     * @param {Array} [buffer] Buffer
     * @returns {String|Array} Class or buffer string (depending on whether the buffer parameter is present)
     */
    buildClasses : function(block, elem, mods, buffer) {

        if(elem && typeof elem != 'string') {
            buffer = mods;
            mods = elem;
            elem = undefined;
        }

        var res = buffer || [];

        elem?
            buildElemClass(block, elem, undefined, undefined, res) :
            buildBlockClass(block, undefined, undefined, res);

        mods && $.each(mods, function(modName, modVal) {
            if(modVal) {
                res.push(' ');
                elem?
                    buildElemClass(block, elem, modName, modVal, res) :
                    buildBlockClass(block, modName, modVal, res);
            }
        });

        return buffer? res : res.join('');

        /*var typeOf = typeof elem;
        if(typeOf != 'string' && typeOf != 'undefined') {
            buffer = mods;
            mods = elem;
            elem = undefined;
        }
        if($.isArray(mods)) {
            buffer = mods;
            mods = undefined;
        }

        var res = buffer || [];
        buildClasses(block, elem, mods, res);
        return buffer? res : res.join('');*/

    }

}

})(BEM, jQuery);
/* end: ../../blocks-desktop/i-bem/__internal/i-bem__internal.js */
/* begin: ../../blocks-desktop/i-bem/__dom/i-bem__dom.js */
/** @requires BEM */
/** @requires BEM.INTERNAL */

(function(BEM, $, undefined) {

var win = $(window),
    doc = $(document),

/**
 * Storage for DOM elements by unique key
 * @private
 * @type Object
 */
    uniqIdToDomElems = {},

/**
 * Storage for blocks by unique key
 * @static
 * @private
 * @type Object
 */
    uniqIdToBlock = {},

/**
 * Storage for block parameters
 * @private
 * @type Object
 */
    domElemToParams = {},

/**
 * Storage for liveCtx event handlers
 * @private
 * @type Object
 */
    liveEventCtxStorage = {},

/**
 * Storage for liveClass event handlers
 * @private
 * @type Object
 */
    liveClassEventStorage = {},

    blocks = BEM.blocks,

    INTERNAL = BEM.INTERNAL,

    NAME_PATTERN = INTERNAL.NAME_PATTERN,

    MOD_DELIM = INTERNAL.MOD_DELIM,
    ELEM_DELIM = INTERNAL.ELEM_DELIM,

    buildModPostfix = INTERNAL.buildModPostfix,
    buildClass = INTERNAL.buildClass;

/**
 * Initializes blocks on a DOM element
 * @private
 * @param {jQuery} domElem DOM element
 * @param {String} uniqInitId ID of the "initialization wave"
 */
function init(domElem, uniqInitId) {

    var domNode = domElem[0];
    $.each(getParams(domNode), function(blockName, params) {
        processParams(params, domNode, blockName, uniqInitId);
        var block = uniqIdToBlock[params.uniqId];
        if(block) {
            if(block.domElem.index(domNode) < 0) {
                block.domElem = block.domElem.add(domElem);
                $.extend(block._params, params);
            }
        } else {
            initBlock(blockName, domElem, params);
        }
    });

}

/**
 * Initializes a specific block on a DOM element, or returns the existing block if it was already created
 * @private
 * @param {String} blockName Block name
 * @param {jQuery} domElem DOM element
 * @param {Object} [params] Initialization parameters
 * @param {Boolean} [forceLive] Force live initialization
 * @param {Function} [callback] Handler to call after complete initialization
 */
function initBlock(blockName, domElem, params, forceLive, callback) {

    if(typeof params == 'boolean') {
        callback = forceLive;
        forceLive = params;
        params = undefined;
    }

    var domNode = domElem[0];
    params = processParams(params || getParams(domNode)[blockName], domNode, blockName);

    var uniqId = params.uniqId;
    if(uniqIdToBlock[uniqId]) {
        return uniqIdToBlock[uniqId]._init();
    }

    uniqIdToDomElems[uniqId] = uniqIdToDomElems[uniqId]?
        uniqIdToDomElems[uniqId].add(domElem) :
        domElem;

    var parentDomNode = domNode.parentNode;
    if(!parentDomNode || parentDomNode.nodeType === 11) { // jquery doesn't unique disconnected node
        $.unique(uniqIdToDomElems[uniqId]);
    }

    var blockClass = blocks[blockName] || DOM.decl(blockName, {}, { live : true });
    if(!(blockClass._liveInitable = !!blockClass._processLive()) || forceLive || params.live === false) {
        forceLive && domElem.addClass('i-bem');

        var block = new blockClass(uniqIdToDomElems[uniqId], params, !!forceLive);
        delete uniqIdToDomElems[uniqId];
        callback && callback.apply(block, Array.prototype.slice.call(arguments, 4));
        return block;
    }

}

/**
 * Processes and adds necessary block parameters
 * @private
 * @param {Object} params Initialization parameters
 * @param {HTMLElement} domNode DOM node
 * @param {String} blockName Block name
 * @param {String} [uniqInitId] ID of the "initialization wave"
 */
function processParams(params, domNode, blockName, uniqInitId) {

    (params || (params = {})).uniqId ||
        (params.uniqId = (params.id? blockName + '-id-' + params.id : $.identify()) + (uniqInitId || $.identify()));

    var domUniqId = $.identify(domNode),
        domParams = domElemToParams[domUniqId] || (domElemToParams[domUniqId] = {});

    domParams[blockName] || (domParams[blockName] = params);

    return params;

}

/**
 * Helper for searching for a DOM element using a selector inside the context, including the context itself
 * @private
 * @param {jQuery} ctx Context
 * @param {String} selector CSS selector
 * @param {Boolean} [excludeSelf=false] Exclude context from search
 * @returns {jQuery}
 */
function findDomElem(ctx, selector, excludeSelf) {

    var res = ctx.find(selector);
    return excludeSelf?
       res :
       res.add(ctx.filter(selector));

}

/**
 * Returns parameters of a block's DOM element
 * @private
 * @param {HTMLElement} domNode DOM node
 * @returns {Object}
 */
function getParams(domNode) {

    var uniqId = $.identify(domNode);
    return domElemToParams[uniqId] ||
           (domElemToParams[uniqId] = extractParams(domNode));

}

/**
 * Retrieves block parameters from a DOM element
 * @private
 * @param {HTMLElement} domNode DOM node
 * @returns {Object}
 */
function extractParams(domNode) {

    var fn, elem,
        attr = domNode.getAttribute('data-bem');

    if (attr) return $.parseJSON(attr);

    fn = domNode.onclick || domNode.ondblclick;
    if(!fn && domNode.tagName.toLowerCase() == 'body') { // LEGO-2027 in FF onclick doesn't work on body
        elem = $(domNode);
        attr = elem.attr('onclick') || elem.attr('ondblclick');
        attr && (fn = Function(attr));
    }

    return fn? fn() : {};

}

/**
 * Cleans up all the BEM storages associated with a DOM node
 * @private
 * @param {HTMLElement} domNode DOM node
 */
function cleanupDomNode(domNode) {

    delete domElemToParams[$.identify(domNode)];
    domNode.onclick = null;

}

/**
 * Uncople DOM node from the block. If this is the last node, then destroys the block.
 * @private
 * @param {BEM.DOM} block block
 * @param {HTMLElement} domNode DOM node
 */
function removeDomNodeFromBlock(block, domNode) {

    block.domElem.length === 1?
        block.destruct(true) :
        block.domElem = block.domElem.not(domNode);

}

/**
 * Returns a DOM node for calculating the window size in IE
 * @returns {HTMLElement}
 */
function getClientNode() {

    return doc[0][$.support.boxModel? 'documentElement' : 'body'];

}

/**
 * Returns a block on a DOM element and initializes it if necessary
 * @param {String} blockName Block name
 * @param {Object} params Block parameters
 * @returns {BEM}
 */
$.fn.bem = function(blockName, params) {
    return initBlock(blockName, this, params, true);
};

/**
 * @namespace
 * @name BEM.DOM
 */
var DOM = BEM.DOM = BEM.decl('i-bem__dom',/** @lends BEM.DOM.prototype */{
    /**
     * @class Base block for creating BEM blocks that have DOM representation
     * @constructs
     * @private
     * @param {jQuery} domElem DOM element that the block is created on
     * @param {Object} params Block parameters
     * @param {Boolean} [initImmediately=true]
     */
    __constructor : function(domElem, params, initImmediately) {

        var _this = this;

        /**
         * Block's DOM elements
         * @protected
         * @type jQuery
         */
        _this.domElem = domElem;

        /**
         * Cache for names of events on DOM elements
         * @private
         * @type Object
         */
        _this._eventNameCache = {};

        /**
         * Cache for elements
         * @private
         * @type Object
         */
        _this._elemCache = {};

        /**
         * Unique block ID
         * @private
         * @type String
         */
        uniqIdToBlock[_this._uniqId = params.uniqId || $.identify(_this)] = _this;

        /**
         * Flag for whether it's necessary to unbind from the document and window when destroying the block
         * @private
         * @type Boolean
         */
        _this._needSpecialUnbind = false;

        _this.__base(null, params, initImmediately);

    },

    /**
     * Finds blocks inside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM[]}
     */
    findBlocksInside : function(elem, block) {

        return this._findBlocks('find', elem, block);

    },

    /**
     * Finds the first block inside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM}
     */
    findBlockInside : function(elem, block) {

        return this._findBlocks('find', elem, block, true);

    },

    /**
     * Finds blocks outside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM[]}
     */
    findBlocksOutside : function(elem, block) {

        return this._findBlocks('parents', elem, block);

    },

    /**
     * Finds the first block outside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM}
     */
    findBlockOutside : function(elem, block) {

        return this._findBlocks('closest', elem, block)[0] || null;

    },

    /**
     * Finds blocks on DOM elements of the current block or its elements
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM[]}
     */
    findBlocksOn : function(elem, block) {

        return this._findBlocks('', elem, block);

    },

    /**
     * Finds the first block on DOM elements of the current block or its elements
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM}
     */
    findBlockOn : function(elem, block) {

        return this._findBlocks('', elem, block, true);

    },

    _findBlocks : function(select, elem, block, onlyFirst) {

        if(!block) {
            block = elem;
            elem = undefined;
        }

        var ctxElem = elem?
                (typeof elem == 'string'? this.findElem(elem) : elem) :
                this.domElem,
            isSimpleBlock = typeof block == 'string',
            blockName = isSimpleBlock? block : (block.block || block.blockName),
            selector = '.' +
                (isSimpleBlock?
                    buildClass(blockName) :
                    buildClass(blockName, block.modName, block.modVal)) +
                (onlyFirst? ':first' : ''),
            domElems = ctxElem.filter(selector);

        select && (domElems = domElems.add(ctxElem[select](selector)));

        if(onlyFirst) {
            return domElems[0]? initBlock(blockName, domElems.eq(0), true) : null;
        }

        var res = [],
            uniqIds = {};

        $.each(domElems, function(i, domElem) {
            var block = initBlock(blockName, $(domElem), true);
            if(!uniqIds[block._uniqId]) {
                uniqIds[block._uniqId] = true;
                res.push(block);
            }
        });

        return res;

    },

    /**
     * Adds an event handler for any DOM element
     * @protected
     * @param {jQuery} domElem DOM element where the event will be listened for
     * @param {String|Object} event Event name or event object
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindToDomElem : function(domElem, event, fn) {

        var _this = this;

        fn?
            domElem.bind(
                _this._buildEventName(event),
                function(e) {
                    (e.data || (e.data = {})).domElem = $(this);
                    return fn.apply(_this, arguments);
                }
            ) :
            $.each(event, function(event, fn) {
                _this.bindToDomElem(domElem, event, fn);
            });

        return _this;

    },

    /**
     * Adds an event handler to the document
     * @protected
     * @param {String} event Event name
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindToDoc : function(event, fn) {

        this._needSpecialUnbind = true;
        return this.bindToDomElem(doc, event, fn);

    },

    /**
     * Adds an event handler to the window
     * @protected
     * @param {String} event Event name
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindToWin : function(event, fn) {

        var _fn = fn,
            currentHeight,
            currentWidth;

        if (event === 'resize') {

            fn = function() {

                var height = win.height(),
                    width = win.width();

                if (currentHeight !== height || currentWidth !== width) {

                    currentHeight = height;
                    currentWidth = width;

                    _fn.apply(this, arguments);

                }


            }

        }

        this._needSpecialUnbind = true;
        return this.bindToDomElem(win, event, fn);

    },

    /**
     * Adds an event handler to the block's main DOM elements or its nested elements
     * @protected
     * @param {jQuery|String} [elem] Element
     * @param {String} event Event name
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindTo : function(elem, event, fn) {

        if(!event || $.isFunction(event)) { // if there is no element
            fn = event;
            event = elem;
            elem = this.domElem;
        } else if(typeof elem == 'string') {
            elem = this.elem(elem);
        }

        return this.bindToDomElem(elem, event, fn);

    },

    /**
     * Removes event handlers from any DOM element
     * @protected
     * @param {jQuery} domElem DOM element where the event was being listened for
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFromDomElem : function(domElem, event) {

        domElem.unbind(this._buildEventName(event));
        return this;

    },

    /**
     * Removes event handler from document
     * @protected
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFromDoc : function(event) {

        return this.unbindFromDomElem(doc, event);

    },

    /**
     * Removes event handler from window
     * @protected
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFromWin : function(event) {

        return this.unbindFromDomElem(win, event);

    },

    /**
     * Removes event handlers from the block's main DOM elements or its nested elements
     * @protected
     * @param {jQuery|String} [elem] Nested element
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFrom : function(elem, event) {

        if(!event) {
            event = elem;
            elem = this.domElem;
        } else if(typeof elem == 'string') {
            elem = this.elem(elem);
        }

        return this.unbindFromDomElem(elem, event);

    },

    /**
     * Builds a full name for an event
     * @private
     * @param {String} event Event name
     * @returns {String}
     */
    _buildEventName : function(event) {

        var _this = this;
        return event.indexOf(' ') > 1?
            event.split(' ').map(function(e) {
                return _this._buildOneEventName(e);
            }).join(' ') :
            _this._buildOneEventName(event);

    },

    /**
     * Builds a full name for a single event
     * @private
     * @param {String} event Event name
     * @returns {String}
     */
    _buildOneEventName : function(event) {

        var _this = this,
            eventNameCache = _this._eventNameCache;

        if(event in eventNameCache) return eventNameCache[event];

        var uniq = '.' + _this._uniqId;

        if(event.indexOf('.') < 0) return eventNameCache[event] = event + uniq;

        var lego = '.bem_' + _this.__self._name;

        return eventNameCache[event] = event.split('.').map(function(e, i) {
            return i == 0? e + lego : lego + '_' + e;
        }).join('') + uniq;

    },

    /**
     * Triggers block event handlers and live event handlers
     * @protected
     * @param {String} e Event name
     * @param {Object} [data] Additional information
     * @returns {BEM}
     */
    trigger : function(e, data) {

        this
            .__base(e = this.buildEvent(e), data)
            .domElem && this._ctxTrigger(e, data);

        return this;

    },

    _ctxTrigger : function(e, data) {

        var _this = this,
            storage = liveEventCtxStorage[_this.__self._buildCtxEventName(e.type)],
            ctxIds = {};

        storage && _this.domElem.each(function() {
            var ctx = this,
                counter = storage.counter;
            while(ctx && counter) {
                var ctxId = $.identify(ctx, true);
                if(ctxId) {
                    if(ctxIds[ctxId]) break;
                    var storageCtx = storage.ctxs[ctxId];
                    if(storageCtx) {
                        $.each(storageCtx, function(uniqId, handler) {
                            handler.fn.call(
                                handler.ctx || _this,
                                e,
                                data);
                        });
                        counter--;
                    }
                    ctxIds[ctxId] = true;
                }
                ctx = ctx.parentNode;
            }
        });

    },

    /**
     * Sets a modifier for a block/nested element
     * @protected
     * @param {jQuery} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @returns {BEM}
     */
    setMod : function(elem, modName, modVal) {

        if(elem && typeof modVal != 'undefined' && elem.length > 1) {
            var _this = this;
            elem.each(function() {
                var item = $(this);
                item.__bemElemName = elem.__bemElemName;
                _this.setMod(item, modName, modVal);
            });
            return _this;
        }
        return this.__base(elem, modName, modVal);

    },

    /**
     * Retrieves modifier value from the DOM node's CSS class
     * @private
     * @param {String} modName Modifier name
     * @param {jQuery} [elem] Nested element
     * @param {String} [elemName] Name of the nested element
     * @returns {String} Modifier value
     */
    _extractModVal : function(modName, elem, elemName) {

        var domNode = (elem || this.domElem)[0],
            matches;

        domNode &&
            (matches = domNode.className
                .match(this.__self._buildModValRE(modName, elemName || elem)));

        return matches? matches[2] : '';

    },

    /**
     * Retrieves a name/value list of modifiers
     * @private
     * @param {Array} [modNames] Names of modifiers
     * @param {Object} [elem] Element
     * @returns {Object} Hash of modifier values by names
     */
    _extractMods : function(modNames, elem) {

        var res = {},
            extractAll = !modNames.length,
            countMatched = 0;

        ((elem || this.domElem)[0].className
            .match(this.__self._buildModValRE(
                '(' + (extractAll? NAME_PATTERN : modNames.join('|')) + ')',
                elem,
                'g')) || []).forEach(function(className) {
                    var iModVal = (className = className.trim()).lastIndexOf(MOD_DELIM),
                        iModName = className.substr(0, iModVal - 1).lastIndexOf(MOD_DELIM);
                    res[className.substr(iModName + 1, iModVal - iModName - 1)] = className.substr(iModVal + 1);
                    ++countMatched;
                });

        // empty modifier values are not reflected in classes; they must be filled with empty values
        countMatched < modNames.length && modNames.forEach(function(modName) {
            modName in res || (res[modName] = '');
        });

        return res;

    },

    /**
     * Sets a modifier's CSS class for a block's DOM element or nested element
     * @private
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @param {String} oldModVal Old modifier value
     * @param {jQuery} [elem] Element
     * @param {String} [elemName] Element name
     */
    _afterSetMod : function(modName, modVal, oldModVal, elem, elemName) {

        var _self = this.__self,
            classPrefix = _self._buildModClassPrefix(modName, elemName),
            classRE = _self._buildModValRE(modName, elemName),
            needDel = modVal === '';

        (elem || this.domElem).each(function() {
            var className = this.className;
            className.indexOf(classPrefix) > -1?
                this.className = className.replace(
                    classRE,
                    (needDel? '' : '$1' + classPrefix + modVal)) :
                needDel || $(this).addClass(classPrefix + modVal);
        });

        elemName && this
            .dropElemCache(elemName, modName, oldModVal)
            .dropElemCache(elemName, modName, modVal);

    },

    /**
     * Finds elements nested in a block
     * @protected
     * @param {String|jQuery} [ctx=this.domElem] Element where search is being performed
     * @param {String} names Nested element name (or names separated by spaces)
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {jQuery} DOM elements
     */
    findElem : function(ctx, names, modName, modVal) {

        if(arguments.length % 2) { // if the number of arguments is one or three
            modVal = modName;
            modName = names;
            names = ctx;
            ctx = this.domElem;
        } else if(typeof ctx == 'string') {
            ctx = this.findElem(ctx);
        }

        var _self = this.__self,
            selector = '.' +
                names.split(' ').map(function(name) {
                    return buildClass(_self._name, name, modName, modVal);
                }).join(',.');
        return findDomElem(ctx, selector);

    },

    /**
     * Finds elements nested in a block
     * @protected
     * @param {String} name Nested element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {jQuery} DOM elements
     */
    _elem : function(name, modName, modVal) {

        var key = name + buildModPostfix(modName, modVal),
            res;

        if(!(res = this._elemCache[key])) {
            res = this._elemCache[key] = this.findElem(name, modName, modVal);
            res.__bemElemName = name;
        }

        return res;

    },

    /**
     * Lazy search for elements nested in a block (caches results)
     * @protected
     * @param {String} names Nested element name (or names separated by spaces)
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {jQuery} DOM elements
     */
    elem : function(names, modName, modVal) {

        if(modName && typeof modName != 'string') {
            modName.__bemElemName = names;
            return modName;
        }

        if(names.indexOf(' ') < 0) {
            return this._elem(names, modName, modVal);
        }

        var res = $([]),
            _this = this;
        names.split(' ').forEach(function(name) {
            res = res.add(_this._elem(name, modName, modVal));
        });
        return res;

    },

    /**
     * Clearing the cache for elements
     * @protected
     * @param {String} [names] Nested element name (or names separated by spaces)
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {BEM}
     */
    dropElemCache : function(names, modName, modVal) {

        if(names) {
            var _this = this,
                modPostfix = buildModPostfix(modName, modVal);
            names.indexOf(' ') < 0?
                delete _this._elemCache[names + modPostfix] :
                names.split(' ').forEach(function(name) {
                    delete _this._elemCache[name + modPostfix];
                });
        } else {
            this._elemCache = {};
        }

        return this;

    },

    /**
     * Retrieves parameters of a block element
     * @param {String|jQuery} elem Element
     * @returns {Object} Parameters
     */
    elemParams : function(elem) {

        var elemName;
        if(typeof elem ==  'string') {
            elemName = elem;
            elem = this.elem(elem);
        } else {
            elemName = this.__self._extractElemNameFrom(elem);
        }

        return extractParams(elem[0])[buildClass(this.__self.getName(), elemName)] || {};

    },

    /**
     * Elemify given element
     * @param {jQuery} elem Element
     * @param {String} elemName Name
     * @returns {jQuery}
     */
    elemify : function(elem, elemName) {
        (elem = $(elem)).__bemElemName = elemName;
        return elem;
    },

    /**
     * Checks whether a DOM element is in a block
     * @protected
     * @param {jQuery} domElem DOM element
     * @returns {Boolean}
     */
    containsDomElem : function(domElem) {

        var res = false;

        this.domElem.each(function() {
            return !(res = domElem.parents().andSelf().index(this) > -1);
        });

        return res;

    },

    /**
     * Builds a CSS selector corresponding to a block/element and modifier
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {String}
     */
    buildSelector : function(elem, modName, modVal) {

        return this.__self.buildSelector(elem, modName, modVal);

    },

    /**
     * Deletes a block
     * @param {Boolean} [keepDOM=false] Whether to keep the block's DOM nodes in the document
     */
    destruct : function(keepDOM) {

        var _this = this,
            _self = _this.__self;

        _this._isDestructing = true;

        _this._needSpecialUnbind && _self.doc.add(_self.win).unbind('.' + _this._uniqId);

        _this.dropElemCache().domElem.each(function(i, domNode) {
            var params = getParams(domNode);
            $.each(params, function(blockName, blockParams) {
                var block = uniqIdToBlock[blockParams.uniqId];
                block?
                    block._isDestructing || removeDomNodeFromBlock(block, domNode) :
                    delete uniqIdToDomElems[blockParams.uniqId];
            });
            cleanupDomNode(domNode);
        });

        keepDOM || _this.domElem.remove();

        delete uniqIdToBlock[_this.un()._uniqId];
        delete _this.domElem;
        delete _this._elemCache;

        _this.__base();

    }

}, /** @lends BEM.DOM */{

    /**
     * Scope
     * Will be set on onDomReady to tag `body`
     * @protected
     * @type jQuery
     */
    scope : null,

    /**
     * Document shortcut
     * @protected
     * @type jQuery
     */
    doc : doc,

    /**
     * Window shortcut
     * @protected
     * @type jQuery
     */
    win : win,

    /**
     * Processes a block's live properties
     * @private
     * @param {Boolean} [heedLive=false] Whether to take into account that the block already processed its live properties
     * @returns {Boolean} Whether the block is a live block
     */
    _processLive : function(heedLive) {

        var _this = this,
            res = _this._liveInitable;

        if('live' in _this) {
            var noLive = typeof res == 'undefined';

            if(noLive ^ heedLive) {
                res = _this.live() !== false;
                _this.live = function() {};
            }
        }

        return res;

    },

    /**
     * Initializes blocks on a fragment of the DOM tree
     * @static
     * @protected
     * @param {jQuery} [ctx=document] Root DOM node
     * @returns {jQuery} ctx Initialization context
     */
    init : function(ctx, callback, callbackCtx) {

        if(!ctx || $.isFunction(ctx)) {
            callbackCtx = callback;
            callback = ctx;
            ctx = doc;
        }

        var uniqInitId = $.identify();
        findDomElem(ctx, '.i-bem').each(function() {
            init($(this), uniqInitId);
        });

        callback && this.afterCurrentEvent(
            function() {
                callback.call(callbackCtx || this, ctx);
            });

        // makes initialization completely synchronous
        this._runAfterCurrentEventFns();

        return ctx;

    },

    /**
     * Destroys blocks on a fragment of the DOM tree
     * @static
     * @protected
     * @param {Boolean} [keepDOM=false] Whether to keep DOM nodes in the document
     * @param {jQuery} ctx Root DOM node
     * @param {Boolean} [excludeSelf=false] Exclude the context
     */
    destruct : function(keepDOM, ctx, excludeSelf) {

        if(typeof keepDOM != 'boolean') {
            excludeSelf = ctx;
            ctx = keepDOM;
            keepDOM = undefined;
        }

        findDomElem(ctx, '.i-bem', excludeSelf).each(function(i, domNode) {
            var params = getParams(this);
            $.each(params, function(blockName, blockParams) {
                if(blockParams.uniqId) {
                    var block = uniqIdToBlock[blockParams.uniqId];
                    block?
                        removeDomNodeFromBlock(block, domNode) :
                        delete uniqIdToDomElems[blockParams.uniqId];
                }
            });
            cleanupDomNode(this);
        });
        keepDOM || (excludeSelf? ctx.empty() : ctx.remove());

    },

    /**
     * Replaces a fragment of the DOM tree inside the context, destroying old blocks and intializing new ones
     * @static
     * @protected
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content New content
     * @param {Function} [callback] Handler to be called after initialization
     * @param {Object} [callbackCtx] Handler's context
     */
    update : function(ctx, content, callback, callbackCtx) {

        this.destruct(ctx, true);
        this.init(ctx.html(content), callback, callbackCtx);

    },

    /**
     * Changes a fragment of the DOM tree including the context and initializes blocks.
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content Content to be added
     */
    replace : function(ctx, content) {

        this.destruct(true, ctx);
        this.init($(content).replaceAll(ctx));

    },

    /**
     * Adds a fragment of the DOM tree at the end of the context and initializes blocks
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content Content to be added
     */
    append : function(ctx, content) {

        this.init($(content).appendTo(ctx));

    },

    /**
     * Adds a fragment of the DOM tree at the beginning of the context and initializes blocks
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content Content to be added
     */
    prepend : function(ctx, content) {

        this.init($(content).prependTo(ctx));

    },

    /**
     * Adds a fragment of the DOM tree before the context and initializes blocks
     * @param {jQuery} ctx Contextual DOM node
     * @param {jQuery|String} content Content to be added
     */
    before : function(ctx, content) {

        this.init($(content).insertBefore(ctx));

    },

    /**
     * Adds a fragment of the DOM tree after the context and initializes blocks
     * @param {jQuery} ctx Contextual DOM node
     * @param {jQuery|String} content Content to be added
     */
    after : function(ctx, content) {

        this.init($(content).insertAfter(ctx));

    },

    /**
     * Builds a full name for a live event
     * @static
     * @private
     * @param {String} e Event name
     * @returns {String}
     */
    _buildCtxEventName : function(e) {

        return this._name + ':' + e;

    },

    _liveClassBind : function(className, e, callback, invokeOnInit) {

        var _this = this;
        if(e.indexOf(' ') > -1) {
            e.split(' ').forEach(function(e) {
                _this._liveClassBind(className, e, callback, invokeOnInit);
            });
        }
        else {
            var storage = liveClassEventStorage[e],
                uniqId = $.identify(callback);

            if(!storage) {
                storage = liveClassEventStorage[e] = {};
                doc.bind(e, _this.changeThis(_this._liveClassTrigger, _this));
            }

            storage = storage[className] || (storage[className] = { uniqIds : {}, fns : [] });

            if(!(uniqId in storage.uniqIds)) {
                storage.fns.push({ uniqId : uniqId, fn : _this._buildLiveEventFn(callback, invokeOnInit) });
                storage.uniqIds[uniqId] = storage.fns.length - 1;
            }
        }

        return this;

    },

    _liveClassUnbind : function(className, e, callback) {

        var storage = liveClassEventStorage[e];
        if(storage) {
            if(callback) {
                if(storage = storage[className]) {
                    var uniqId = $.identify(callback);
                    if(uniqId in storage.uniqIds) {
                        var i = storage.uniqIds[uniqId],
                            len = storage.fns.length - 1;
                        storage.fns.splice(i, 1);
                        while(i < len) storage.uniqIds[storage.fns[i++].uniqId] = i - 1;
                        delete storage.uniqIds[uniqId];
                    }
                }
            } else {
                delete storage[className];
            }
        }

        return this;

    },

    _liveClassTrigger : function(e) {

        var storage = liveClassEventStorage[e.type];
        if(storage) {
            var node = e.target, classNames = [];
            for(var className in storage) storage.hasOwnProperty(className) && classNames.push(className);
            do {
                var nodeClassName = ' ' + node.className + ' ', i = 0;
                while(className = classNames[i++]) {
                    if(nodeClassName.indexOf(' ' + className + ' ') > -1) {
                        var j = 0, fns = storage[className].fns, fn, stopPropagationAndPreventDefault = false;
                        while(fn = fns[j++])
                            if(fn.fn.call($(node), e) === false) stopPropagationAndPreventDefault = true;

                        stopPropagationAndPreventDefault && e.preventDefault();
                        if(stopPropagationAndPreventDefault || e.isPropagationStopped()) return;

                        classNames.splice(--i, 1);
                    }
                }
            } while(classNames.length && (node = node.parentNode));
        }

    },

    _buildLiveEventFn : function(callback, invokeOnInit) {

        var _this = this;
        return function(e) {
            var args = [
                    _this._name,
                    ((e.data || (e.data = {})).domElem = $(this)).closest(_this.buildSelector()),
                    true ],
                block = initBlock.apply(null, invokeOnInit? args.concat([callback, e]) : args);

            if(block && !invokeOnInit && callback)
                return callback.apply(block, arguments);
        };

    },

    /**
     * Helper for live initialization for an event on DOM elements of a block or its elements
     * @static
     * @protected
     * @param {String} [elemName] Element name or names (separated by spaces)
     * @param {String} event Event name
     * @param {Function} [callback] Handler to call after successful initialization
     */
    liveInitOnEvent : function(elemName, event, callback) {

        return this.liveBindTo(elemName, event, callback, true);

    },

    /**
     * Helper for subscribing to live events on DOM elements of a block or its elements
     * @static
     * @protected
     * @param {String|Object} [to] Description (object with modName, modVal, elem) or name of the element or elements (space-separated)
     * @param {String} event Event name
     * @param {Function} [callback] Handler
     */
    liveBindTo : function(to, event, callback, invokeOnInit) {

        if(!event || $.isFunction(event)) {
            callback = event;
            event = to;
            to = undefined;
        }

        if(!to || typeof to == 'string') {
            to = { elem : to };
        }

        to.elemName && (to.elem = to.elemName);

        var _this = this;

        if(to.elem && to.elem.indexOf(' ') > 0) {
            to.elem.split(' ').forEach(function(elem) {
                _this._liveClassBind(
                    buildClass(_this._name, elem, to.modName, to.modVal),
                    event,
                    callback,
                    invokeOnInit);
            });
            return _this;
        }

        return _this._liveClassBind(
            buildClass(_this._name, to.elem, to.modName, to.modVal),
            event,
            callback,
            invokeOnInit);

    },

    /**
     * Helper for unsubscribing from live events on DOM elements of a block or its elements
     * @static
     * @protected
     * @param {String} [elem] Name of the element or elements (space-separated)
     * @param {String} event Event name
     * @param {Function} [callback] Handler
     */
    liveUnbindFrom : function(elem, event, callback) {

        if (!event || $.isFunction(event)) {
            callback = event;
            event = elem;
            elem = undefined;
        }

        var _this = this;

        if(elem && elem.indexOf(' ') > 1) {
            elem.split(' ').forEach(function(elem) {
                _this._liveClassUnbind(
                    buildClass(_this._name, elem),
                    event,
                    callback);
            });
            return _this;
        }

        return _this._liveClassUnbind(
            buildClass(_this._name, elem),
            event,
            callback);

    },

    /**
     * Helper for live initialization when a different block is initialized
     * @static
     * @private
     * @param {String} event Event name
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} callback Handler to be called after successful initialization in the new block's context
     * @param {String} findFnName Name of the method for searching
     */
    _liveInitOnBlockEvent : function(event, blockName, callback, findFnName) {

        var name = this._name;
        blocks[blockName].on(event, function(e) {
            if(!e.block.domElem) return; // if block was destructed at that moment

            var args = arguments,
                blocks = e.block[findFnName](name);

            callback && blocks.forEach(function(block) {
                callback.apply(block, args);
            });
        });
        return this;

    },

    /**
     * Helper for live initialization for a different block's event on the current block's DOM element
     * @static
     * @protected
     * @param {String} event Event name
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} callback Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockEvent : function(event, blockName, callback) {

        return this._liveInitOnBlockEvent(event, blockName, callback, 'findBlocksOn');

    },

    /**
     * Helper for live initialization for a different block's event inside the current block
     * @static
     * @protected
     * @param {String} event Event name
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} [callback] Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockInsideEvent : function(event, blockName, callback) {

        return this._liveInitOnBlockEvent(event, blockName, callback, 'findBlocksOutside');

    },

    /**
     * Helper for live initialization when a different block is initialized on a DOM element of the current block
     * @deprecated - use liveInitOnBlockEvent
     * @static
     * @protected
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} callback Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockInit : function(blockName, callback) {

        return this.liveInitOnBlockEvent('init', blockName, callback);

    },

    /**
     * Helper for live initialization when a different block is initialized inside the current block
     * @deprecated - use liveInitOnBlockInsideEvent
     * @static
     * @protected
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} [callback] Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockInsideInit : function(blockName, callback) {

        return this.liveInitOnBlockInsideEvent('init', blockName, callback);

    },

    /**
     * Adds a live event handler to a block, based on a specified element where the event will be listened for
     * @static
     * @protected
     * @param {jQuery} [ctx] The element in which the event will be listened for
     * @param {String} e Event name
     * @param {Object} [data] Additional information that the handler gets as e.data
     * @param {Function} fn Handler
     * @param {Object} [fnCtx] Handler's context
     */
    on : function(ctx, e, data, fn, fnCtx) {

        return ctx.jquery?
            this._liveCtxBind(ctx, e, data, fn, fnCtx) :
            this.__base(ctx, e, data, fn);

    },

    /**
     * Removes the live event handler from a block, based on a specified element where the event was being listened for
     * @static
     * @protected
     * @param {jQuery} [ctx] The element in which the event was being listened for
     * @param {String} e Event name
     * @param {Function} [fn] Handler
     * @param {Object} [fnCtx] Handler context
     */
    un : function(ctx, e, fn, fnCtx) {

        return ctx.jquery?
            this._liveCtxUnbind(ctx, e, fn, fnCtx) :
            this.__base(ctx, e, fn);

    },

    /**
     * Adds a live event handler to a block, based on a specified element where the event will be listened for
     * @deprecated Use on
     * @static
     * @protected
     * @param {jQuery} ctx The element in which the event will be listened for
     * @param {String} e Event name
     * @param {Object} [data] Additional information that the handler gets as e.data
     * @param {Function} fn Handler
     * @param {Object} [fnCtx] Handler context
     */
    liveCtxBind : function(ctx, e, data, fn, fnCtx) {

        return this._liveCtxBind(ctx, e, data, fn, fnCtx);

    },

    /**
     * Adds a live event handler to a block, based on a specified element where the event will be listened for
     * @static
     * @private
     * @param {jQuery} ctx The element in which the event will be listened for
     * @param {String} e  Event name
     * @param {Object} [data] Additional information that the handler gets as e.data
     * @param {Function} fn Handler
     * @param {Object} [fnCtx] Handler context
     */
    _liveCtxBind : function(ctx, e, data, fn, fnCtx) {

        var _this = this;

        if(typeof e == 'string') {
            if($.isFunction(data)) {
                fnCtx = fn;
                fn = data;
                data = undefined;
            }

            if(e.indexOf(' ') > -1) {
                e.split(' ').forEach(function(e) {
                    _this._liveCtxBind(ctx, e, data, fn, fnCtx);
                });
            } else {
                var ctxE = _this._buildCtxEventName(e),
                    storage = liveEventCtxStorage[ctxE] ||
                        (liveEventCtxStorage[ctxE] = { counter : 0, ctxs : {} });

                ctx.each(function() {
                    var ctxId = $.identify(this),
                        ctxStorage = storage.ctxs[ctxId];
                    if(!ctxStorage) {
                        ctxStorage = storage.ctxs[ctxId] = {};
                        ++storage.counter;
                    }
                    ctxStorage[$.identify(fn) + (fnCtx? $.identify(fnCtx) : '')] = {
                        fn   : fn,
                        data : data,
                        ctx  : fnCtx
                    };
                });
            }
        } else {
            $.each(e, function(e, fn) {
                _this._liveCtxBind(ctx, e, fn, data);
            });
        }

        return _this;

    },

    /**
     * Removes a live event handler from a block, based on a specified element where the event was being listened for
     * @deprecated Use on
     * @static
     * @protected
     * @param {jQuery} ctx The element in which the event was being listened for
     * @param {String} e Event name
     * @param {Function} [fn] Handler
     * @param {Object} [fnCtx] Handler context
     */
    liveCtxUnbind : function(ctx, e, fn, fnCtx) {

        return this._liveCtxUnbind(ctx, e, fn, fnCtx);

    },

    /**
     * Removes a live event handler from a block, based on a specified element where the event was being listened for
     * @static
     * @private
     * @param {jQuery} ctx The element in which the event was being listened for
     * @param {String} e Event name
     * @param {Function} [fn] Handler
     * @param {Object} [fnCtx] Handler context
     */
    _liveCtxUnbind : function(ctx, e, fn, fnCtx) {

        var _this = this,
            storage = liveEventCtxStorage[e =_this._buildCtxEventName(e)];

        if(storage) {
            ctx.each(function() {
                var ctxId = $.identify(this, true),
                    ctxStorage;
                if(ctxId && (ctxStorage = storage.ctxs[ctxId])) {
                    fn && delete ctxStorage[$.identify(fn) + (fnCtx? $.identify(fnCtx) : '')];
                    if(!fn || $.isEmptyObject(ctxStorage)) {
                        storage.counter--;
                        delete storage.ctxs[ctxId];
                    }
                }
            });
            storage.counter || delete liveEventCtxStorage[e];
        }

        return _this;

    },

    /**
     * Retrieves the name of an element nested in a block
     * @static
     * @private
     * @param {jQuery} elem Nested element
     * @returns {String|undefined}
     */
    _extractElemNameFrom : function(elem) {

        if(elem.__bemElemName) return elem.__bemElemName;

        var matches = elem[0].className.match(this._buildElemNameRE());
        return matches? matches[1] : undefined;

    },

    /**
     * Retrieves block parameters from a DOM element
     * @static
     * @param {HTMLElement} domNode DOM node
     * @returns {Object}
     */
    extractParams : extractParams,

    /**
     * Builds a prefix for the CSS class of a DOM element or nested element of the block, based on modifier name
     * @static
     * @private
     * @param {String} modName Modifier name
     * @param {jQuery|String} [elem] Element
     * @returns {String}
     */
    _buildModClassPrefix : function(modName, elem) {

        return buildClass(this._name) +
               (elem?
                   ELEM_DELIM + (typeof elem === 'string'? elem : this._extractElemNameFrom(elem)) :
                   '') +
               MOD_DELIM + modName + MOD_DELIM;

    },

    /**
     * Builds a regular expression for extracting modifier values from a DOM element or nested element of a block
     * @static
     * @private
     * @param {String} modName Modifier name
     * @param {jQuery|String} [elem] Element
     * @param {String} [quantifiers] Regular expression quantifiers
     * @returns {RegExp}
     */
    _buildModValRE : function(modName, elem, quantifiers) {

        return new RegExp('(\\s|^)' + this._buildModClassPrefix(modName, elem) + '(' + NAME_PATTERN + ')(?=\\s|$)', quantifiers);

    },

    /**
     * Builds a regular expression for extracting names of elements nested in a block
     * @static
     * @private
     * @returns {RegExp}
     */
    _buildElemNameRE : function() {

        return new RegExp(this._name + ELEM_DELIM + '(' + NAME_PATTERN + ')(?:\\s|$)');

    },

    /**
     * Builds a CSS selector corresponding to the block/element and modifier
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {String}
     */
    buildSelector : function(elem, modName, modVal) {

        return '.' + buildClass(this._name, elem, modName, modVal);

    },

    /**
     * Returns a block instance by unique ID
     * @deprecated
     * @param {String} [uniqId]
     * @returns {BEM.DOM}
     */
    getBlockByUniqId : function(uniqId) {

        return uniqIdToBlock[uniqId];

    },

    /**
     * Returns the size of the current window
     * @returns {Object} Object with width and height fields
     */
    getWindowSize : function() {

        return {
            width  : win.width(),
            height : win.height()
        };

    }

});

/**
 * Set default scope after DOM ready
 */
$(function() {
    BEM.DOM.scope = $('body');
});

})(BEM, jQuery);

/* end: ../../blocks-desktop/i-bem/__dom/i-bem__dom.js */
/* begin: ../../blocks-common/i-ecma/__string/i-ecma__string.js */
(function() {
String.prototype.trim || (String.prototype.trim = function () {
    var str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;

    while (ws.test(str.charAt(--i)));

    return str.slice(0, i + 1);
});
})();

/* end: ../../blocks-common/i-ecma/__string/i-ecma__string.js */
/* begin: ../../blocks-desktop/i-bem/__dom/_init/i-bem__dom_init_auto.js */
/* дефолтная инициализация */
$(function() {
    BEM.DOM.init();
});

/* end: ../../blocks-desktop/i-bem/__dom/_init/i-bem__dom_init_auto.js */
/* begin: ../../blocks-desktop/input/input.js */
/**
 * @namespace
 * @name Block
 */
BEM.DOM.decl('input', /** @lends Block.prototype */ {

    onSetMod: {

        js: function() {
            this._val = this.elem('control').val();
            // Нужно для того, чтобы IE правильно подсказку в инпуте показывал
            // при переходах по кнопкам вперед/назад
            this._originalVal = this.params.value || this._val;
            this.bindFocus();
            this._valueChanged();
        },

        focused: function(modName, modVal) {
            var focused = modVal === 'yes';

            focused ?
                this._focused || this._focus() :
                this._focused && this._blur();

            this.afterCurrentEvent(function() {
                this.trigger(focused ? 'focus' : 'blur');
            });
        }

    },

    bindFocus: function() {
        this.bindTo(this.elem('control'), {
            focus: this._onFocus,
            blur: this._onBlur,
            input: this._update,
            mousedown: this._update,
            mouseup: this._update,
            keyup: this._update
        });
    },

    /**
     * Возвращает/устанавливает текущее значение
     * @param {String} [val] значение
     * @param {Object} [data] дополнительные данные
     * @returns {String|BEM} если передан параметр val, то возвращается сам блок, если не передан -- текущее значение
     */
    val: function(val, data) {
        if (typeof val === 'undefined') return this._val;

        if (this._val !== val) {
            var input = this.elem('control');

            input.val() !== val && input.val(val);
            this._val = val;
            this.trigger('change', data);
        }
        return this._valueChanged();
    },

    /**
     * Обработчик события выставления фокуса на элемент control блока
     * @returns {Object} экземпляр блока input
     */
    _onFocus: function() {
        this._focused = true;
        return this.setMod('focused', 'yes');
    },

    /**
     * Обработчик события сброса фокуса с элемента control блока input
     * @returns {Object} экземпляр блока input
     */
    _onBlur: function() {
        this._focused = false;
        return this._valueChanged().delMod('focused');
    },

    /**
     * Проверяем, не изменилось ли начальное значение
     * @returns {Object} экземпляр блока input
     */
    _valueChanged: function() {
        if (this._originalVal === this._val) {
            return this.delMod('value-changed');
        } else {
            return this.setMod('value-changed', 'yes');
        }
    },

    /**
     * Выставляем фокус для элемента control
     * @private
     */
    _focus: function() {
        this.elem('control').focus();
        this._update();
    },

    /**
     * Убираем фокус с элемента control
     * @private
     */
    _blur: function() {
        this.elem('control').blur();
    },

    _update: function() {
        this.val(this.elem('control').val());
    }

}, {

});

/* end: ../../blocks-desktop/input/input.js */
/* begin: ../../blocks-desktop/suggest/suggest.js */
BEM.DOM.decl('suggest', {

    /**
     * Событие обновления списка подсказок.
     *
     * @event suggest#update
     * @param {String} val Строка запроса
     * @param {Number} pos Позиция курсора в строке запроса
     * @param {BEM.DOM[]} items Блоки подсказок
     */

    /**
     * Событие выбора подсказки.
     *
     * @event suggest#select
     * @param {String} val Строка запроса
     * @param {Number} pos Позиция курсора в строке запроса
     * @param {BEM.DOM} item Выбранная подсказка
     * @param {Object} meta Дополнительная информация от сервера
     * @param {Number} itemIndex Индекс выбранной подсказки
     * @param {Boolean} byKeyboard Флаг выбора подсказки с клавиатуры
     */

    /**
     * Событие предваряет демонстрацию саджеста.
     *
     * @event suggest#preshow
     */

    /**
     * Событие демонстрации саджеста.
     *
     * @event suggest#show
     */

    /**
     * Событие сокрытия саджеста.
     *
     * @event suggest#hide
     * @param {String|undefined} val Строка запроса для подстановки в инпут
     */

    /**
     * @private
     */
    onSetMod: {
        js: {
            inited: function() {
                /**
                 * Время последней потери фокуса (мс).
                 *
                 * @private
                 * @type {Number}
                 */
                this._lastBlurTime = 0;

                this._clear();
            }
        }
    },

    /**
     * Возвращает параметры блока по умолчанию.
     *
     * @protected
     * @returns {Object}
     */
    getDefaultParams: function() {
        return {
            submitBySelect: true,
            updateOnEnterByKeyboard: false,
            onFocus: 'request'
        };
    },

    /**
     * Инициализировать всё необходимое для работы саджеста.
     *
     * @protected
     */
    init: function() {
        this.params.form.on('submit', function() {
            // Сбрасывать флаги при сабмите, иначе не уходит фокус с инпута.
            this._clear();
            this._popup.hide();
        }, this);

        this._model = this.initModel();
        this._view = this.initView();

        this._model.on({
            response: this.setItems
        }, this);

        this._input = this.params['suggest-input'];
        this._popup = this.params['suggest-popup'];

        this.bindEvents();
    },

    /**
     * Инициализировать блок `suggest-model`.
     *
     * @protected
     * @returns {BEM} suggest-model
     */
    initModel: function() {
        return BEM.create('suggest-model', this.params);
    },

    /**
     * Получить экземпляр блока `suggest-model`.
     *
     * @returns {BEM} suggest-model
     */
    getModel: function() { return this._model },

    /**
     * Инициализировать блок `suggest-view`.
     *
     * @protected
     * @returns {BEM} suggest-view
     */
    initView: function() {
        return BEM.create({ block: 'suggest-view' }, this.params.templates);
    },

    /**
     * Получить экземпляр блока `suggest-view`.
     *
     * @returns {BEM} suggest-view
     */
    getView: function() { return this._view },

    /**
     * Подписать события саджеста.
     *
     * @public
     * @returns {BEM.DOM} suggest
     */
    bindEvents: function() {
        var that = this;

        that._input.bindEvents({
            keydown: that._onKeyDown,
            change: that._onChange,
            focus: that._onFocus,
            blur: that._onBlur
        }, that);

        BEM.blocks['suggest-item'].on(that.domElem, {
            mouseover: function(e) {
                e.block.onEnter();
            },
            mouseout: function(e) {
                e.block.onLeave();
            },
            mousedown: function() {
                that._onDownItem();
            },
            leftclick: function(e) {
                that._onSelectItem(e.block, false);
            }
        });

        // Провайдинг событий попапа.
        that._popup.on({
            preshow: function() {
                this.trigger('preshow');
            },
            show: function() {
                this.trigger('show');
            },
            hide: function(e, data) {
                this.trigger('hide', data);
            }
        }, this);

        return that;
    },

    /**
     * Установить блоки подсказок.
     *
     * @public
     * @param {Object} e Объект события `response`
     * @param {Object} data Данные события
     * @param {String} data.val Строка запроса
     * @param {Number} data.pos Позиция курсора в строке запроса
     * @param {Object} data.data Данные, полученные от сервера
     * @returns {BEM.DOM} suggest
     */
    setItems: function(e, data) {
        var that = this;

        // Если во время запроса была отправлена форма
        // или подсказок для отображения нет.
        if (!data.data.items.length) {
            that._popup.hide();
            return that._clear();
        }

        // Если получен ответ на неактуальный пользовательский запрос.
        if (that._input.val() !== data.val) {
            return that._clear();
        }

        that._text = data.val;
        that._pos = data.pos;
        that._meta = data.data.meta || {};

        that._popup.show(that._view.html(data.data.items));

        that._items = that.findBlocksInside('suggest-item');

        that.trigger('update', {
            val: that._text,
            pos: that._pos,
            items: that._items
        });

        return that;
    },

    /**
     * Получить установленные блоки подсказок.
     *
     * @public
     * @returns {BEM.DOM[]} suggest-item
     */
    getItems: function() {
        return this._items || [];
    },

    /**
     * Проверить саджест на потерю фокуса.
     *
     * Например, при клике по подсказке фокус на мгновение
     * уходит из инпута и затем возвращается обратно.
     * При этом с точки зрения саджеста фокус не считается потерянным.
     *
     * Этот метод можно использовать при подписке на событие `blur` инпута,
     * чтобы проверить как саджест отреагировал на возникший `blur`.
     *
     * @returns {Boolean}
     */
    isBlur: function() {
        return this._isBlur;
    },

    /**
     * Событие изменения значения инпута.
     *
     * @private
     * @param {Object} [e] Объект события
     * @param {Object} [data] Данные события
     */
    _onChange: function(e, data) {
        this._model.request(
            this._input.realVal(this._input.val()),
            this._input.getCaretPosition(),
            data
        );
    },

    /**
     * Событие фокуса в текстовом поле, к которому привязан саджест.
     *
     * @private
     */
    _onFocus: function() {
        this._isBlur = true;
        // Проверка на получение фокуса в течении 300мс после последней
        // потери фокуса нужна для предотвращения моргания саджеста,
        // когда попап автоматически возвращает фокус на владельца, то есть на инпут.
        if (this.params.onFocus && this._isLastBlurTimeLater(300)) {
            if (this.getItems().length && this._input.val() === this._text) { // Если подсказки по запросу уже есть
                this._popup.show();
            } else if (this.params.onFocus === 'request') {
                // Иначе, если фокус был установлен человеком и запрос по фокусу разрешён
                this._onChange();
            }
        }
    },

    /**
     * Событие потери фокуса в текстовом поле, к которому привязан саджест.
     *
     * @private
     */
    _onBlur: function() {
        this._lastBlurTime = new Date().getTime();

        if (this._isBlur) {
            this._clear();
            this._popup.hide();
        } else if (this._isMouseDown) {
            this._input.get().setMod('focused', 'yes');
        }
    },

    /**
    * Событие зажатия клавиши на клавиатуре.
    *
    * @private
    * @param {Object} e Объект события
    */
    _onKeyDown: function(e) {
        var key = this.__self.keyboard,
            which = e.which;

        if (this._popup.isShown() && (which === key.up || which === key.down)) {
            e.preventDefault();
        }
    },

    /**
     * Получить индекс подсказки в списке подсказок.
     *
     * @private
     * @param {BEM.DOM} item Подсказка
     * @returns {Number}
     */
    _getItemIndex: function(item) {
        return this.getItems().indexOf(item);
    },

    /**
     * Сбросить саджест.
     *
     * @private
     * @returns {BEM.DOM} suggest
     */
    _clear: function() {
        /**
         * Флаг для предотвращения скрытия саджеста при потере фокуса инпутом.
         *
         * @private
         * @type {Boolean}
         */
        this._isBlur = true;

        this._isMouseDown = false;

        return this;
    },

    /**
     * Проверить, что с потери инпутом фокуса до настоящего
     * момента прошло больше указанного промежутка времени.
     *
     * @private
     * @param {Number} timeout Проверяемый промежуток времени (мс)
     * @returns {Boolean}
     */
    _isLastBlurTimeLater: function(timeout) {
        return new Date().getTime() - this._lastBlurTime > timeout;
    },

    _onDownItem: function() {
        this._isBlur = false;
    },

    /**
     * Событие выбора подсказки.
     *
     * @private
     * @param {BEM.DOM} item Выделенный блок suggest-item
     * @param {Boolean} byKeyboard Флаг выделения подсказки с клавиатуры
     * @returns {Number} Индекс выделенной подсказки
     */
    _onSelectItem: function(item, byKeyboard) {
        var that = this,
            itemIndex = that._getItemIndex(item);

        that._text = that._input.realVal(item.onSelect(byKeyboard).val());
        that._isBlur = true;
        that._items = [];

        that.trigger('select', {
            val: that._text,
            pos: that._pos,
            item: item,
            meta: that._meta,
            itemIndex: itemIndex,
            byKeyboard: byKeyboard
        });

        if (that.params.submitBySelect) {
            that.params.form.submit();
        }

        return itemIndex;
    }

},
{
    keyboard: {
        enter: 13,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }
});

/* end: ../../blocks-desktop/suggest/suggest.js */
/* begin: ../../blocks-desktop/suggest-detect/suggest-detect.js */
BEM.DOM.decl('suggest-detect', {

    onSetMod: {
        js: {
            inited: function() {
                this
                    .bindToDoc('keydown', function(e) {
                        this.__self._pressedKeyCode = e.which;
                    }, this)
                    .bindToDoc('keyup', function() {
                        this.__self._pressedKeyCode = null;
                    }, this);
            }
        }
    }

}, {

    /**
     * Код текущей зажатой клавиши.
     *
     * @private
     * @type {Number|Null}
     */
    _pressedKeyCode: null,

    /**
     * Проверить на зажатие клавиши escape.
     *
     * @returns {Boolean}
     */
    isPressedEscape: function() {
        return this._pressedKeyCode === 27;
    }

});

/* end: ../../blocks-desktop/suggest-detect/suggest-detect.js */
/* begin: ../../blocks-desktop/suggest-model/suggest-model.js */
/**
 * suggest-model — это блок для работы с данными.
 */

BEM.decl('suggest-model', {

    /**
     * Событие отправки запроса серверу.
     *
     * @event suggest-model#request
     * @param {String} val Строка запроса
     * @param {Number} pos Позиция курсора в строке запроса
     */

    /**
     * Событие получения ответа от сервера.
     *
     * @event suggest-model#response
     * @param {String} val Строка запроса
     * @param {Number} pos Позиция курсора в строке запроса
     * @param {Object} data Данные, полученные от сервера
     */

    /**
     * @private
     */
    onSetMod: {
        js: {
            inited: function() {
                /**
                 * Список для хранения информации по запросам к серверу.
                 *
                 * @private
                 * @type {Object[]}
                 */
                this._requests = [];
            }
        }
    },

    /**
     * Уничтожает сам блок и связанные с ним блок provider.
     * @public
     *
     * @inheritdoc
     */
    destruct: function() {
        if (this._provider) {
            this._provider.destruct();
        }

        return this.__base.apply(this, arguments);
    },

    /**
     * Получить провайдер данных.
     *
     * @public
     * @returns {BEM} suggest-provider
     */
    getProvider: function() {
        if (this._provider) {
            return this._provider;
        }

        this._provider = this.setProvider(this.params);
        return this._provider;
    },

    /**
     * Установить провайдер данных.
     *
     * @public
     * @param {Object} params Параметры инициализации провайдера
     * @returns {BEM} suggest-provider
     */
    setProvider: function(params) {
        this._provider = BEM.create('suggest-provider', params);
        return this._provider;
    },

    /**
     * Получить условия, при которых не нужно отправлять запрос.
     *
     * Значение текстового поля, к которому привязан саджест, изменяется множеством способов.
     * Требуется возможность различать событие изменения инпута, при котором следует
     * обновить ответ саджеста или оставить его прежним.
     * При изменении значения текстового поля, событие `change` сопровождается объектом с сопутствующими данными.
     * Если среди сопутствующих данных события найдутся поля с указанными в этой переменной значениями,
     * то саджест не будет обновляться.
     *
     * @protected
     * @returns {Object[]}
     */
    getCancelRequestConditions: function() {
        return [
            {
                block: 'suggest',
                show: false
            },
            {
                block: 'suggest',
                event: 'select'
            },
            {
                block: 'suggest',
                event: 'out'
            },
            {
                block: 'suggest-item',
                show: false
            },
            {
                block: 'suggest-popup',
                event: 'hide'
            },
            {
                suggest: false
            }
        ];
    },

    /**
     * Отправить запрос серверу.
     *
     * @public
     * @param {String} text Текст запроса
     * @param {Number} caretPosition Позиция курсора в поле ввода
     * @param {Object} data Данные события
     * @returns {BEM} suggest-model
     */
    request: function(text, caretPosition, data) {
        if (!this._isNeedRequest(data)) {
            return;
        }

        var info = {
            val: text,
            requestTime: new Date().getTime()
        };

        // Запрос будет отправлен даже при пустом вводе.
        // Сервер может прислать персональные подсказки.
        this.trigger('request', {
            val: text,
            pos: caretPosition
        });

        this.getProvider().get(text, caretPosition, function(text, pos, data) {
            info.responseTime = new Date().getTime();
            this._requests.push(info);

            this._onResponse(text, pos, data);
        }.bind(this));

        return this;
    },

    /**
     * Проверить время на попадание в промежуток между запросом и ответом сервера.
     *
     * @public
     * @param {Number} time Время в формате UNIX-времени
     * @returns {Boolean}
     */
    isTimeInRequestInterval: function(time) {
        for (var i = this._requests.length - 1; i >= 0; i--) {
            if (time > this._requests[i].requestTime && time < this._requests[i].responseTime) {
                return true;
            }
        }
        return false;
    },

    /**
     * Проверка на необходимость выполнения запроса.
     *
     * @private
     * @param {Object} data Данные события
     * @returns {Boolean}
     */
    _isNeedRequest: function(data) {
        if (!data) {
            return true;
        }

        return !this.getCancelRequestConditions().some(function(condition) {
            return Object.keys(condition).every(function(property) {
                return condition[property] === data[property];
            });
        });
    },

    /**
     * Колбек вызывается после выполнения запроса.
     *
     * @private
     * @param {String} text Строка запроса
     * @param {Number} pos Позиция курсора в строке запроса
     * @param {Object} data Данные от сервера
     * @param {String} data.orig Введённый текст запроса
     * @param {Array} data.items Подсказки
     * @param {Object} data.meta Дополнительная информация
     */
    _onResponse: function(text, pos, data) {
        this.trigger('response', {
            val: text,
            pos: pos,
            data: data
        });
    }

});

/* end: ../../blocks-desktop/suggest-model/suggest-model.js */
/* begin: ../../blocks-desktop/suggest-provider/suggest-provider.js */
/**
 * suggest-provider — это поставщик данных для саджеста с помощью AJAX.
 */

BEM.decl('suggest-provider', {

    /**
     * Возвращает параметры блока по умолчанию.
     *
     * @protected
     * @returns {Object}
     */
    getDefaultParams: function() {
        return {
            type: 'GET',
            dataType: 'jsonp'
        };
    },

    /**
     * Выполнить запрос.
     *
     * @public
     * @param {String} text Строка запроса
     * @param {Number} pos Позиция курсора в строке запроса
     * @param {suggest-provider~getCallback} callback Колбек
     */
    get: function(text, pos, callback) {
        $.ajax(this._extendParamsData(this.getRequestData(text, pos)))
            .done(function(data) {
                callback.call(this, text, pos, this.convert(data));
            }.bind(this))
            .error(function() {
                callback.call(this, text, pos, { items: [] });
            }.bind(this));
    },

    /**
     * Преобразовать данные от сервера в данные для саджеста.
     *
     * @param {Array|*} data Данные от сервера
     * @returns {Object|*}
     */
    convert: function(data) {
        return {
            items: data[1],
            meta: data[2]
        };
    },

    /**
     * Получить параметры для отправки запроса на сервер.
     *
     * @param {String} text Строка запроса
     * @param {Number} position Позиция курсора в строке запроса
     * @returns {Object}
     */
    getRequestData: function(text, position) {
        return {
            part: text,
            pos: position
        };
    },

    /**
     * Получить урл запроса данных с сервера.
     *
     * @returns {String}
     */
    getRequestUrl: function() {
        return this.params.url;
    },

    /**
     * Добавляет данные по запросу в параметры блока.
     *
     * @private
     * @param {Object} data Данные
     * @returns {Object}
     */
    _extendParamsData: function(data) {
        this.params.url = this.getRequestUrl();
        this.params.data = $.extend(this.params.data || {}, data);
        return this.params;
    }

});

/* end: ../../blocks-desktop/suggest-provider/suggest-provider.js */
/* begin: ../../blocks-desktop/suggest-view/suggest-view.js */
/**
 * suggest-view — это блок, динамически формирующий структуру вёрстки.
 *
 * Основная задача блока — формировать BEMJSON на основе полученных данных от сервера.
 * Так же, блок способен шаблонизировать сформированный BEMJSON и вернуть готовую HTML-строку.
 */

BEM.decl('suggest-view', {

    /**
     * Возвращает сформированный HTML саджеста.
     *
     * @public
     * @param {Array} items Подсказки от сервера
     * @returns {String} HTML
     */
    html: function(items) {
        return this.build(items);
    },

    /**
     * Возвращает BEMJSON элемента содержимого саджеста.
     *
     * Модификатор темы саджеста приходится прокидывать в элемент `content`
     * для возможности заматчить BEMHTML по модификатору.
     * Заматчиться на модификатор темы самого саджеста невозможно,
     * потому что он миксуется к попапу.
     *
     * @public
     * @param {Array} data Подсказки от сервера
     * @returns {Object}
     */
    build: function(data) {
        var items = this.buildItems(data),
            content = [],
            tmpl = this.params;

        if (items.personal.length) {
            content.push(
                tmpl.items
                    .replace('%%title%%', tmpl.persGroupTitle)
                    .replace('%%items%%', items.personal.join(''))
            );

            items.items.length && content.push(tmpl.groupDelimiter);
        }

        if (items.items.length) {
            content.push(
                tmpl.items
                    .replace('%%title%%', tmpl.searchGroupTitle)
                    .replace('%%items%%', items.items.join(''))
            );
        }

        return content.join('');
    },

    /**
     * Получить html подсказок саджеста.
     *
     * @public
     * @param {Array} items Подсказки от сервера
     * @returns {Array}
     */
    buildItems: function(items) {
        return items.reduce(function(content, item) {
            var prefs = this.__self._getPrefs(item);

            content[prefs.pers ? 'personal' : 'items'].push(this.buildItem(item, prefs));
            return content;
        }.bind(this), { personal: [], items: [] });
    },

    /**
     * Получить html для одной подсказки.
     *
     * @public
     * @param {String|Array} item Подсказка
     * @param {Object} prefs Мета-информация к подсказке
     * @returns {Object}
     */
    buildItem: function(item, prefs) {
        var self = this.__self,
            type = self._getType(item, prefs),
            text = self._highlight(self._getText(item), prefs),
            fact = self._getFact(item);

        if (type === 'fact' || type === 'weather') {
            return this.params.itemWithFact.replace('%%content%%', text).replace('%%fact%%', fact);
        } else if (type === 'nav' || type === 'icon') {
            return;
        }

        return this.params.item.replace('%%content%%', text);
    }

}, {

    /**
     * Получить дополнительные параметры подсказки.
     *
     * @private
     * @param {Array|String} item Подсказка
     * @returns {Object}
     */
    _getPrefs: function(item) {
        if (!Array.isArray(item)) {
            return {};
        }

        var prefs = item[item.length - 1];

        return $.isPlainObject(prefs) ? prefs : {};
    },

    /**
     * Получить тип подсказки.
     *
     * @private
     * @param {Array|String} item Подсказка
     * @returns {String}
     */
    _getType: function(item) {
        return Array.isArray(item) ? item[0] || 'text' : 'text';
    },

    /**
     * Получить текст подсказки.
     *
     * @private
     * @param {Array|String} item Подсказка
     * @returns {String}
     */
    _getText: function(item) {
        return Array.isArray(item) ? item[1] : item;
    },

    /**
     * Получить текст факта или погоды в подсказке.
     *
     * @private
     * @param {Array|String} item Подсказка
     * @returns {String}
     */
    _getFact: function(item) {
        return Array.isArray(item) ? item[2] : '';
    },

    /**
     * Подсветить части текста в подсказке.
     *
     * @private
     * @param {String} text Текст поисковой подсказки
     * @param {Object} prefs Мета-информация к подсказке
     * @returns {String|Array}
     */
    _highlight: function(text, prefs) {
        // В поле hl сервер присылает массив с информацией о прокраске ответа.
        if (!prefs.hl) {
            return text;
        }

        function xmlEscape(str) {
            if (!str) return '';
            return str
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;')
                .replace(/\"/g, '&quot;')
                .replace(/`/g, '&#x60;')
                .replace(/'/g, '&#x27;');
        }

        var hl = prefs.hl
                // На всякий случай отсортировать пары позиций в порядке возрастания.
                .sort(function(a, b) {
                    return a[0] - b[0];
                })
                // И удалить отрицательные участки выделения,
                // которые могли появиться после разбивки текста
                .filter(function(part) {
                    return part[0] >= 0;
                }),

            highlight = [],
            cursor = 0,
            index;

        if (!hl.length) {
            return text;
        }

        // Составить массив из простых строк и строк к выделению.
        hl.forEach(function(range) {
            index = (cursor > range[0]) ? cursor : range[0];
            highlight.push(text.slice(cursor, index));
            highlight.push('<b>' + xmlEscape(text.slice(index, cursor = range[1])) + '</b>');
        }, this);

        // Дополнить массив оставшейся частью простой строки.
        highlight.push(text.slice(cursor));

        // Убрать лишние пустые элементы массива.
        return highlight.filter(function(part) { return Boolean(part) }).join('');
    }

});

/* end: ../../blocks-desktop/suggest-view/suggest-view.js */
/* begin: ../../blocks-desktop/suggest-popup/suggest-popup.js */
/**
 * suggest-popup — это обёртка над блоком `popup`, благодаря которой саджест может использовать любой попап.
 *
 * Для корректной работы саджета, подключаемый попап должен реализовывать следующие методы:
 *
 * 1) show — Показывает попап.
 *      @param {BEM.DOM} Блок, относительно которого будет позиционироваться попап
 *      @returns {BEM.DOM} Попап
 *
 * 2) hide — Скрывает попап.
 *      @returns {BEM.DOM} Попап
 *
 * 3) setContent — Устанавливает содержимое попапа.
 *      @param {String|jQuery} content jQuery-элемент или строка, используемые в качестве содержимого
 *      @returns {BEM.DOM} Попап
 *
 * 4) isShown — Возвращает `true`, если блок в данный момент видим.
 *
 * 5) destruct — Уничтожает блок и его потомков.
 *
 * Так же, попап должен инициировать событие hide.
 */

BEM.decl('suggest-popup', {

    /**
     * Событие предваряет демонстрацию попапа.
     *
     * @event suggest-popup#preshow
     */

    /**
     * Событие демонстрации попапа.
     *
     * @event suggest-popup#show
     */

    /**
     * Событие сокрытия попапа.
     *
     * @event suggest-popup#hide
     * @param {String|undefined} val Строка запроса для подстановки в инпут
     */

    /**
     * @private
     */
    onSetMod: {
        js: {
            inited: function() {
                this._popup = this.params.popup
                    .setParent(this.params.parent);

                // Саджест должен инициировать событие `hide` при закрытии по эскейпу.
                this._popup.on('hide', function() {
                    if (BEM.blocks['suggest-detect'].isPressedEscape()) {
                        this.trigger('hide', {});
                    }
                }, this);

                this.bindSuggestEvents();
            }
        }
    },

    /**
     * Показывает попап.
     *
     * @public
     * @param {String|jQuery} [content] Содержимое попапа
     * @returns {BEM} suggest-popup
     */
    show: function(content) {
        if (content) {
            this._popup.setContent(content);
        }

        if (this.isShown()) {
            return this;
        }

        this.trigger('preshow');

        this._popup.show(this.params.owner);

        this.trigger('show');

        return this;
    },

    /**
     * Скрывает попап.
     *
     * @public
     * @param {Object} data Данные о событии сокрытия попапа.
     * @returns {BEM} suggest-popup
     */
    hide: function(data) {
        if (this.isShown()) {
            this._popup.hide();
            this.trigger('hide', data || {});
        }
        return this;
    },

    /**
     * Устанавливает содержимое попапа.
     *
     * @public
     * @param {String|jQuery} content Содержимое попапа.
     * @returns {BEM} suggest-popup
     */
    setContent: function(content) {
        this._popup.setContent(content);
        return this;
    },

    /**
     * Возвращает `true`, если блок в данный момент видим.
     *
     * @public
     * @returns {Boolean}
     */
    isShown: function() {
        return this._popup ? this._popup.isShown() : false;
    },

    /**
     * Установить/получить владельца попапа.
     *
     * @param {BEM.DOM|jQuery} [owner] Владелец
     * @returns {BEM|BEM.DOM|jQuery} suggest-popup
     */
    owner: function(owner) {
        if (owner) {
            this.params.owner = owner;
            return this;
        }

        return this.params.owner;
    },

    /**
     * Возвращает блок popup.
     *
     * @public
     * @returns {BEM.DOM}
     */
    get: function() {
        return this._popup;
    },

    /**
     * Уничтожает блок и его потомков.
     *
     * @public
     * @returns {BEM.DOM|undefined}
     */
    destruct: function() {
        if (!this._popup) {
            return;
        }
        return this._popup.destruct();
    },

    /**
     * Подписать на события саджеста.
     *
     * @public
     * @returns {BEM} suggest-popup
     */
    bindSuggestEvents: function() {
        this.params.suggest.on({
            select: function(e, data) {
                this.hide(data);
            },
            update: function(e, data) {
                if (!data.items.length) {
                    this.hide({
                        response: 'empty'
                    });
                }
            }
        }, this);

        return this;
    }

});

/* end: ../../blocks-desktop/suggest-popup/suggest-popup.js */
/* begin: ../../blocks-desktop/suggest-input/suggest-input.js */
/**
 * suggest-input — это обёртка над блоком `input`, благодаря которой саджест может использовать любой инпут.
 *
 * Для корректной работы саджета, подключаемый инпут должен реализовывать следующие методы:
 *
 * 1) val — Возвращает/устанавливает текущее значение.
 *      @param {String} [val] значение
 *      @param {Object} [data] дополнительные данные
 *      @returns {String|BEM} если передан параметр val, то возвращается сам блок, если не передан -- текущее значение
 *
 * Так же, инпут должен инициировать события blur, focus, change и clear.
 */

BEM.decl('suggest-input', {

    /**
     * Событие изменения значения инпута.
     *
     * @event suggest-input#change
     * @param {Object} data Сопутствующие данные
     */

    /**
     * Событие очистки значения инпута с помощью очищающего крестика.
     *
     * @event suggest-input#clear
     * @param {Object} data Сопутствующие данные
     */

    /**
     * @private
     */
    onSetMod: {
        js: {
            inited: function() {
                var that = this;

                that._input = that.params.input;

                that.disableBrowserAutocomplete();

                // Данные на момент открытия страницы.
                that.realVal(that.val());

                that.bindEvents({
                    change: function(e, data) {
                        that.trigger('change', data);
                    },
                    clear: $.throttle(function(e, data) { // throttle добавлен для ISLCOMPONENTS-1123
                        that.trigger('clear', data);
                    }, 300)
                }, that);

                that.bindSuggestEvents();
            }
        }
    },

    /**
     * Возвращает блок input.
     *
     * @public
     * @returns {BEM.DOM}
     */
    get: function() {
        return this._input;
    },

    /**
     * Получить настоящий инпут.
     *
     * @public
     * @returns {jQuery}
     */
    getControl: function() {
        return this._input.elem('control');
    },

    /**
     * Возвращает/устанавливает текущее значение.
     *
     * @public
     * @param {String} [val] Значение
     * @returns {String} Если передан параметр val, то возвращается новое значение, если не передан - текущее значение
     */
    val: function(val) {
        if (typeof val === 'undefined') {
            return this._input.elem('control').val();
        }

        return this._input.elem('control').val(val);
    },

    /**
     * Получить/установить постоянное значение инпута.
     * Этот метод устанавливает значение, которое пользователь ввёл самостоятельно или выбрал из подсказок.
     *
     * @public
     * @param {String} [val] Значение
     * @returns {String}
     */
    realVal: function(val) {
        if (typeof val === 'undefined') {
            return this._realVal;
        }

        // Выбор некоторых подсказок не изменяет значение инпута
        if (typeof val === 'string') {
            this._realVal = val;
        }

        return this._realVal;
    },

    /**
     * Получить позицию курсора в поле ввода.
     *
     * @protected
     * @returns {Number}
     */
    getCaretPosition: function() {
        var control = this.getControl()[0],
            len = this.val().length,
            sel;

        if (document.selection) {
            sel = document.selection.createRange();
            sel.moveStart('character', -len);
            return sel.text.length;
        } else if (typeof control.selectionStart === 'number') {
            return control.selectionStart;
        }

        return len;
    },

    /**
     * Отключает автодополнение браузера.
     *
     * @public
     */
    disableBrowserAutocomplete: function() {
        /* Перед отключением autocomplete в браузере необходимо снять фокус с поля ввода. */
        var focused = this._input.hasMod('focused');

        focused && this._input.delMod('focused');

        this.getControl().attr({
            autocomplete: 'off',
            autocorrect: 'off',
            autocapitalize: 'off',
            spellcheck: 'false',
            'aria-autocomplete': 'list'
        });

        focused && this._input.setMod('focused', 'yes');
    },

    /**
     * Подписывает события на блок.
     *
     * @public
     * @param {Object} events Объект, где ключ — имя события, значение — колбек
     * @param {Object} [context=this] Контекст выполнения колбека
     * @returns {BEM} suggest-input
     */
    bindEvents: function(events, context) {
        Object.keys(events).forEach(function(event) {
            this._eventsFilter(event).on(event, events[event].bind(context || this));
        }, this);

        return this;
    },

    /**
     * Подписать события на блоки подсказок.
     *
     * @public
     * @returns {BEM} suggest-input
     */
    bindSuggestEvents: function() {
        var suggest = this.params.suggest;

        suggest.on({
            out: function(e, data) {
                this.a11yDeactive();
                this._changeValueByEvent(e, data);
            }
        }, this);

        BEM.blocks['suggest-item'].on(suggest.domElem, {
            select: this._changeValueByEvent,
            enter: function(e, data) {
                this.a11yActive(data.id);
                if (data.byKeyboard && this.params.updateOnEnterByKeyboard) {
                    this._changeValueByEvent(e, data);
                }
            }
        }, this);

        return this;
    },

    /**
     * Установить a11y атрибут
     *
     * @public
     * @param {String} id Значение атрибута id подсказки
     */
    a11yActive: function(id) {
        this.getControl().attr('aria-activedescendant', id);
    },

    /**
     * Удалить a11y атрибут
     *
     * @public
     */
    a11yDeactive: function() {
        this.getControl().removeAttr('aria-activedescendant');
    },

    /**
     * Получить объект, который инициирует указанное событие.
     *
     * @private
     * @param {String} event Имя события
     * @returns {BEM.DOM} input или input__control
     */
    _eventsFilter: function(event) {
        return [
            'blur', 'focus', 'change', 'clear'
        ].indexOf(event) > -1 ? this._input : this.getControl();
    },

    /**
     * Изменить значение инпута по событию.
     *
     * @private
     * @param {Object} e Объект события
     * @param {Object} data Данные события
     */
    _changeValueByEvent: function(e, data) {
        this.val(data && data.val || this.realVal(), $.extend({
            block: e.block.__self.getName(),
            event: e.type
        }, data));
    }

});

/* end: ../../blocks-desktop/suggest-input/suggest-input.js */
/* begin: ../../blocks-desktop/suggest-item/suggest-item.js */
/**
 * suggest-item — это одна подсказка саджеста.
 */

BEM.DOM.decl('suggest-item', {

    /**
     * Событие выделения подсказки.
     *
     * @event suggest-item#enter
     * @param {String} val Текст подсказки
     * @param {String} id Значение атрибута id подсказки
     * @param {Boolean} show Флаг необходимости отображения саджеста
     * @param {Boolean} byKeyboard Флаг выделения подсказки с клавиатуры
     */

    /**
     * Событие выбора подсказки.
     *
     * @event suggest-item#select
     * @param {String} val Текст подсказки
     * @param {String} id Значение атрибута id подсказки
     * @param {Boolean} show Флаг необходимости отображения саджеста
     * @param {Boolean} byKeyboard Флаг выделения подсказки с клавиатуры
     */

    /**
     * Возвращает текст подсказки.
     *
     * @public
     * @returns {String}
     */
    val: function() {
        if (this.params.val) {
            return this.params.val;
        }
        var text = this.elem('text');

        return (text.length ? text : this.domElem).text();
    },

    /**
     * Событие выделения подсказки.
     *
     * @public
     * @returns {BEM.DOM} suggest-item
     */
    onEnter: function() {
        return this.setMod('selected', 'yes')
            .triggerEvent('enter', {
                val: this.val()
            });
    },

    /**
     * Событие снятия выделения с подсказки.
     *
     * @public
     * @returns {BEM.DOM} suggest-item
     */
    onLeave: function() {
        return this.delMod('selected');
    },

    /**
     * Событие выбора подсказки.
     *
     * @public
     * @returns {BEM.DOM} suggest-item
     */
    onSelect: function() {
        return this.triggerEvent('select', {
            val: this.val()
        });
    },

    /**
     * Инициировать событие блока.
     *
     * @public
     * @param {String} event Имя события
     * @param {Object} data Объект данных для события
     * @param {String} data.val Текст запроса
     * @param {Boolean} data.byKeyboard Флаг выделения подсказки с клавиатуры
     * @returns {BEM.DOM} suggest-item
     */
    triggerEvent: function(event, data) {
        return this.trigger(event, {
            val: data.val,
            id: this.domElem.attr('id'),
            show: false,
            byKeyboard: data.byKeyboard
        });
    }

}, {

    live: function() {
        this.liveBindTo('mouseover mouseout mousedown leftclick', function(e) {
            this.trigger(e.type, e);
        });
    }

});

/* end: ../../blocks-desktop/suggest-item/suggest-item.js */
/* begin: ../../blocks-desktop/suggest-form/suggest-form.js */
BEM.DOM.decl('suggest-form', {

    /**
     * Событие отправки формы.
     *
     * @event suggest-form#submit
     * @param {$.Event} e Объект DOM-события
     */

    /**
     * Событие клика по кнопке поиска.
     *
     * @event suggest-form#button-click
     * @param {$.Event} e Объект DOM-события
     */

    /**
     * Событие окончания инициализации всех саджестов формы.
     *
     * @event suggest-form#ready
     * @param {Object[]} nodes Проинициализированные узлы саджестов формы
     */

    /**
     * @private
     */
    onSetMod: {
        js: {
            inited: function() {
                /**
                 * Флаг завершённости инициализации всех саджестов формы.
                 *
                 * @private
                 * @type {Boolean}
                 */
                this._isReady = false;

                this.initNodes();
            }
        }
    },

    /**
     * Возвращает параметры блока по умолчанию.
     *
     * @protected
     * @returns {Object}
     */
    getDefaultParams: function() {
        return {
            inputName: 'input',
            buttonName: 'button',
            popupName: 'popup'
        };
    },

    /**
     * Поверить завершённость инициализации всех саджестов формы.
     *
     * @returns {Boolean}
     */
    isReady: function() {
        return this._isReady;
    },

    /**
     * Инициализировать саджесты на всех узлах.
     *
     * @public
     */
    initNodes: function() {
        var nodes = this.getNodes();

        nodes.forEach(function(node) {
            node.suggest.init();
        });

        this._isReady = true;

        this.trigger('ready', {
            nodes: nodes
        });
    },

    /**
     * Получить узлы с подготовленными параметрами для блока `suggest`.
     *
     * @public
     * @returns {Object[]}
     */
    getNodes: function() {
        return this.getNodeList().map(function(node) {
            var suggest = node.suggest,
                params = suggest.params;

            params.input = node.input;
            params.button = node.button;
            params.form = this;

            params['suggest-popup'] = BEM.create('suggest-popup', {
                suggest: suggest,
                popup: suggest.findBlockOn(this.params.popupName),
                owner: params.input,
                parent: this.findBlockOutside(this.params.parentName)
            });

            params['suggest-input'] = BEM.create('suggest-input', {
                suggest: suggest,
                input: params.input,
                updateOnEnterByKeyboard: params.updateOnEnterByKeyboard
            });

            this.bindFormEvents(node);

            return node;
        }, this);
    },

    /**
     * Подписать события формы.
     *
     * @public
     * @param {Object} node Объект элементов формы
     * @returns {BEM.DOM} suggest-form
     */
    bindFormEvents: function(node) {
        var that = this;

        if (node.button) {
            node.button.bindTo('click', function(e) {
                that.trigger('button-click', e);
            });
        }

        that.bindTo('submit', function(e, data) {
            that.onSubmit(e, data);
        });

        return that;
    },

    /**
     * Отправить форму.
     *
     * @param {Object} [data] Сопутствующие данные события `submit`
     * @returns {BEM.DOM} suggest-form
     */
    submit: function(data) {
        this.domElem.trigger('submit', data || {});
        return this;
    },

    /**
     * Инициировать событие отправки формы.
     *
     * @public
     * @param {$.Event} e Объект DOM-события
     * @param {Object} data Сопутствующие данные события
     */
    onSubmit: function(e, data) {
        e.data = data || {};
        this.trigger('submit', e);
    },

    /**
     * Получить список узлов и блоков `input`, `button`, `suggest`, лежащих в них.
     *
     * @public
     * @returns {Object[]}
     */
    getNodeList: function() {
        var that = this,
            nodes = [];

        that.elem('node').each(function(index, nodeElem) {
            var node = $(nodeElem),
                suggest = that.findBlockInside(node, 'suggest'),
                formElems = {
                    input: that.findElem(node, 'input'),
                    button: that.findElem(node, 'button')
                };

            nodes.push({
                node: node,
                suggest: suggest,
                input: that.findBlockOn(formElems.input, that.params.inputName),
                button: that.findBlockOn(formElems.button, that.params.buttonName),
                popup: suggest.findBlockOn(that.params.popupName)
            });
        });

        return nodes;
    }

});

/* end: ../../blocks-desktop/suggest-form/suggest-form.js */
/* begin: ../../blocks-desktop/popup/popup.js */
(function($) {
var KEYDOWN_EVENT = ($.browser.opera && $.browser.version < 12.10) ? 'keypress' : 'keydown';

/**
 @namespace JS-API блока popup
 @name block */

BEM.DOM.decl('popup', /** @lends block.prototype */ {

    onSetMod: {

        js: function() {
            /**
             * Вьюпорт для попапа, в котором он должен быть виден(DOM-нода или window)
             * Блок будет менять направление раскрытия на наилучшее по фактору попадания в _viewport
             * @private
             */
            this._viewport = this.__self.win;

            /**
             * Ссылка на скоуп (по умолчанию `body`)
             * Когда блок показывается он смотрит, является ли он последним
             * потомком скоупа
             * @private
             * @type {BEM}
             */
            this._scope = BEM.DOM.scope;

            /**
             * Перенесен ли попап в контейнер
             * По умолчанию все попапы переносятся в скоуп (`body` или `div`),
             * но есть исключения. Например, фиксированный попап.
             * Если блок обнаруживает, что его родитель — фиксированный попап,
             * то он переместит себя внутрь элемента `content` родителя
             * @private
             * @type {Boolean}
             */
            this._inContainer = null;

            /**
             * DOM-элемент, для которого открывается блок
             * @private
             * @type {jQuery}
             */
            this._owner = null;

            /**
             * Родитель блока
             * @private
             * @type {BEM}
             */
            this._parent = null;

            /**
             * Состояние видимости
             * @private
             * @type Boolean
             */
            this._isShown = false;
        },

        visibility: {

            visible: function() {
                this._onShown();
            },

            '': function() {
                this._onHidden();
            }

        }

    },

    /**
     * Показывает блок
     * @protected
     * @param {Object|jQuery} params - принимает объект с параметрами
     * @returns {BEM}
     */
    show: function(params) {
        var owner;

        if (params instanceof BEM) {
            owner = params.domElem;
        } else if (params instanceof $) {
            owner = params;
        } else if (!params) {
            return;
        }

        /**
         * NOTE: Если нет `owner`, то в `params` хэш с left, top
         */

        if (owner) {
            if (this._owner && owner[0] !== this._owner[0]) {
                this.delMod('visibility');
            }

            this._owner = owner;
        } else {
            this._userPosition = params;
        }

        /**
         * NOTE: Необходимо показать блок для подсчета его размеров
         */
        return this.repaint();
    },

    /**
     * Скрывает блок
     * @protected
     * @returns {BEM}
     */
    hide: function() {
        return this.delMod('visibility');
    },

    /**
     * Показывает/скрывает блок в зависимости от текущего состояния
     * @protected
     * @param {jQuery|Object} [owner] DOM-элемент или координаты { left : x, top : y },
     * относительно которых рассчитывается положение
     *
     * @returns {BEM}
     */
    toggle: function(owner) {
        return this._isShown ?
            this.hide() :
            this.show(owner || this._owner);
    },

    /**
     * Перерисовывает блок с перерасчетом позиции
     * @protected
     * @returns {BEM}
     */
    repaint: function() {
        this._moveToContainer();

        this._show();

        return this;
    },

    setParent: function(block) {
        if (block instanceof BEM) {
            this._parent = block;
        }

        return this;
    },

    setContent: function(content) {
        BEM.DOM.update(this.elem('content'), content);
        this._isShown && this.repaint();

        return this;
    },

    /**
     * Видим ли на данный момент блок
     * По сути шоткат для hasMod('visibility', 'visible')
     * @protected
     * @returns {Boolean}
     */
    isShown: function() {
        return this._isShown;
    },

    /**
     * Делает блок видимым
     * @private
     * @returns {BEM}
     */
    _show: function() {
        this.setMod('visibility', 'visible');

        return this;
    },

    /**
     * Обработчик показа блока
     * @private
     */
    _onShown: function() {
        this.bindToDoc(KEYDOWN_EVENT, function(e) {
            if (e.which === 27) {
                e.preventDefault();
                $(this.__self.doc[0].activeElement).blur();
                this.hide();
            }
        });

        this._isShown = true;

        this.trigger('show');
    },

    /**
     * Обработчик скрытия блока
     * @private
     */
    _onHidden: function() {
        this.unbindFromDoc(KEYDOWN_EVENT);

        this._isShown = false;

        this.trigger('hide');
    },

     /**
     * Перемещает попап в конец скоупа
     * По умолчанию это скоуп (`body` или `div`), но наш родитель — модальное окно
     * (фиксированный попап), то контейнером будет он
     *
     * @param {jQuery} [container] — Контейнер для блока
     * @private
     */
    _moveToContainer: function(container) {
        container ||
            (container = this._parent ? this._parent.domElem : this._scope);

        this._inContainer ?
            container.children(':last')[0] === this.domElem[0] ||
                this.domElem.appendTo(container) :
            this._inContainer = Boolean(this.domElem.appendTo(container));
    },

    destruct: function() {
        var args = arguments;

        this._childs.forEach(function(child) {
            child.destruct.apply(child, args);
        });

        return this.__base.apply(this, args);
    }

}, /** @lends block */ {

    live: function() {
        this.liveBindTo('close', 'leftclick tap', function() {
            this.hide();
        });
    }

});
})(jQuery);

/* end: ../../blocks-desktop/popup/popup.js */
/* begin: ../../blocks-desktop/video-thumb/video-thumb.js */
/* global Ya */
BEM.DOM.decl('video-thumb', {
    onSetMod: {
        js: {
            inited: function() {
                var _this = this;

                Ya.ready(function() {
                    // пропускаем более важные скрипты вперёд
                    setTimeout(_this.loadImage.bind(_this), 0);
                });
            }
        }
    },
    loadImage: function() {
        if (this.domElem && this.params.bgImg) {
            this.domElem.css('background-image', 'url(' + this.params.bgImg + ')');
        }
    }
}, {});

/* end: ../../blocks-desktop/video-thumb/video-thumb.js */
/* begin: ../../blocks-desktop/i-mcounter/i-mcounter.js */
// Блок подсчета энтропии SERP-23808
BEM.decl('i-mcounter', {}, {

    entropy: 0,
    cellSize: 100,
    previous: '',
    current: '',

    moves: {
        total: 0,
        cells: {}
    },

    init: function() {
        this.bind();
    },

    bind: function() {
        var _this = this;

        $(window).unbind('mousemove.i-mcounter').bind('mousemove.i-mcounter', function(e) {
            _this.track(e.clientX, e.clientY);
        });
    },

    track: function(x, y) {
        this.current = this.getKey(x, y);

        if (this.shouldTrack()) {
            this.updateCellCounter();

            this.moves.total++;
            this.previous = this.current;
        }
    },

    shouldTrack: function() {
        return this.current !== this.previous || !this.previous;
    },

    updateCellCounter: function() {
        var cells = this.moves.cells;

        (this.current in cells) || (cells[this.current] = 0);

        cells[this.current]++;
    },

    getKey: function(x, y) {
        return Math.floor(x / 100) + '.' + Math.floor(y / 100);
    },

    getCellPosition: function(value) {
        return Math.floor(value / this.cellSize);
    },

    get: function() {
        this.calculate();
        return this.entropy;
    },

    calculate: function() {
        var entropy = 0,
            cells = this.moves.cells,
            _this = this;

        $.each(cells, function(k, v) {
            var total = _this.moves.total,
                fraction = v / total;

            entropy -= fraction * Math.log(fraction) / Math.log(2);
        });

        this.entropy = entropy;
    }

}).init();

/* end: ../../blocks-desktop/i-mcounter/i-mcounter.js */
/* begin: ../../blocks-common/rum/rum.js */
/* eslint-disable no-use-before-define */ // TODO: удалить после починки линтера
/* global Ya */
/**
 * @file
 * Скрипт для логов RUM (Real User Measurement)
 * @see https://wiki.yandex-team.ru/search-interfaces/velocity/rum/
 *
 * PERF: Файл оптимизирован для минификации
 */
(function(window, document, navigator, PerformanceObserver, undefined) {
    /* eslint-disable-next-line */ // TODO: удалить после починки линтера
    'use strict';
    // @see https://developer.mozilla.org/ru/docs/Web/API/Navigation_timing_API
    var perf = window.performance,
        tm = perf && perf.timing,
        navStart = tm && tm.navigationStart;

    // timing, а так же свойство navigationStart должны быть определены
    if (navStart === undefined) return;

    // Общие переменные
    var Rum = Ya.Rum,
        firstByteFromNavStart = tm.responseStart - navStart,
        dnsTimeFromNavStart = tm.domainLookupStart - navStart,
        docRespEnd = tm.responseEnd,

        navData = perf.navigation || {},

        visState = document.visibilityState,
        visStateCode = {
            visible: 1,
            hidden: 2,
            prerender: 3
        }[visState],

        connection = navigator.connection || {},
        conType = {
            bluetooth: 2064,
            cellular: 2065,
            ethernet: 2066,
            none: 1229,
            wifi: 2067,
            wimax: 2068,
            other: 861,
            unknown: 836
        }[connection.type] || 2771,

        commonVars = [
            // [page] ID страницы
            '143=' + Ya.loadPageId,

            // [region] ID региона
            '287=' + Ya.regionId,

            // [nav-type] См. MDN: https://clck.ru/9edos
            navData.type && ('770.76=' + navData.type),

            // [redirect-count] Количество редиректов
            navData.redirectCount && ('1384.1385=' + navData.redirectCount),

            // [visibility] См. MDN: https://clck.ru/9edpN
            // 2771 – invalid
            '1484=' + (visStateCode ? visStateCode : 1),

            // [connection_type] Тип соединения. MDN: https://clck.ru/AASTf
            conType && ('2437=' + conType),

            // [downlink_max] Максимальная скорость соединения. MDN: https://clck.ru/AASYS
            connection.downlinkMax !== undefined && ('2439=' + connection.downlinkMax),

            // [effective_type] Оценка реального качества соединения. MDN: https://clck.ru/C5hCb
            connection.effectiveType && ('2870=' + connection.effectiveType),

            // Характеристики сети
            connection.rtt !== undefined && ('rtt=' + connection.rtt),
            connection.downlink !== undefined && ('dwl=' + connection.downlink)
        ],

        isResTimingSupported = typeof perf.getEntriesByType === 'function',

        timeMarks = {};

    // Данные счётчика хорошести картинок
    var IMAGE_SIZE_THRESHOLD = 10;
    var SEARCH_IMAGE_LAST_TIMEOUT = 15000;
    var DATA_URI_IMAGE_ID = 'data-uri';

    var imageResourcesExpected = 0;
    var imageResourcesFound = 0;
    var hasDataUriImages = false;
    var hasUnknownImages = false;

    var firstImageTime;
    var lastImageTime;

    if (Ya.isPrerender) {
        commonVars.push('3105=1');
    }

    if (Ya.prerenderStatus) {
        commonVars.push('prerender.status=' + Ya.prerenderStatus);
    }

    // Выполняем расчёты и отправку только когда документ готов
    Ya.ready(function() {
        setTimeout(function() {
            sendPageLoadingTiming();
            sendPaintTiming();

            sendLcp();
            sendFid();
            sendCls();
            sendImageGoodness();

            sendAllResourceTimings();
            triggerRumInit();
        }, 0);
    });

    /**
     * Отправить счётчик /tech/timing
     * Отчёт: https://stat.yandex-team.ru/Yandex/Velocity/PageLoading
     */
    function sendPageLoadingTiming() {
        var counterParams = commonVars.concat([
            // [navigation_start] Время старта запроса
            '2129=' + navStart,

            // [wait] Время ожидания перед запросом
            '1036=' + (tm.domainLookupStart - navStart),

            // [dns] Время DNS Lookup
            '1037=' + (tm.domainLookupEnd - tm.domainLookupStart),

            // [tcp] Время TCP Handshake
            '1038=' + (tm.connectEnd - tm.connectStart),

            // [ssl] Время установки безопасного соединения
            tm.secureConnectionStart ? ('1383=' + (tm.connectEnd - tm.secureConnectionStart)) : null,

            // [ttfb] Время до первого байта
            '1039=' + (tm.responseStart - tm.connectEnd),

            // [html] Время получения HTML от первого байта
            '1040=' + (tm.responseEnd - tm.responseStart),

            // [html-total] Время получения HTML от DNS Lookup
            '1040.906=' + (tm.responseEnd - tm.domainLookupStart),

            // [dom-loading] Время начала парсинга HTML от первого байта
            '1310.2084=' + (tm.domLoading - tm.responseStart),

            // [dom-interactive] Время окончания парсинга HTML от первого байта
            '1310.2085=' + (tm.domInteractive - tm.responseStart),

            // [dom-init] Время выполнения DOMContentLoaded
            '1310.1309=' + (tm.domContentLoadedEventEnd - tm.domContentLoadedEventStart),

            // [dom-loaded] Время начала DOMContentLoaded от первого байта
            '1310.1007=' + (tm.domContentLoadedEventStart - tm.responseStart)
        ]);

        var rawData = {
            '2127': tm.unloadEventStart,
            '2128': tm.unloadEventEnd,
            '2109': tm.redirectStart,
            '2110': tm.redirectEnd,
            '2111': tm.fetchStart,
            '2112': tm.domainLookupStart,
            '2113': tm.domainLookupEnd,
            '2114': tm.connectStart,
            '2115': tm.secureConnectionStart,
            '2116': tm.connectEnd,
            '2117': tm.requestStart,
            '2119': tm.responseStart,
            '2120': tm.responseEnd,
            '2769': tm.domLoading,
            '2770': tm.domInteractive,
            '2123': tm.domContentLoadedEventStart,
            '2131': tm.domContentLoadedEventEnd
        };

        Object.keys(rawData).forEach(function(bsCode) {
            var val = rawData[bsCode];

            if (val) {
                counterParams.push(bsCode + '=' + (val - navStart));
            }
        });

        // 690.1033 – /tech/timing
        sendCounter('690.1033', counterParams);
    }

    function sendPaintTiming() {
        if (!isResTimingSupported || !Ya.isPrerender && Rum.isVisibilityChanged()) {
            return;
        }

        var paintEvents = perf.getEntriesByType('paint');

        for (var i = 0; i < paintEvents.length; i++) {
            var event = paintEvents[i];

            if (event.name === 'first-contentful-paint') {
                // 1926.2794 – paint.first-contentful-paint
                sendTimeMark('1926.2794', event.startTime);
                return;
            }
        }

        // На DomContentLoaded отрисовка может не произойти (например в случае полностью клиентского рендеринга)
        // В этом случае нужно дождаться события отрисовки и попробовать отправить метрики ещё раз
        if (PerformanceObserver) {
            try {
                (new PerformanceObserver(function(list, observer) {
                    sendPaintTiming();
                    observer.disconnect();
                })).observe({ entryTypes: ['paint'] });
            } catch (e) {
            }
        }
    }

    /**
     * Отправить счётчики /tech/perf/resource_timing
     * Отчёт: https://stat.yandex-team.ru/Yandex/Velocity/ResourceLoading
     */
    function sendAllResourceTimings() {
        Rum.sendTimeMark = sendTimeMark;
        Rum.sendResTiming = sendResTiming;
        Rum.getTimeMarks = getTimeMarks;

        var defRes = Rum.__defRes;

        while (defRes.length) {
            var resData = defRes.shift();

            sendResTiming(resData[0], resData[1]);
        }

        var defTimes = Rum.__defTimes;

        while (defTimes.length) {
            var timeData = defTimes.shift();

            sendTimeMark(timeData[0], timeData[1]);
        }

        // Атрибут data-rCid – resource counter ID
        var nodes = document.querySelectorAll('[data-rCid]');

        for (var i = 0, length = nodes.length; i < length; i++) {
            var node = nodes[i],
                url = node.tagName === 'LINK' ? node.href : node.src;

            sendResTiming(node.getAttribute('data-rCid'), url);
        }
    }

    var largestContentfulPaint;

    /**
     * Отправить метрику Largest Contentful Paint
     * @see https://web.dev/lcp/
     */
    function sendLcp() {
        if (!PerformanceObserver || !Ya.isPrerender && Rum.isVisibilityChanged()) {
            return;
        }

        var po = new PerformanceObserver(function(entryList) {
            var entries = entryList.getEntries();

            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                largestContentfulPaint = entry.renderTime || entry.loadTime;
            }
        });

        try {
            po.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {}

        addEventListener('visibilitychange', function onVisChange() {
            if (document.visibilityState !== 'hidden') {
                return;
            }
            removeEventListener('visibilitychange', onVisChange);

            try {
                if (typeof po.takeRecords === 'function') {
                    po.takeRecords(); // очистить буфер
                }
                po.disconnect();
            } catch (e) {}

            finalizeLcp();
        });

        addEventListener('beforeunload', finalizeLcp);
    }

    function finalizeLcp() {
        if (largestContentfulPaint == null) {
            return;
        }

        sendTimeMark('largest-contentful-paint', largestContentfulPaint);

        largestContentfulPaint = null;
    }

    /**
     * Отправить метрику First Input Delay
     * See: https://web.dev/fid/
     */
    function sendFid() {
        try {
            (new PerformanceObserver(function(entryList, observer) {
                var entry = entryList.getEntries()[0];
                if (!entry) {
                    return;
                }

                var fid = entry.processingStart - entry.startTime;
                sendDelta('first-input', fid);

                observer.disconnect();
            })).observe({ type: 'first-input', buffered: true });
        } catch (e) {}
    }

    var clsScore;

    /**
     * Посчитать Cumulative Layout Shift (CLS)
     * See: https://web.dev/cls/
     */
    function sendCls() {
        if (!PerformanceObserver) {
            return;
        }

        var po = new PerformanceObserver(function(entryList) {
            var entries = entryList.getEntries();

            if (clsScore == null) {
                clsScore = 0;
            }

            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                }
            }
        });

        try {
            po.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {}

        addEventListener('visibilitychange', function onVisChange() {
            if (document.visibilityState !== 'hidden') {
                return;
            }

            removeEventListener('visibilitychange', onVisChange);

            try {
                if (typeof po.takeRecords === 'function') {
                    po.takeRecords(); // очистить буфер
                }
                po.disconnect();
            } catch (e) {}

            finalizeCls();
        });

        addEventListener('beforeunload', finalizeCls);
    }

    function finalizeCls() {
        if (clsScore == null) {
            return;
        }

        var score = Math.round(clsScore * 1e6) / 1e6;

        // 690.2096.4004 – tech.perf.cls
        sendCounter('690.2096.4004', commonVars.concat('s=' + score));

        clsScore = null;
    }

    /**
     * Отправить данные о хорошести картинок
     */
    function sendImageGoodness() {
        if (!PerformanceObserver || !Ya.isPrerender && Rum.isVisibilityChanged()) {
            return;
        }

        var candidateElements = document.querySelectorAll('img,[data-rcid],[style*="background"]');

        var targetElements = [];
        for (var i = 0; i < candidateElements.length; i++) {
            var elem = candidateElements[i];
            if (elem.loading === 'lazy' || Ya.lazyImage === 1 && elem.getAttribute('data-image-url')) {
                continue;
            }

            var url;
            if (elem.src) {
                url = elem.src;
            } else {
                url = getComputedStyle(elem).backgroundImage;
                if (url.indexOf('url(') === 0) {
                    url = url.slice(4, -1);
                    if (url[0] === '"' || url[0] === "'") {
                        url = url.slice(1, -1);
                    }
                }
            }

            if (url) {
                if (url.indexOf('data:') === 0) {
                    url = DATA_URI_IMAGE_ID;
                }
                targetElements.push({ elem: elem, url: url });
            }
        }

        requestAnimationFrame(function() {
            var visibleElements = filterVisibleElements(targetElements);
            try {
                handleVisibleElements(visibleElements);
            } catch (e) {}
        });
    }

    function filterVisibleElements(elements) {
        var docElem = document.documentElement;

        var vWidth = docElem.clientWidth;
        var vHeight = docElem.clientHeight;

        var visibleElements = [];

        for (var i = 0; i < elements.length; i++) {
            var elemData = elements[i];
            var rect = elemData.elem.getBoundingClientRect();
            if (rect.width < IMAGE_SIZE_THRESHOLD || rect.height < IMAGE_SIZE_THRESHOLD) {
                continue;
            }

            if (rect.bottom <= 0 || rect.top >= vHeight || rect.right <= 0 || rect.left >= vWidth) {
                continue;
            }

            visibleElements.push(elemData);
        }

        return visibleElements;
    }

    function handleVisibleElements(elements) {
        if (!elements.length) {
            return;
        }

        var normalizeLink = document.createElement('link');

        var urlSet = {};

        for (var i = 0; i < elements.length; i++) {
            var elemData = elements[i];

            if (elemData.url === DATA_URI_IMAGE_ID) {
                hasDataUriImages = true;
                continue;
            }

            normalizeLink.href = elemData.url;
            urlSet[normalizeLink.href] = true;
        }

        if (hasDataUriImages) {
            // Условность – считаем, что data URI загружаются тогда же, когда документ
            firstImageTime = docRespEnd;
            lastImageTime = docRespEnd;
        }

        imageResourcesExpected = Object.keys(urlSet).length;

        if (imageResourcesExpected === 0) {
            return finalizeImageGoodness('e0');
        }

        var finalizeTimeout;

        var po = new PerformanceObserver(function(perfEntryList) {
            var entries = perfEntryList.getEntries();

            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (!urlSet[entry.name]) {
                    continue;
                }

                var time = entry.responseEnd;
                if (!time) {
                    // Случай, когда данные недоступны
                    // Условно считаем, что загрузилось через duration после загрузки документа
                    hasUnknownImages = true;
                    time = docRespEnd + entry.duration;
                }

                if (firstImageTime === undefined || time < firstImageTime) {
                    firstImageTime = time;
                }

                if (lastImageTime === undefined || time > lastImageTime) {
                    lastImageTime = time;
                }

                if (++imageResourcesFound === imageResourcesExpected) {
                    po.disconnect();
                    finalizeImageGoodness('ok');
                    clearTimeout(finalizeTimeout);
                }
            }
        });

        po.observe({
            type: 'resource',
            buffered: true
        });

        finalizeTimeout = setTimeout(function() {
            try {
                po.disconnect();
                finalizeImageGoodness('tm');
            } catch (e) {}
        }, SEARCH_IMAGE_LAST_TIMEOUT);
    }

    function finalizeImageGoodness(finalizeType) {
        // 690.2096.277 – /tech/perf/images
        sendCounter('690.2096.277', [
            'ft=' + firstImageTime,
            'lt=' + lastImageTime,
            'er=' + imageResourcesExpected,
            'fr=' + imageResourcesFound,
            't=' + (finalizeType || 'unk'),
            hasDataUriImages && 'd=1',
            hasUnknownImages && 'u=1'
        ]);
    }

    function triggerRumInit() {
        while (Rum.__rumListeners.length) {
            Rum.__rumListeners.shift()();
        }

        Rum.onRumInited = function(cb) {
            cb();
        };
    }

    /**
     * Отправить счётчик с временной меткой /tech/perf/time. Время считается от начала парсинга документа
     *
     * @param {String} counterId ID метки времени
     * @param {Number} [time] Время. Если не передано, используется время вызова функции
     *
     * @returns {Number} Итоговое время
     */
    function sendTimeMark(counterId, time) {
        time = Math.round((time || Rum.getTime()) * 1000) / 1000;

        // 690.2096.207 - /tech/perf/time
        sendCounter('690.2096.207', commonVars.concat([
            '1701=' + counterId, // id – идентификатор счётчика
            '143.2129=' + navStart, // page.navigation_start
            '207=' + time // time
        ]));

        timeMarks[counterId] = timeMarks[counterId] || [];
        timeMarks[counterId].push(time);

        return time;
    }

    /**
     * Отправить счетчик с дельтой времени /tech/perf/delta
     *
     * @param {String} counterId - ID метки времени
     * @param {Number} delta - Точное значение дельты
     */
    function sendDelta(counterId, delta) {
        var deltaEnd = Rum.getTime();
        var deltaStart = deltaEnd - delta;

        // 690.2096.2877 – /tech/perf/delta
        sendCounter('690.2096.2877', commonVars.concat([
            '1701=' + counterId, // id – идентификатор счётчика
            '207.2154=' + deltaStart, // time.start
            '207.1428=' + deltaEnd, // time.end
            '2877=' + delta // delta
        ]));
    }

    function getTimeMarks() {
        return timeMarks;
    }

    /**
     * Отправить счётчик /tech/perf/resource_timing
     *
     * @param {String|Number} counterId
     * @param {String} url
     */
    function sendResTiming(counterId, url) {
        if (!isResTimingSupported) return;

        var pollingIteration = 0;

        function tryToSendResTiming() {
            var resTimings = perf.getEntriesByName(url);

            if (!resTimings.length) {
                if (pollingIteration++ < 10) {
                    setTimeout(tryToSendResTiming, 300);
                }
                return;
            }

            var resTiming = resTimings[0],

                data = {
                    '1701': counterId,

                    '143': Ya.loadPageId,
                    '287': Ya.regionId,

                    '2323': resTiming.transferSize,
                    '2136': resTiming.duration,
                    '2322': resTiming.startTime,
                    '2137': resTiming.workerStart,
                    '2111': resTiming.fetchStart,
                    '2112': resTiming.domainLookupStart,
                    '2113': resTiming.domainLookupEnd,
                    '2114': resTiming.connectStart,
                    '2115': resTiming.secureConnectionStart,
                    '2116': resTiming.connectEnd,
                    '2117': resTiming.requestStart,
                    '2119': resTiming.responseStart,
                    '2120': resTiming.responseEnd,

                    '2428': pollingIteration,

                    '143.2129': navStart,
                    '143.2112': dnsTimeFromNavStart,
                    '143.2119': firstByteFromNavStart
                },

                vars = Object.keys(data).map(function(bsCode) {
                    var val = data[bsCode];

                    if (val !== undefined) {
                        if (typeof val === 'number') {
                            val = Math.round(val * 1000) / 1000;
                        }
                        return bsCode + '=' + val;
                    }
                });

            // 690.2096.2044 – /tech/perf/resource_timing
            sendCounter('690.2096.2044', vars);
        }

        setTimeout(tryToSendResTiming, 0);
    }

    /**
     * Отправить счётчик
     *
     * @param {String} path – уникальный path счётчика для аналитики
     * @param {String[]} counterParams – данные счётчика
     */
    function sendCounter(path, counterParams) {
        Rum.send(Ya.clck, '/' + [
            'path=' + path,
            'vars=' + counterParams.filter(Boolean).join(','),
            '*'
        ].join('/'));
    }
})(window, document, navigator, window.PerformanceObserver);

/* end: ../../blocks-common/rum/rum.js */
