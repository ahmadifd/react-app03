import "bootstrap/dist/css/bootstrap.min.css";
import "./home0/index.css";
import { useEffect, useState } from "react";

// const Child1 = () => {
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     const b_element1 = event.target as HTMLButtonElement;
//     console.log(b_element1.innerText);
//   };

//   return (
//     <>
//       <button onClick={handleClick}>Hello1</button>
//     </>
//   );
// };

// const Child2 = () => {
//   const [count, setCount] = useState<number>(1);

//   useEffect(() => {
//     console.log("mount", count);
//   }, []);

//   useEffect(() => {
//     console.log("change", count);
//   }, [count]);

//   useEffect(() => {
//     return () => {
//       console.log("unmount", count);
//     };
//   }, []);

//   // console.log("*", count, "*");

//   const onClick1 = () => {
//     setCount(count + 1);
//     setCount(count + 1);
//     console.log("onClick1", count);
//   };

//   const onClick2 = () => {
//     console.log("onClick2", count);
//   };

//   const onClick3 = () => {
//     console.log(count);
//   };

//   return (
//     <>
//       <button onClick={onClick1}>onclick1</button>
//       <button onClick={onClick2}>onclick2</button>
//     </>
//   );
// };

// const Child3 = () => {
//   const [items, setItems] = useState([
//     {
//       id: 1,
//       checked: true,
//       item: "One half pound bag of Cocoa Covered Almonds Unsalted",
//     },
//     {
//       id: 2,
//       checked: false,
//       item: "Item 2",
//     },
//     {
//       id: 3,
//       checked: false,
//       item: "Item 3",
//     },
//   ]);

//   const handleCheck = (id: number) => {
//     const listItems = items.map((item) =>
//       item.id === id ? { ...item, checked: !item.checked } : item
//     );
//     setItems(listItems);
//     localStorage.setItem("shoppinglist", JSON.stringify(listItems));
//   };

//   const handleDelete = (id: number) => {
//     const listItems = items.filter((item) => item.id !== id);
//     setItems(listItems);
//     localStorage.setItem("shoppinglist", JSON.stringify(listItems));
//   };

//   return (
//     <main>
//       {items.length ? (
//         <ul>
//           {items.map((item) => (
//             <li className="item" key={item.id}>
//               <input
//                 type="checkbox"
//                 onChange={() => handleCheck(item.id)}
//                 checked={item.checked}
//               />
//               <label
//                 style={item.checked ? { textDecoration: "line-through" } : null}
//                 onDoubleClick={() => handleCheck(item.id)}
//               >
//                 {item.item}
//               </label>
//               <button onClick={() => handleDelete(item.id)}>delete</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
//       )}
//     </main>
//   );
// };

const Child4 = () => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    console.log(count);
  }, [count]);

  const onClick1 = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={onClick1}>onclick-one</button>
    </>
  );
};

const Home0 = () => {
  return (
    <>
      <Child4 />
    </>
  );
};

export default Home0;
