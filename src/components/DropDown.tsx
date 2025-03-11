import React, { ReactElement } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

interface DropDownProps {
  items: MenuProps["items"],
  label: ReactElement
}

export const DropDown: React.FC<DropDownProps> = ({ items, label }) => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      {label}
    </a>
  </Dropdown>
);

export default DropDown;