// # src / flip / project.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>

import 'core-js/fn/function/bind';

import { fromEvent, of } from 'rxjs';
import { tap, finalize, filter, switchMap, take, zip } from 'rxjs/operators';

import { animate, empty } from '../common';

function cacheImage$(img) {
  if (!img) return of({});

  const imgObj = new Image();
  const image$ = fromEvent(imgObj, 'load').pipe(
    take(1),
    finalize(() => { imgObj.src = ''; }),
  );
  imgObj.src = img.currentSrc || img.src;

  return image$;
}

export default function setupFLIPProject(start$, ready$, fadeIn$, { animationMain, settings }) {
  if (!animationMain) return start$;

  const flip$ = start$.pipe(
    filter(({ flipType }) => flipType === 'project'),
    switchMap(({ anchor }) => {
      const img = anchor.querySelector('.project-card-img');
      if (!anchor || !img) return of({});

      const page = animationMain.querySelector('.page');
      if (!page) return of({});

      const titleNode = anchor.parentNode.querySelector('.project-card-title');
      const title = (titleNode && titleNode.textContent) || '|';

      const h1 = document.createElement('h1');
      h1.classList.add('page-title');
      h1.style.opacity = 0;
      h1.textContent = title;

      const postDate = document.createElement('div');
      postDate.classList.add('post-date');
      postDate.classList.add('heading');
      postDate.style.opacity = 0;
      postDate.textContent = '|';

      empty.call(page);
      page.appendChild(h1);
      page.appendChild(postDate);

      const placeholder = document.createElement('div');
      placeholder.classList.add('sixteen-nine');

      img.parentNode.insertBefore(placeholder, img);
      img.classList.add('lead');
      img.style.transformOrigin = 'left top';

      page.appendChild(img);
      animationMain.style.position = 'fixed';
      animationMain.style.opacity = 1;

      const first = placeholder.getBoundingClientRect();
      const last = img.getBoundingClientRect();

      const invertX = first.left - last.left;
      const invertY = first.top - last.top;
      const invertScale = first.width / last.width;

      const transform = [
        { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
        { transform: 'translate3d(0, 0, 0) scale(1)' },
      ];

      return animate(img, transform, settings)
        .pipe(tap({ complete() { animationMain.style.position = 'absolute'; } }));
    }),
  );

  start$.pipe(switchMap(({ flipType }) => ready$.pipe(
    filter(() => flipType === 'project'),
    switchMap(({ replaceEls: [main] }) => {
      const imgWrapper = main.querySelector('.img');
      if (!imgWrapper) return of({});
      imgWrapper.style.opacity = 0;

      const img = imgWrapper.querySelector('img');

      return cacheImage$.call(this, img).pipe(
        zip(fadeIn$),
        tap(() => {
          imgWrapper.style.opacity = 1;
          animationMain.style.opacity = 0;
        }),
        switchMap(() => (img ?
          animate(animationMain, [{ opacity: 1 }, { opacity: 0 }], { duration: 500 }) :
          of({}))),
        finalize(() => {
          animationMain.style.opacity = 0;
        }),
      );
    }),
  )))
    .subscribe();

  return flip$;
}
