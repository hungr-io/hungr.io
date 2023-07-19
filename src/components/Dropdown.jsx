import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const CostDropdown = ({expense}) => {
  return (
    <DropdownButton id="dropdown-basic-button" title={`Cost: ${expense}`} >
      <Dropdown.Item value='$'>$</Dropdown.Item>
      <Dropdown.Item value='$$'>$$</Dropdown.Item>
      <Dropdown.Item value='$$$'>$$$</Dropdown.Item>
      <Dropdown.Item value='$$$$'>$$$$</Dropdown.Item>
    </DropdownButton>
  );
}

export const RatingDropdown = () => {
    return (
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item value='1'>1</Dropdown.Item>
        <Dropdown.Item value='2'>2</Dropdown.Item>
        <Dropdown.Item value='3'>3</Dropdown.Item>
        <Dropdown.Item value='4'>4</Dropdown.Item>
        <Dropdown.Item value='5'>5</Dropdown.Item>
      </DropdownButton>
    );
  }