import { useState, memo, ReactNode, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useMatchBreakpointsContext } from '@pancakeswap/uikit'
import { GradientBar } from 'views/Farms/components/FarmTable/styleds'

import ExpandActionCell from './Cells/ExpandActionCell'

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  position: relative;
  cursor: pointer;
`

const ExpandRow: React.FC<
  React.PropsWithChildren<{ children: ReactNode; panel: ReactNode; initialActivity?: boolean, isLastChild?: boolean }>
> = ({ children, panel, initialActivity, isLastChild }) => {
  const hasSetInitialValue = useRef(false)
  const { isTablet, isDesktop } = useMatchBreakpointsContext()

  const [expanded, setExpanded] = useState(initialActivity)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])
  useEffect(() => {
    if (initialActivity && hasSetInitialValue.current === false) {
      setExpanded(initialActivity)
      hasSetInitialValue.current = true
    }
  }, [initialActivity])

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        {children}
        {isLastChild && expanded && <GradientBar />}
        <ExpandActionCell expanded={expanded} isFullLayout={isTablet || isDesktop} />
      </StyledRow>
      {shouldRenderActionPanel && panel}
    </>
  )
}

export default memo(ExpandRow)
