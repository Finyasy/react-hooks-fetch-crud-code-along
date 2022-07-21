import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Add useEffect hook to handle the initial data load
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(res => res.json())
      .then(items => setItems(items));
  }
  , []);
  
  function handleDeleteItem(deletedItem){
    setItems(items.filter(item => item.id !== deletedItem.id));
  }

  function handleUpdatedItem(updatedItem) {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  }

  function handleAddItem(newItem){
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdatedItem} onDeleteItem={handleDeleteItem}          
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
