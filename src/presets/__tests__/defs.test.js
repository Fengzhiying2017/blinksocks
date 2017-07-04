import {IPreset} from '../defs';

const instance = new IPreset();
const params = {buffer: null};

describe('IPreset#onNotified', function () {

  it('should return false', function () {
    expect(instance.onNotified()).toBe(false);
  });

});

describe('IPreset#beforeIn,beforeOut,clientOut,serverIn,serverOut,clientIn', function () {

  it('should return null', function () {
    expect(instance.beforeIn(params)).toBe(null);
    expect(instance.beforeOut(params)).toBe(null);
    expect(instance.clientOut(params)).toBe(null);
    expect(instance.serverIn(params)).toBe(null);
    expect(instance.serverOut(params)).toBe(null);
    expect(instance.clientIn(params)).toBe(null);
  });

  it('should return null', function () {
    expect(instance.beforeInUdp(params)).toBe(null);
    expect(instance.beforeOutUdp(params)).toBe(null);
    expect(instance.clientOutUdp(params)).toBe(null);
    expect(instance.serverInUdp(params)).toBe(null);
    expect(instance.serverOutUdp(params)).toBe(null);
    expect(instance.clientInUdp(params)).toBe(null);
  });

});
