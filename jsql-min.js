(function(){var h=Array.prototype.push,n=Array.prototype.slice,q=Array.prototype.unshift,p=Object.prototype.toString,l=Object.prototype.hasOwnProperty;var k=Array.prototype.forEach,g=Array.prototype.map,s=Array.prototype.reduce,c=Array.prototype.reduceRight,j=Array.prototype.filter,a=Array.prototype.every,r=Array.prototype.some,o=Array.prototype.indexOf,d=Array.prototype.lastIndexOf,b=Array.isArray,t=Object.keys,i=Function.prototype.bind;var e,m,f={};if(typeof(this.jSQL)!=="undefined"){e=this.jSQL;}m=function(){this.init.apply(this,arguments);};m.prototype={init:function(){this._jSQL=e;this._DB=f;this._currentDB=null;this._buffer=null;},create:function(v,u){if(this._DB.hasOwnProperty(v)){throw ("DB Already Exist.");}this._DB[v]=u;return this;},use:function(u){if(!this._DB.hasOwnProperty(u)){throw ("Database Not Exist.");}this._currentDB=this._DB[u];return this;},drop:function(u){if(this._DB.hasOwnProperty(u)){delete this._DB[u];}},select:function(u){if(!this._currentDB){throw ("Please Select Database First.");}this._buffer=this._currentDB;if(u==="*"){return this;}this.where(function(v){return typeof(this._deep(v,u))!=="undefined";});return this;},count:function(){return this._objectToArray(this._buffer).length;},total:function(x){var u=0,w;for(var v in this._currentDB){if(this._currentDB.hasOwnProperty(v)){w=x==="*"?this._currentDB[v]:typeof(x)==="function"?x.call(this,this._currentDB[v],v)===true?true:undefined:this._deep(this._currentDB[v],x);if(typeof(w)!=="undefined"){u++;}}}return u;},orderby:function(w,y,u){var v=this._objectToArray(this._buffer);var x=this;if(typeof(y)!=="function"){y=[u,u=y][0];}v.sort(function(A,z){A=x._deep(A,w);z=x._deep(z,w);if(y){A=y(A);z=y(z);}return u&&u.toLowerCase()==="asc"?A-z:z-A;});this._buffer=this._arrayToObject(v);return this;},where:function(w){var v={},x;this._buffer=this._buffer||this._currentDB;for(var u in this._buffer){if(this._buffer.hasOwnProperty(u)){if(typeof(w)==="function"){x=w.call(this,this._buffer[u],u);}if(this._isArray(w)){x=false;for(var y in w){if(w.hasOwnProperty(y)){if(w[y].call(this,this._buffer[u],u)){x=true;}}}}if(x){v[u]=this._buffer[u];}}}this._buffer=v;return this;},iterate:function(v){var w;this._buffer=this._buffer||this._currentDB;for(var u in this._buffer){if(this._buffer.hasOwnProperty(u)){w=v.call(this,this._buffer[u]);if(w){this.update(u,w);}}}},findAll:function(){return this._buffer;},find:function(v){if(!v){for(var u in this._buffer){if(v){break;}if(this._buffer.hasOwnProperty(u)){v=u;}}}return this._buffer[v];},listAll:function(){return this._objectToArray(this._buffer);},update:function(u,v){if(!this._currentDB){throw ("Please Select Database First.");}if(this._currentDB.hasOwnProperty(u)){this._currentDB[u]=v;}},limit:function(w,u){var v=this._objectToArray(this._buffer);if(!u){w=[0,u=w][0];}this._buffer=this._arrayToObject(v);},_deep:function(x,w){var v=x,w=w.split(".");for(var u=0;u<w.length;u++){v=v[w[u]];}return v;},_isArray:b||function(u){return p.call(u)==="[object Array]";},_isObject:function(u){return u===Object(u);},_clone:function(w){var v={};if(!this._isObject(w)){return w;}if(this._isArray(w)){return w.slice();}for(var u in w){if(w.hasOwnProperty(u)){v[u]=w[u];}}return v;},_objectToArray:function(u){var w=[],u=this._clone(u);for(var v in u){if(u.hasOwnProperty(v)){u[v].__jSQL_Key=v;w.push(u[v]);}}return w;},_arrayToObject:function(x,w){var u={};for(var v=0;v<x.length;v++){u[x[v][w||"__jSQL_Key"]]=x[v];delete u[x[v][w||"__jSQL_Key"]][w||"__jSQL_Key"];}return u;}};typeof(module)!=="undefined"&&module.exports?module.exports=m:this.jSQL=m;})();