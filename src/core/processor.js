import EventEmitter from 'events';

import {
  MIDDLEWARE_DIRECTION_UPWARD,
  MIDDLEWARE_DIRECTION_DOWNWARD,
  createMiddleware
} from './middleware';

import {
  SOCKET_CONNECT_TO_DST,
  PROCESSING_FAILED
} from '../presets/defs';

import {Pipe} from './pipe'

/**
 * Processor manage data processing pipeline
 *
 * @example
 *   const processor = new Processor({
 *     presetsInitialParams: {'ss-base': {...}}
 *   });
 *
 *   processor.on('data', (direction, data) => {
 *     // handle processed data here
 *   });
 *
 *   processor.on('connect', (...) => {
 *     // handle server connect to dst
 *   });
 *
 *   process.on('error', (...) => {
 *     // handle errors during processing
 *   });
 *
 *   processor.feed(direction, buffer);
 */
export class Processor extends EventEmitter {

  _pipe = null;

  constructor(options = {}) {
    super();
    this.onPipeNotified = this.onPipeNotified.bind(this);
    this.onProcessed = this.onProcessed.bind(this);
    this._pipe = this.createPipe(options);
  }

  onProcessed(direction, buffer) {
    this.emit('data', direction, buffer);
  }

  onPipeNotified(action) {
    switch (action.type) {
      case SOCKET_CONNECT_TO_DST:
        this.emit('connect', action.payload);
        break;
      case PROCESSING_FAILED:
        this.emit('error', action.payload);
        break;
      default:
        break;
    }
  }

  feed(direction, buffer) {
    this._pipe.feed(direction, buffer);
  }

  createPipe({presetsInitialParams}) {
    const middlewares = __PRESETS__.map((preset) => {
      const {name, params} = preset;
      const options = params;
      if (presetsInitialParams && presetsInitialParams[name]) {
        Object.assign(options, presetsInitialParams[name]);
      }
      return createMiddleware(name, options);
    });
    const pipe = new Pipe({onNotified: this.onPipeNotified});
    pipe.setMiddlewares(MIDDLEWARE_DIRECTION_UPWARD, middlewares);
    pipe.on(`next_${MIDDLEWARE_DIRECTION_UPWARD}`, (buffer) => this.onProcessed(MIDDLEWARE_DIRECTION_UPWARD, buffer));
    pipe.on(`next_${MIDDLEWARE_DIRECTION_DOWNWARD}`, (buffer) => this.onProcessed(MIDDLEWARE_DIRECTION_DOWNWARD, buffer));
    return pipe;
  }

}
