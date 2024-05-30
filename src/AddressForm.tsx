import React, { useEffect, useState } from 'react';
import { Address } from './App';

interface AddressFormProps {
  onAdd: (address: Address) => void;
  onUpdate: (address: Address) => void;
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAdd, onUpdate, selectedAddress, setSelectedAddress }) => {
  const [address, setAddress] = useState<Address>({
    streetType: '',
    streetNumber: '',
    postalCode: 0,
    details: ''
  });

  const streetTypes = [
    'Calle',
    'Carrera',
    'Avenida',
    'Transversal',
    'Diagonal',
    'Circular',
    'Manzana',
    'Vereda',
    'Autopista',
    'Circunvalar',
    'Vía',
    'Paseo',
    'Vía principal',
    'Callejón',
    'Callejuela',
    'Pasaje'
  ];

  useEffect(() => {
    if (selectedAddress) {
      setAddress(selectedAddress);
    } else {
      setAddress({ streetType: '', streetNumber: '', postalCode: 0, details: '' });
    }
  }, [selectedAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddress) {
      onUpdate(address);
    } else {
      onAdd(address);
    }
    setAddress({ streetType: '', streetNumber: '', postalCode: 0, details: '' });
    setSelectedAddress(null);
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>{selectedAddress ? 'Actualizar Dirección' : 'Agregar Dirección'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Tipo de Calle</label>
              <select
                className="form-select"
                name="streetType"
                value={address.streetType}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tipo de calle</option>
                {streetTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Número de Calle</label>
              <input
                type="text"
                className="form-control"
                name="streetNumber"
                value={address.streetNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Código Postal</label>
              <input
                type="number"
                className="form-control"
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Detalles</label>
              <input
                type="text"
                className="form-control"
                name="details"
                value={address.details}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
              {selectedAddress ? 'Actualizar' : 'Agregar'}
            </button>
            {selectedAddress && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedAddress(null)}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
