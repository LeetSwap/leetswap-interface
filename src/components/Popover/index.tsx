import { Placement } from '@popperjs/core'
import React, { useCallback, useState } from 'react'
import { usePopper } from 'react-popper'
import styled from 'styled-components/macro'
import useInterval from '../../hooks/useInterval'
import Portal from '@reach/portal'

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(4, 76, 26, 0.7);
  box-shadow: 0 0 5px rgba(74, 222, 128, 0.1), 0 0 7px rgba(74, 222, 128, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(4px) brightness(50%) saturate(150%);
  color: ${({ theme }) => theme.text1};
  border-radius: 8px;
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.bg3};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg2};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  children: React.ReactNode
  placement?: Placement
}

export default function Popover({ content, show, children, placement = 'auto' }: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })
  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  return (
    <>
      <ReferenceElement ref={setReferenceElement as any}>{children}</ReferenceElement>
      <Portal>
        <PopoverContainer show={show} ref={setPopperElement as any} style={styles.popper} {...attributes.popper}>
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement as any}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </>
  )
}
