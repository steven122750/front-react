import React, { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import AddressTable from './AddressTable';
import { getAddresses, deleteAddress, updateAddress, createAddress } from './api';

export interface Address {
  id?: number;
  streetType: string;
  streetNumber: string;
  postalCode: number;
  details: string;
}

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = async (newAddress: Address) => {
    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses([...addresses, createdAddress]);
    } catch (error) {
      setError('Error al agregar la dirección');
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      setError('Error al eliminar la dirección');
    }
  };

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleUpdateAddress = async (updatedAddress: Address) => {
    try {
      const updated = await updateAddress(updatedAddress.id!, updatedAddress);
      const updatedAddresses = addresses.map((address) =>
        address.id === updated.id ? updated : address
      );
      setAddresses(updatedAddresses);
      setSelectedAddress(null);
    } catch (error) {
      setError('Error al actualizar la dirección');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestión de Direcciones</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <AddressForm
        onAdd={handleAddAddress}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        onUpdate={handleUpdateAddress}
      />
      <AddressTable
        addresses={addresses}
        onDelete={handleDeleteAddress}
        onEdit={handleEditAddress}
      />
    </div>
  );
};

export default App;
