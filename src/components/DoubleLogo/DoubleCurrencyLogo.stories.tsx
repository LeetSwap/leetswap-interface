import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { DIFFUSION, XDIFFUSION } from '../../constants/tokens'
import Component, { DoubleCurrencyLogoProps } from './index'

export default {
  title: 'DoubleCurrencyLogo',
  decorators: [],
}

const Template: Story<DoubleCurrencyLogoProps> = (args) => <Component {...args} />

export const DoubleCurrencyLogo = Template.bind({})
DoubleCurrencyLogo.args = {
  currency0: DIFFUSION[59140],
  currency1: XDIFFUSION[59140],
  size: 220,
}
