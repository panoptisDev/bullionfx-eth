import { memo } from 'react'
import { useMatchBreakpointsContext } from '@pancakeswap/uikit'
import { usePool, useDeserializedPoolByVaultKey } from 'state/pools/hooks'
import { VaultKey } from 'state/types'
import { GradientBar } from 'views/Farms/components/FarmTable/styleds'

import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ActionPanel from './ActionPanel/ActionPanel'
import AutoEarningsCell from './Cells/AutoEarningsCell'
import AutoAprCell from './Cells/AutoAprCell'
import StakedCell from './Cells/StakedCell'
import ExpandRow from './ExpandRow'

export const VaultPoolRow: React.FC<
  React.PropsWithChildren<{ vaultKey: VaultKey; account: string; initialActivity?: boolean; isLastChild?:boolean }>
> = memo(({ vaultKey, account, initialActivity, isLastChild }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpointsContext()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const pool = useDeserializedPoolByVaultKey(vaultKey)

  return (
    <ExpandRow
      initialActivity={initialActivity}
      panel={
        <ActionPanel account={account} pool={pool} expanded breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }} />
      }
      isLastChild={isLastChild}
    >
      <NameCell pool={pool} />
      {isXLargerScreen && <AutoEarningsCell pool={pool} account={account} />}
      {isXLargerScreen ? <StakedCell pool={pool} account={account} /> : null}
      <AutoAprCell pool={pool} />
      {isLargerScreen && <TotalStakedCell pool={pool} />}
      {!isLastChild && <GradientBar />}
    </ExpandRow>
  )
})

const PoolRow: React.FC<React.PropsWithChildren<{ sousId: number; account: string; initialActivity?: boolean; isLastChild?:boolean }>> = ({
  sousId,
  account,
  initialActivity,
  isLastChild
}) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isDesktop } = useMatchBreakpointsContext()
  const isLargerScreen = isLg || isXl || isXxl
  const { pool } = usePool(sousId)

  return (
    <ExpandRow
      initialActivity={initialActivity}
      panel={
        <ActionPanel account={account} pool={pool} expanded breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }} />
      }
      isLastChild={isLastChild}
    >
      <NameCell pool={pool} />
      <EarningsCell pool={pool} account={account} />
      {isLargerScreen && <TotalStakedCell pool={pool} />}
      <AprCell pool={pool} />
      {isDesktop && <EndsInCell pool={pool} />}
      {!isLastChild && <GradientBar />}
    </ExpandRow>
  )
}

export default memo(PoolRow)
