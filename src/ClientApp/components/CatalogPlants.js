import React from 'react';
import { useState } from 'react';
import { gStyle } from '../styles/style';

function FilterablePlantTable({ plants }) {
  const [filterText, setFilterText] = useState('');
  const [inDescribedOnly, setInDescribedOnly] = useState(false);
  return (
    <div>
      <h1 style={gStyle.h1}>Каталог растений</h1>
      <SearchBar 
        filterText={filterText} 
        inDescribedOnly={inDescribedOnly} 
        onFilterTextChange={setFilterText} 
        onInDescribedOnlyChange={setInDescribedOnly} />
      <PlantTable 
        plants={plants} 
        filterText={filterText}
        inDescribedOnly={inDescribedOnly} />
    </div>
  );
}

function PlantCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function PlantRow({ plant }) {
  const name = plant.described ? plant.name :
    <span style={{ color: 'red' }}>
      {plant.name}
    </span>;
    const kind = plant.described ? plant.kind :
    <span style={{ color: 'red' }}>
      {plant.kind}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{kind}</td>
    </tr>
  );
}

function PlantTable({ plants, filterText, inDescribedOnly }) {
  const rows = [];
  let lastCategory = null;

  plants.forEach((plant) => {
    if (
      plant.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inDescribedOnly && !plant.described) {
      return;
    }
    if (plant.category !== lastCategory) {
      rows.push(
        <PlantCategoryRow
          category={plant.category}
          key={plant.category} />
      );
    }
    rows.push(
      <PlantRow
        plant={plant}
        key={plant.name} />
    );
    lastCategory = plant.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Семейство</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inDescribedOnly,
  onFilterTextChange,
  onInDescribedOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Найти..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inDescribedOnly} 
          onChange={(e) => onInDescribedOnlyChange(e.target.checked)} />
        {' '}
        Показывать только растения, имеющие описание
      </label>
    </form>
  );
}

const PLANTS = [
  {category: "Декоративно-лиственные", kind: "Ароидные", described: true, name: "Алоказия"},
  {category: "Декоративно-лиственные", kind: "Ароидные", described: true, name: "Антуриум"},
  {category: "Декоративно-лиственные", kind: "Ароидные", described: false, name: "Филодендрон"},
  {category: "Цветущие", kind: "Орхидные", described: true, name: "Денбодиум"},
  {category: "Цветущие", kind: "Орхидные", described: false, name: "Онцидиум"},
  {category: "Цветущие", kind: "Орхидные", described: false, name: "Фаленопсис"}
];

export default function CatalogPlants() {
  return <FilterablePlantTable plants={PLANTS} />;
}
