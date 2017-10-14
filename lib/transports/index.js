'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();exports.createRelay=createRelay;var _lodash=require('lodash.uniqueid');var _lodash2=_interopRequireDefault(_lodash);var _core=require('../core');var _tcp=require('./tcp');var _tls=require('./tls');var _websocket=require('./websocket');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const mapping={'tcp':[_tcp.TcpInbound,_tcp.TcpOutbound],'tls':[_tls.TlsInbound,_tls.TlsOutbound],'ws':[_websocket.WsInbound,_websocket.WsOutbound]};function createRelay(transport,context){var _ref=__IS_CLIENT__?[_tcp.TcpInbound,mapping[transport][1]]:[mapping[transport][0],_tcp.TcpOutbound],_ref2=_slicedToArray(_ref,2);const Inbound=_ref2[0],Outbound=_ref2[1];const props={context,Inbound,Outbound};const relay=new _core.Relay(props);relay.id=(0,_lodash2.default)(`${transport}_`);return relay}