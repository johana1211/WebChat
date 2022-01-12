/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import LogoUcch from '../../../assets/logo-ucch.png';
import UserSVG from '../../../assets/user.svg';
import { webchatProps } from '../../WebChat/Webchat';

export const TriggerButton: FC<webchatProps> = function ({
  handleCollapse,
  isCollapsed,
  agentName,
}) {
  return (
    <button
      type="button"
      className={!isCollapsed ? 'button-trigger__ewc-class' : 'hidden'}
      onClick={handleCollapse}>
      <img
        className="trigger-avatar__ewc-class"
        src={agentName === '' ? LogoUcch : UserSVG}
        alt=""
      />
    </button>
  );
};
