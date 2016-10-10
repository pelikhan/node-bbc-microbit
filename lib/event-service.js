var EVENTSERVICE_SERVICE_UUID          = 'E95D93AF251D470AA062FA1922DFA9A8';
var MICROBITEVENT_CHARACTERISTIC_UUID = 'E95D9775251D470AA062FA1922DFA9A8';

var CLIENTREQUIREMENTS_CHARACTERISTIC_UUID = "E95D23C4251D470AA062FA1922DFA9A8";
var CLIENTEVENT_CHARACTERISTIC_UUID = "E95D5404251D470AA062FA1922DFA9A8";

var EventService = function() {
};

EventService.prototype.hasEventService = function() {
  return this.hasService(EVENTSERVICE_SERVICE_UUID);
};

EventService.prototype.subscribeEvent = function(callback) {
  this.onEventBinded = this.onEvent.bind(this);

  this.subscribeCharacteristic(EVENTSERVICE_SERVICE_UUID, MICROBITEVENT_CHARACTERISTIC_UUID, this.onEventBinded, callback);
};

EventService.prototype.unsubscribeEvent = function(callback) {
  this.unsubscribeCharacteristic(EVENTSERVICE_SERVICE_UUID, MICROBITEVENT_CHARACTERISTIC_UUID, this.onEventBinded, callback);
};

EventService.prototype.onEvent = function(data) {
  this.emit('event', data.readInt16LE(0), data.readInt16LE(2));
};

EventService.prototype.writeEvent = function(id, value, callback) {
  var data = id << 16 | value
  this.writeUInt32LECharacteristic(EVENTSERVICE_SERVICE_UUID, CLIENTEVENT_CHARACTERISTIC_UUID, data, callback);
}

module.exports = EventService;
