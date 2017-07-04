export const SOCKET_CONNECT_TO_DST = 'socket/connect/to/dst';
export const PROCESSING_FAILED = 'processing/failed';

export class IPreset {

  /**
   * how to deal with the action, return false to ignore
   * @returns {boolean}
   */
  onNotified(/* action */) {
    return false;
  }

  // +-----------------------------------------------+
  // |                      TCP                      |
  // +-----------------------------------------------+

  // hooks for TCP

  beforeOut({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  beforeIn({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  // interfaces for TCP

  clientOut({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  serverIn({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  serverOut({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  clientIn({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  // +-----------------------------------------------+
  // |                      UDP                      |
  // +-----------------------------------------------+

  // hooks for UDP

  beforeOutUdp({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  beforeInUdp({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  // interfaces for UDP

  clientOutUdp({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  serverInUdp({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  serverOutUdp({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

  clientInUdp({buffer/* , next, broadcast, direct, fail */}) {
    return buffer;
  }

}
