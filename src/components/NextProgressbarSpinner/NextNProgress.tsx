import Router from 'next/router'
import * as NProgress from 'nprogress'
import * as React from 'react'

/**
 *
 *
 * @interface NextNProgressProps
 */
export interface NextNProgressProps {
  /**
   * The visibility property of the bar.
   * @default "visible"
   */
  progressBarVisibility?: 'visible' | 'hidden'
  /**
   * The color of the bar.
   * @default "#29D"
   */
  color?: string

  /**
   * The progress % start position of the bar.
   * @default 0.3
   */
  startPosition?: number
  /**
   * The delay in milliseconds to be removed after load ends.
   * @default 200
   */
  stopDelayMs?: number
  /**
   * The height of the bar.
   * @default 3
   */
  height?: number
  /**
   * Whether to show the bar on shallow routes.
   * @default true
   */
  showOnShallow?: boolean
  /**
   * The other NProgress configuration options to pass to NProgress.
   * Default set to hide NProgress original spinner
   * @default { showSpinner: false }
   */
  options?: Partial<NProgress.NProgressOptions>
  /**
   * The nonce attribute to use for the `style` tag.
   * @default undefined
   */
  nonce?: string
  /**
   * The NProgress spinner top position.
   * @default "15px"
   */
  spinnerTop?: string
  /**
   * The NProgress spinner right position.
   * @default "15px"
   */
  spinnerRight?: string
  /**
   * The react-spinners useState controller.
   *
   */
  setExternalSpinnerLoading?: (value: boolean) => void
}

/**
 * NextNProgress
 *
 *
 *
 *
 */
export default function NextNProgress({
  progressBarVisibility = 'visible',
  color = '#61DCFB',
  spinnerTop = '15px',
  spinnerRight = '15px',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  showOnShallow = true,
  options = { showSpinner: false },
  nonce,
  setExternalSpinnerLoading,
}: NextNProgressProps) {
  let timer: NodeJS.Timeout | null = null

  const routeChangeStart = (
    _: string,
    {
      shallow,
    }: {
      shallow: boolean
    },
  ) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition)
      NProgress.start()
      setExternalSpinnerLoading?.(true)
    }
  }

  const routeChangeEnd = (
    _: string,
    {
      shallow,
    }: {
      shallow: boolean
    },
  ) => {
    if (!shallow || showOnShallow) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        NProgress.done(true)
        setExternalSpinnerLoading?.(false)
      }, stopDelayMs)
    }
  }

  const routeChangeError = (
    _err: Error,
    _url: string,
    {
      shallow,
    }: {
      shallow: boolean
    },
  ) => {
    if (!shallow || showOnShallow) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        NProgress.done(true)
      }, stopDelayMs)
    }
  }

  React.useEffect(() => {
    if (options) {
      NProgress.configure(options)
    }

    Router.events.on('routeChangeStart', routeChangeStart)
    Router.events.on('routeChangeComplete', routeChangeEnd)
    Router.events.on('routeChangeError', routeChangeError)
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart)
      Router.events.off('routeChangeComplete', routeChangeEnd)
      Router.events.off('routeChangeError', routeChangeError)
    }
  })

  return (
    <style nonce={nonce}>{`
       #nprogress {
         pointer-events: none;
       }
       #nprogress .bar {
         background: ${color};
         position: fixed;
         z-index: 9999;
         top: 0;
         left: 0;
         width: 100%;
         height: ${height}px;
         visibility: ${progressBarVisibility};
       }
       #nprogress .peg {
         display: block;
         position: absolute;
         right: 0px;
         width: 100px;
         height: 100%;
         box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
         opacity: 1;
         -webkit-transform: rotate(3deg) translate(0px, -4px);
         -ms-transform: rotate(3deg) translate(0px, -4px);
         transform: rotate(3deg) translate(0px, -4px);
       }
       #nprogress .spinner {
         display: block;
         position: fixed;
         z-index: 1031;
         top: ${spinnerTop};
         right: ${spinnerRight};
       }
       #nprogress .spinner-icon {
         width: 18px;
         height: 18px;
         box-sizing: border-box;
         border: solid 2px transparent;
         border-top-color: ${color};
         border-left-color: ${color};
         border-radius: 50%;
         -webkit-animation: nprogresss-spinner 400ms linear infinite;
         animation: nprogress-spinner 400ms linear infinite;
       }
       .nprogress-custom-parent {
         overflow: hidden;
         position: relative;
       }
       .nprogress-custom-parent #nprogress .spinner,
       .nprogress-custom-parent #nprogress .bar {
         position: absolute;
       }
       @-webkit-keyframes nprogress-spinner {
         0% {
           -webkit-transform: rotate(0deg);
         }
         100% {
           -webkit-transform: rotate(360deg);
         }
       }
       @keyframes nprogress-spinner {
         0% {
           transform: rotate(0deg);
         }
         100% {
           transform: rotate(360deg);
         }
       }
     `}</style>
  )
}
