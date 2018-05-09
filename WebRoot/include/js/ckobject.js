/**
 * 
 */
(function() {
    var CKobject = {
    		uaMatch:function(u,rMsie,rFirefox,rOpera,rChrome,rSafari,rSafari2,mozilla,mobile){
    			var match = rMsie.exec(u);
    			if (match != null) {
    				return {
    					b: 'IE',
    					v: match[2] || '0'
    				}
    			}
    			match = rFirefox.exec(u);
    			if (match != null) {
    				return {
    					b: match[1] || '',
    					v: match[2] || '0'
    				}
    			}
    			match = rOpera.exec(u);
    			if (match != null) {
    				return {
    					b: match[1] || '',
    					v: match[2] || '0'
    				}
    			}
    			match = rChrome.exec(u);
    			if (match != null) {
    				return {
    					b: match[1] || '',
    					v: match[2] || '0'
    				}
    			}
    			match = rSafari.exec(u);
    			if (match != null) {
    				return {
    					b: match[2] || '',
    					v: match[1] || '0'
    				}
    			}
    			match = rSafari2.exec(u);
    			if (match != null) {
    				return {
    					b: match[1] || '',
    					v: match[2] || '0'
    				}
    			}
    			match = mozilla.exec(u);
    			if (match != null) {
    				return {
    					b: match[1] || '',
    					v: match[2] || '0'
    				}
    			}
    			match = mobile.exec(u);
    			if (match != null) {
    				return {
    					b: match[1] || '',
    					v: match[2] || '0'
    				}
    			}
    			else {
    				return {
    					b: 'unknown',
    					v: '0'
    				}
    			}
    		},
    		browser: function() {
    			var u = navigator.userAgent,
    			rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    			rFirefox = /(firefox)\/([\w.]+)/,
    			rOpera = /(opera).+version\/([\w.]+)/,
    			rChrome = /(chrome)\/([\w.]+)/,
    			rSafari = /version\/([\w.]+).*(safari)/,
    			rSafari2 = /(safari)\/([\w.]+)/,
    			mozilla = /(mozilla)\/([\w.]+)/,
    			mobile = /(mobile)\/([\w.]+)/;
    			var c = u.toLowerCase();
    			var d = this.uaMatch(c,rMsie,rFirefox,rOpera,rChrome,rSafari,rSafari2,mozilla,mobile);
    			if (d.b) {
    				b = d.b;
    				v = d.v;
    			}
    			return {B: b, V: v};
            },
            Platform: function() {
                var w = '';
                var u = navigator.userAgent,
                app = navigator.appVersion;
                var b = {
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                    iPad: u.indexOf('iPad') > -1,
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    webKit: u.indexOf('AppleWebKit') > -1,
    				trident: u.indexOf('Trident') > -1,
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                    presto: u.indexOf('Presto') > -1,
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
                    webApp: u.indexOf('Safari') == -1
                };
                for (var k in b) {
                    if (b[k]) {
                        w = k;
                        break;
                    }
                }
                return w;
            }	
    }
    window.CKobject = CKobject;	
})();