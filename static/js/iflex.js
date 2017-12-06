// import device from './device';

function iflex(prefixion) {
    var device = bowser;
    var doc = document;
    var win = window;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var dpr = 0;
    var scale = 0;

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    }

    if (!dpr && !scale) {
        var devicePixelRatio = win.devicePixelRatio;
        if (device.iphone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    docEl.setAttribute('data-dpr', dpr);

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        // var rem = width / 100;
        if (device.isMobile) {
            docEl.className = prefixion+'-mobile';
            docEl.style.fontSize = parseInt((100 * (width / 750)))+'px';
        } else {
            docEl.style.fontSize = '50px';
            docEl.className = prefixion+'-pc';
        }
    }

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = (12 * dpr) +'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function() {
            doc.body.style.fontSize = (12 * dpr) + 'px';
        }, false);
    }

    refreshRem();

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem, false);
}

iflex('di');
