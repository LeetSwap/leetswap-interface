import styled from 'styled-components'
import TuxBannerPng from '../../assets/images/tux_banner_50.png'
import React from 'react'
import { Glow } from '../../pages/AppBody'

const TuxBanner = styled.img`
  border-radius: 10px;
  height: 150px;
  width: 100%;
  object-fit: cover;
  object-position: 0% 20%;
  margin-top: -10%;
  margin-bottom: 1%;
  border: 1px solid rgba(74, 222, 128, 0.6);
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.1), 0 0 40px rgba(74, 222, 128, 0.3);
  -webkit-filter: brightness(90%) contrast(90%) grayscale(50%);
  filter: brightness(80%) contrast(100%);
  ${Glow}
`
export const Tux = () => <TuxBanner src={TuxBannerPng} />
