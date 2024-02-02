import {useState, useEffect} from 'react'

export default function useSetItem(data) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data));
  }, [items]);
}