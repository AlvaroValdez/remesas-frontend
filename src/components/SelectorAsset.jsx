// src/components/SelectorAsset.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente SelectorAsset
 * 
 * Props:
 * - asset: String con el símbolo del activo seleccionado.
 * - onAssetChange: Función que se llama cuando el usuario selecciona un activo diferente.
 * - assets: Array de objetos con los activos disponibles. Cada objeto debe tener:
 *    { symbol: 'USD', name: 'Dólar estadounidense', iconUrl: 'url_del_icono' }
 * - label: Etiqueta que acompaña al selector (por ejemplo: 'Moneda' o 'Activo')
 * 
 * Uso:
 * <SelectorAsset
 *    asset={selectedAsset}
 *    onAssetChange={setSelectedAsset}
 *    assets={assetsList}
 *    label="Moneda"
 * />
 */

export default function SelectorAsset({ asset, onAssetChange, assets, label }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <div className="input-group">
        <select
          className="form-select"
          value={asset}
          onChange={e => onAssetChange(e.target.value)}
        >
          {assets.map(({ symbol, name, iconUrl }) => (
            <option key={symbol} value={symbol}>
              {name} ({symbol})
            </option>
          ))}
        </select>
        {/*
          Si deseas mostrar un icono junto al selector, puedes usar este bloque:
          <span className="input-group-text">
            <img src={assets.find(a => a.symbol === asset)?.iconUrl} 
                 alt={asset} 
                 style={{ width: '20px', height: '20px' }} />
          </span>
          Añádelo justo después del select si deseas mostrar icono.
        */}
      </div>
    </div>
  );
}

SelectorAsset.propTypes = {
  asset: PropTypes.string.isRequired,
  onAssetChange: PropTypes.func.isRequired,
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      iconUrl: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string,
};

SelectorAsset.defaultProps = {
  label: 'Activo',
};