import * as React from 'react'
import NextNProgress, { NextNProgressProps } from './NextNProgress'
import * as Spinners from 'react-spinners'
import {
  LoaderHeightWidthRadiusProps,
  LoaderSizeProps,
} from 'react-spinners/helpers/props' 


type spinnerTypes = keyof typeof Spinners
interface spinnerProps extends LoaderHeightWidthRadiusProps, LoaderSizeProps {}
interface NextProgressbarSpinnerProps {
  NextNProgressProps?: Omit<NextNProgressProps, 'setExternalSpinnerLoading'>
  spinnerProps?: Omit<spinnerProps, 'loading'>
  spinnerType?: spinnerTypes
}

const NextProgressbarSpinner = ({
  NextNProgressProps,
  spinnerProps = {color: '#61DCFB'},
  spinnerType,
}: NextProgressbarSpinnerProps) => {
  const [loading, setLoading] = React.useState(false)

  if (spinnerType) {
    const DynamicSpinner = Spinners[spinnerType]

    const setExternalSpinnerLoading = (value: boolean) => {      
      setLoading(value)
    }

    return (
      <>
        <NextNProgress
          {...NextNProgressProps}
          setExternalSpinnerLoading={setExternalSpinnerLoading}
        />
        <DynamicSpinner {...spinnerProps} loading={loading} />
      </>
    )
  }
  return (
    <>
      <NextNProgress {...NextNProgressProps} />
    </>
  )
}
export default NextProgressbarSpinner;