# Next.js Progressbar Spinner

Next.js component for a loading effect between pages mixing [nprogress](http://ricostacruz.com/nprogress/) with [react-spinners](https://www.davidhu.io/react-spinners/)

This component was based on [Next.js Progressbar](https://github.com/apal21/nextjs-progressbar)

## Live demo
[https://.vercel.app](https://.vercel.app/)

## Why not use both individualy?
As a study to learn how to create package and distribute modules on npm, and also add some extra configs.

## How to install?

```bash
npm i nextjs-progressbar-spinner
```

## How to use?

Import NextProgressbarSpinner in your `pages/_app.js` file or a component inside it:

```js
import { NextProgressbarSpinner } from 'nextjs-progressbar-spinner'
```

And for rendering add `<NextProgressbarSpinner />` to your `return()`:

```js
import { NextProgressbarSpinner } from 'nextjs-progressbar-spinner'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextProgressbarSpinner />
      <Component {...pageProps} />      
    </>
  )
}

export default MyApp
```
- You can also use it inside other components like the demo is using it inside a header

### Default Config

If no props are passed to `<<NextProgressbarSpinner  />`, below is the default configuration applied and the spinner is not rendered.

```jsx
<<NextProgressbarSpinner 
  NextNProgressProps={
  progressBarVisibility = 'visible',
  color = '#61DCFB',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  showOnShallow = true,
  }
/>
```

- `color`: to change the default color of progressbar. You can also use `rgb(,,)` or `rgba(,,,)`.
- `startPosition`: to set the default starting position : `0.3 = 30%`.
- `stopDelayMs`: time for delay to stop progressbar in `ms`.
- `height`: height of progressbar in `px`.
- `showOnShallow`: You can choose whether you want the progressbar to be displayed if you're using shallow routing. It takes a boolean. Learn more about shallow routing [in Next.js docs](https://nextjs.org/docs/routing/shallow-routing).
- `progressBarVisibility `: in case you dont want to show the progressBar set it to  `'hidden'`
- `options = { showSpinner: false }` by default the spinner from nprogress is hidden, if you want it set this prop to `true`. Extra options props are linked bellow
- `spinnerTop` and `spinnerRight` in case you set the default nprogress spinner to visible you cant set its position with this 2 props

#### React-Spinners Configs

```jsx
<NextProgressbarSpinner 
  spinnerType="CircleLoader"
  spinnerProps={{
    size: '2rem',
    color: '#61DCFB',
    cssOverride: {},
    speedMultiplier: 2.5,
    height: 5,
    width: 5,
    radius: 5,
    margin: 5,
  }}
/>
```
- Not all spinners share the same props, check the docs and story book
- Documentation of props is provided by the module itself [react-spinners](https://github.com/davidhu2000/react-spinners#available-loaders-proptypes-and-default-values)
- And also a [storybook](https://www.davidhu.io/react-spinners/storybook/) with a full list of `spinnerType`

#### Other Configs

You can use [other configurations](https://github.com/rstacruz/nprogress#configuration) which NProgress provides by adding a JSON in `options` props.

```jsx
 <NextProgressbarSpinner
   NextNProgressProps={{
    options: { 
      minimum: number;
      template: string;
      easing: string;
      speed: number;
      trickle: boolean;
      trickleSpeed: number;
      showSpinner: boolean;
      parent: string;: false 
    },
   }} 
/>

```

## 📝 Acknowlegements

- [apal21](https://github.com/apal21), [rstacruz](https://github.com/rstacruz) and [davidhu2000](https://github.com/davidhu2000) for their modules
- [alexeagleson](https://github.com/alexeagleson) for the detailed guide on [How to Create and Publish a React Component Library](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe)

## 🔖 Show your support

- Give a ⭐️ if you like this project!
- Feel free to send any PR if you think antything can be improved

