import { Address } from './App';

const API_URL = 'http://localhost:8080/api/v1/address';

export const getAddresses = async (): Promise<Address[]> => {
  const response = await fetch(`${API_URL}/getAll`);
  if (!response.ok) {
    throw new Error('Failed to fetch addresses');
  }
  const data = await response.json();
  return data;
};

export const createAddress = async (address: Address): Promise<Address> => {
  const response = await fetch(`${API_URL}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(address),
  });
  if (!response.ok) {
    throw new Error('Failed to create address');
  }
  const data = await response.json();
  return data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete address');
  }
};

export const updateAddress = async (id: number, updatedAddress: Address): Promise<Address> => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAddress),
  });
  if (!response.ok) {
    throw new Error('Failed to update address');
  }
  const data = await response.json();
  return data;
};
