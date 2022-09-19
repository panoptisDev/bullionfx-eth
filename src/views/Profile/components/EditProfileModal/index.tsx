import { InjectedModalProps, Modal } from '@pancakeswap/uikit'
import { useTranslation, ContextApi } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useEditProfile, { Views } from './reducer'
import StartView from './StartView'
import PauseProfileView from './PauseProfileView'
import ChangeProfilePicView from './ChangeProfilePicView'
import ApproveCakeView from './ApproveCakeView'

interface EditProfileModalProps extends InjectedModalProps {
  onSuccess?: () => void
}

const viewTitle = (t: ContextApi['t'], currentView: Views) => {
  switch (currentView) {
    case Views.START:
      return t('Edit Profile')
    case Views.CHANGE:
      return t('Change Profile Pic')
    case Views.REMOVE:
      return t('Remove Profile Pic')
    case Views.APPROVE:
      return t('Enable BULL')
    default:
      return ''
  }
}

const EditProfileModal: React.FC<React.PropsWithChildren<EditProfileModalProps>> = ({ onDismiss, onSuccess }) => {
  const { currentView, goToChange, goToRemove, goToApprove, goPrevious } = useEditProfile()
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const isStartView = currentView === Views.START
  const handleBack = isStartView ? null : () => goPrevious()

  return (
    <Modal title={viewTitle(t, currentView)} onBack={handleBack} onDismiss={onDismiss} hideCloseButton={!isStartView}>
      <div style={{ maxWidth: '400px' }}>
        {currentView === Views.START && (
          <StartView goToApprove={goToApprove} goToChange={goToChange} goToRemove={goToRemove} onDismiss={onDismiss} />
        )}
        {currentView === Views.REMOVE && <PauseProfileView onDismiss={onDismiss} onSuccess={onSuccess} chainId={chainId} />}
        {currentView === Views.CHANGE && <ChangeProfilePicView onDismiss={onDismiss} onSuccess={onSuccess} />}
        {currentView === Views.APPROVE && <ApproveCakeView goToChange={goToChange} onDismiss={onDismiss} chainId={chainId} />}
      </div>
    </Modal>
  )
}

export default EditProfileModal
