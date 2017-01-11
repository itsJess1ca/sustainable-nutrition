import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const getWindowSize = () => {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
};

const createWindowSize$ = () =>
  Observable.fromEvent(window, 'resize')
    .map(getWindowSize)
    .startWith(getWindowSize())
    .publishReplay(1)
    .refCount();


@Injectable()
export class WindowSize {
  width$: Observable<number>;
  height$: Observable<number>;
  size$: Observable<any>;
  _height: number;
  _width: number;

  constructor() {
    let windowSize$ = createWindowSize$();
    this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();
    this.height$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();
    this.size$ = this.height$.do(data => console.log(data)).combineLatest(this.width$, (height, width) => ({
      height: height,
      width: width
    }));
  }

  get height() {
    return getWindowSize().height;
  }
  get width() {
    return getWindowSize().width;
  }
}
