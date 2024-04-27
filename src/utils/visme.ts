export function applyVisme(): void {
  'use strict';
  if ('undefined' !== typeof window && void 0 === e) {
    var e: any = {
      constants: { mode: { INLINE: 'inline', FULL_PAGE: 'fullPage' } },
      forms: [],
      flags: {
        isInitialized: false,
        isInitOnReadyFired: false,
        shouldBeShown: false,
        shouldBePreloaded: false,
      },
      initOnReady(): void {
        e.flags.isInitOnReadyFired || e.onInit(window, e.init);
      },
      onInit(t: any, i: any): void {
        if (
          t.document &&
          ('complete' === t.document.readyState ||
            'interactive' === t.document.readyState)
        ) {
          i();
          return;
        }
        e.addEvent(t, 'load', i),
          t.document &&
            (e.addEvent(t.document, 'DOMContentLoaded', i),
            e.addEvent(t.document, 'readystatechange', function () {
              'complete' === t.document.readyState && i();
            }));
      },
      init(): void {
        e.flags.isInitialized ||
          ((e.flags.isInitialized = true),
          e.setupVisme(),
          e.addEvent(window, 'message', e.onMessageHandler, false));
      },
      getWidth: (e: any) => (e ? '100vw' : '100%'),
      getHeight: (e: any) => (e ? '100vh' : '100%'),
      getStyle(e: any): string {
        let t: string = 'border: none; max-width: 100vw; ';
        return (
          e &&
            (t +=
              'position: fixed; z-index: 999999; top: 0; left: 0; background: rgba(255, 255, 255, 0.78); '),
          t
        );
      },
      async getPopupSettings({ vismeDiv, formId, origin }: any): Promise<any> {
        if (formId && origin) {
          let e = await fetch(
              `${origin}/ajax/forms/settings/${formId}?type=fullPage`
            ),
            r = await e.json();
          if (r?.settings) return JSON.parse(r.settings);
        }
        if (
          (console.warn(
            'VISME_FORMS: Popup settings are not loaded. Please update your embed code.'
          ),
          vismeDiv.getAttribute('data-trigger-page-load'))
        )
          return { afterPageLoad: true };
        if (vismeDiv.getAttribute('data-trigger-user-interaction'))
          return { afterUserInteraction: true };
        let r = parseInt(vismeDiv.getAttribute('data-trigger-scroll'));
        if (!Number.isNaN(r)) return { afterScrollDown: r };
        if (vismeDiv.getAttribute('data-trigger-leave'))
          return { beforeLeave: true };
        let s = parseInt(vismeDiv.getAttribute('data-trigger-timer'));
        return Number.isNaN(s) ? null : { afterTime: s };
      },
      addOnUserInteractionListener(t: any, i: any): void {
        let r = (): void => {
          e.flags[i] || (t(), (e.flags[i] = true));
        };
        [
          'keydown',
          'mousedown',
          'mousemove',
          'touchmove',
          'touchstart',
          'touchend',
          'wheel',
        ].forEach((e) => {
          document.addEventListener(e, r, { once: true });
        });
      },
      popupHandlers: {
        onAfterTime(e: any, t: any): void {
          setTimeout(() => {
            t();
          }, 1000 * e);
        },
        onPageScroll(e: any, t: any): void {
          let i = document.documentElement.scrollHeight - window.innerHeight;
          i <= 0
            ? t()
            : ((e) => {
                let r = (e / 100) * i,
                  s = (): void => {
                    window.scrollY >= r &&
                      (t(), window.removeEventListener('scroll', s));
                  };
                window.addEventListener('scroll', s);
              })(e);
        },
        onUserInteraction(t: any): void {
          e.addOnUserInteractionListener(t, 'shouldBeShown');
        },
        onPageLeave(e: any): void {
          document.body.addEventListener('mouseleave', e, { once: true });
        },
      },
      setPopupListener(t: any, i: any): void {
        let r = t.settings;
        if (r?.afterPageLoad || !r) {
          i();
          return;
        }
        let {
            afterUserInteraction: s,
            afterScrollDown: o,
            beforeLeave: a,
            afterTime: n,
          } = r,
          { popupHandlers: d } = e;
        n
          ? d.onAfterTime(n, i)
          : o
          ? d.onPageScroll(o, i)
          : s
          ? d.onUserInteraction(i)
          : a && d.onPageLeave(i);
      },
      defineEmbedMode(t: any): string {
        let { INLINE: i, FULL_PAGE: r } = e.constants.mode;
        return 'true' === t.getAttribute('data-full-page') ? r : i;
      },
      preloadForm(t: any): void {
        e.createIframe(t, true),
          e.setPopupListener(t, () => {
            let i = e.getFormByIframeId(t.iframeId);
            if (!i.ref) {
              console.warn('VISME_FORMS: form.ref not found');
              return;
            }
            (i.ref.style.opacity = 1),
              (i.ref.style.zIndex = 999999),
              i.ref.contentWindow.postMessage(
                { type: 'vismeForms:play', id: t.formId },
                '*'
              ),
              e.increaseNumberOfVisits(t.formId),
              e.updateLastVisit(t.formId);
          });
      },
      async setupVisme(): Promise<void> {
        let t = document.getElementsByClassName('visme_d'),
          i = [],
          r = 1;
        for (let s = 0; s < t.length; s++) {
          let o = t[s],
            a = 'true' === o.getAttribute('data-full-page'),
            n = o.getAttribute('data-form-id') || '',
            d = e.getOrigin(o),
            l = e.defineEmbedMode(o),
            m = null;
          a &&
            (m =
              (await e.getPopupSettings({
                vismeDiv: o,
                formId: n,
                origin: d,
              })) || null);
          let g = {
            vismeDiv: o,
            width: e.getWidth(a),
            height: e.getHeight(a),
            style: e.getStyle(a),
            origin: d,
            formId: n,
            mode: l,
            iframeId: r,
            settings: m,
          };
          i.push(g),
            e.forms.push({ formId: n, ref: null, mode: l, iframeId: r }),
            r++;
        }
        i.forEach(async (t) => {
          let i = t.mode === e.constants.mode.FULL_PAGE,
            r = true;
          if (t.settings?.showing)
            switch (t.settings.showing.type) {
              case 'everySession':
                r = !window.sessionStorage.getItem(
                  `vismeforms_${t.formId}_closed`
                );
                break;
              case 'submission':
                r = !window.localStorage.getItem(
                  `vismeforms_${t.formId}_submitted`
                );
                break;
              case 'closingForm':
                r = !window.localStorage.getItem(
                  `vismeforms_${t.formId}_closed`
                );
                break;
              case 'visit':
                r = e.getNumberOfVisits(t.formId) < t.settings.showing.value;
                break;
              case 'onceEvery': {
                let e =
                    parseInt(
                      window.localStorage.getItem(
                        `vismeforms_${t.formId}_lastVisit`
                      ) || '0'
                    ) || 0,
                  [i, s] = t.settings.showing.value.split('*');
                e &&
                  i &&
                  s &&
                  (r =
                    Date.now() >
                    e +
                      parseInt(i) *
                        // @ts-ignore
                        { hours: 36e5, days: 864e5, weeks: 6048e5 }[s]);
              }
            }
          if (i && !r) {
            console.warn(
              'VISME_FORMS: Full page form not shown because of showing settings'
            );
            return;
          }
          i
            ? e.addOnUserInteractionListener(() => {
                e.preloadForm(t);
              }, 'shouldBePreloaded')
            : e.createIframe(t);
        });
      },
      getOrigin(e: any): string {
        let t = e.getAttribute('data-domain') || 'my',
          i = 'local.visme.co' === t,
          r = 'file://' === window.location.origin,
          s = '';
        return (
          r && (s = i ? 'http:' : 'https:'),
          s + '//' + t + (i ? '' : '.visme.co')
        );
      },
      addEvent(e: any, t: any, i: any): void {
        e.addEventListener && e.addEventListener(t, i, false);
      },
      getFormByIframeId: (t: any): any =>
        e.forms.find((e: any) => e.iframeId === t),
      getFormByIdAndMode: (t: any, i: any): any =>
        e.forms.find((e: any) => e.formId === t && e.mode === i),
      createIframe(
        { vismeDiv, width, height, style, iframeId, mode, origin }: any,
        d: boolean = false
      ): void {
        let l = e.getFormByIframeId(iframeId);
        if (!l || l.ref) return;
        let m = document.createElement('IFRAME'),
          g =
            '/formsPlayer/_embed/' +
            vismeDiv.getAttribute('data-url') +
            '?embedIframeId=' +
            iframeId;
        (m.style.cssText = style),
          (m.style.minHeight = vismeDiv.getAttribute('data-min-height')),
          (m.style.width = width),
          (m.style.height = height),
          (m.style.border = 'none'),
          d &&
            ((m.style.transition = 'opacity 0.2s'),
            // @ts-ignore
            (m.style.opacity = 0),
            // @ts-ignore
            (m.style.zIndex = -999)),
          // @ts-ignore
          m.setAttribute('webkitallowfullscreen', true),
          // @ts-ignore
          m.setAttribute('mozallowfullscreen', true),
          // @ts-ignore
          m.setAttribute('allowfullScreen', true),
          m.setAttribute('scrolling', 'no'),
          m.setAttribute('src', origin + g),
          m.setAttribute('title', vismeDiv.getAttribute('data-title')),
          mode === e.constants.mode.INLINE && m.setAttribute('loading', 'lazy'),
          (m.className = 'vismeForms'),
          vismeDiv.parentNode.replaceChild(m, vismeDiv),
          (l.ref = m);
      },
      onMessageHandler(t: any): void {
        if (-1 === t.origin.indexOf('visme')) return;
        let i = t.data.type,
          r = t.data.id;
        if ('vismeForms:shouldClose' === i) {
          let t = e.getFormByIdAndMode(r, e.constants.mode.FULL_PAGE);
          t?.ref.parentNode.removeChild(t.ref),
            window.sessionStorage.setItem(`vismeforms_${r}_closed`, 'true'),
            window.localStorage.setItem(`vismeforms_${r}_closed`, 'true');
        }
        if (
          ('vismeForms:submitSuccess' === i &&
            window.localStorage.setItem(`vismeforms_${r}_submitted`, 'true'),
          'vismeForms:formRectUpdated' === i)
        ) {
          let i = e.getFormByIframeId(parseInt(t.data.iframeId));
          if (!i || i.iframeSizeAdjusted) return;
          let r = JSON.parse(t.data.data.formRect);
          (i.ref.style.minHeight =
            Math.min(Math.max(r.height, 500), 600) +
            Number(t.data.data.badgeHeight) +
            'px'),
            (i.iframeSizeAdjusted = true);
        }
        if ('vismeForms:redirectUser' === i) {
          let { url } = t.data;
          window.location.href = url;
        }
      },
      getNumberOfVisits: (formId: any): number =>
        // @ts-ignore
        parseInt(window.localStorage.getItem(`vismeforms_${formId}_visits`)) ||
        0,
      increaseNumberOfVisits(formId: any): void {
        let i = e.getNumberOfVisits(formId);
        window.localStorage.setItem(`vismeforms_${formId}_visits`, i + 1);
      },
      updateLastVisit(formId: any): void {
        window.localStorage.setItem(
          `vismeforms_${formId}_lastVisit`,
          // @ts-ignore
          Date.now()
        );
      },
    };
    e.initOnReady();
  }
}
