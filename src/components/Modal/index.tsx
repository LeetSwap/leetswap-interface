import React from 'react'
import styled, { css } from 'styled-components'
import { animated, useTransition, useSpring } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { isMobile } from 'react-device-detect'
import '@reach/dialog/styles.css'
import { transparentize } from 'polished'
import { useGesture } from 'react-use-gesture'
import { Glow } from '../../pages/AppBody'

const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    backdrop-filter: blur(4px) brightness(50%) saturate(150%);
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: ${({ mobile }) => (mobile ? 'hidden' : 'hidden')};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.darkTransparent3} 0%, ${theme.dark2} 50%, ${theme.darkTransparent3} 100%);`};
    border: 1px solid ${({ theme }) => theme.bg1};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    border: 1px solid rgba(4, 76, 26, 0.7);
    box-shadow: 0 0 5px rgba(74, 222, 128, 0.1), 0 0 7px rgba(74, 222, 128, 0.1);
    padding: 0px;
    width: 50vw;
    overflow-y: ${({ mobile }) => (mobile ? 'hidden' : 'hidden')};
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 420px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 12px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 65vw;
      margin: 0;
    `}
    ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
      width:  85vw;
      ${
        mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      }
    `}
    ${Glow}
  }
`

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss()
      }
    },
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: { transform: y.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
