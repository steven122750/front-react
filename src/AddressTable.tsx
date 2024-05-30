import React, { useState } from 'react';
import { Address } from './App';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa'; // Importing icons from Font Awesome

interface AddressTableProps {
  addresses: Address[];
  onDelete: (id: number) => void;
  onEdit: (address: Address) => void;
}

const AddressTable: React.FC<AddressTableProps> = ({ addresses, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAddresses = addresses.filter((address) =>
    address.streetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.streetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.postalCode.toString().includes(searchTerm.toLowerCase()) ||
    address.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Direcciones</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="input-group-text">
          <FaSearch />
        </span>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tipo de Calle</th>
            <th scope="col">Número de Calle</th>
            <th scope="col">Código Postal</th>
            <th scope="col">Detalles</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAddresses.map((address) => (
            <tr key={address.id}>
              <td>{address.streetType}</td>
              <td>{address.streetNumber}</td>
              <td>{address.postalCode}</td>
              <td>{address.details}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => onDelete(address.id!)}>
                  <FaTrash /> Eliminar
                </button>
                <button className="btn btn-primary" onClick={() => onEdit(address)}>
                  <FaEdit /> Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;
