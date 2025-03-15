import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MainPage() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [dragItems, setDragItems] = useState([
    { id: 1, type: "right", name: "item 1" },
    { id: 2, type: "right", name: "item 2" },
    { id: 3, type: "right", name: "item 3" },
    { id: 4, type: "right", name: "item 4" },
    { id: 5, type: "wrong", name: "item 5" },
    { id: 6, type: "right", name: "item 6" },
    { id: 7, type: "right", name: "item 7" },
    { id: 8, type: "right", name: "item 8" },
    { id: 9, type: "right", name: "item 9" },
  ]);

  const handleDrop = (item) => {
    if (item.type === "right") {
      setDroppedItems((prevItems) => [...prevItems, item]);
      setDragItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } else {
      alert("Wrong item! Cannot drop this item.");
    }
  };

  return (
    <div className="w-100">
      <DndProvider backend={HTML5Backend} className="w-100">
        <div
          className="d-flex justify-content-center align-items-start w-100"
          style={{
            height: "100vh",
          }}
        >
          <div className=" mt-4 w-100">
            <h1 className="text-center my-4">Drag and Drop Example</h1>
            <div>
              <div className="px-4">
                <h2 className="text-center">Drop Zone</h2>
                <DropZone
                  onDrop={handleDrop}
                  droppedItems={droppedItems}
                  setDroppedItems={setDroppedItems}
                />
              </div>
              <div className="px-4">
                <h2 className="text-center">Drag Items</h2>
                <div className="p-4">
                  <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
                    {dragItems.map((item) => (
                      <DragItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default MainPage;

const DragItem = ({ id, name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id, name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div
        ref={drag}
        className="card bg-light"
        style={{
          width: "18rem",
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
      >
        <div className="card-header">
          <h3 className="text-center">{name}</h3>
        </div>
        <div className="card-body">
          <span className="text-center">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </span>
        </div>
        <div className="card-footer">
          <button className="btn bg-primary w-100">Remove</button>
        </div>
      </div>
    </>
  );
};

const DropZone = ({ onDrop, droppedItems, setDroppedItems }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  const handleRemoveItem = (index) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index, 1);
    setDroppedItems(updatedItems);
  };

  return (
    <div
      ref={drop}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "5px",
        backgroundColor: isActive ? "lightyellow" : "white",
        minHeight: "200px",
      }}
    >
      <div className="p-4 text-center">
        {isActive ? "Release to drop" : "Drag a card here"}
      </div>
      <div className="d-flex flex-wrap gap-3  justify-content-center align-items-center">
        {droppedItems.map((item, index) => (
          <div key={index} className="card bg-light" style={{ width: "18rem" }}>
            <div className="card-header">
              <h3 className="text-center">{item.name}</h3>
            </div>
            <div className="card-body">
              <span className="text-center">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </span>
            </div>
            <div className="card-footer">
              <button
                className="btn bg-danger w-100"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
