import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
//import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [drag_item, setDragItem] = useState<number>(-1);
  const [cur_position, setCurPosition] = useState<number>(-1);
  const [cur_field, setCurField] = useState<number>(-1);
  const [start_field, setStartField] = useState<number>(-1);
  const [data1, setData1] = useState([
    { text: '🐅', idx: 1 },
    { text: '🐈', idx: 2 },
    { text: '🐉', idx: 3 },
    { text: '🐋', idx: 4 },
    { text: '🐌', idx: 5 },
  ]);
  const [data2, setData2] = useState([
    { text: '🐂', idx: 6 },
    { text: '🐒', idx: 7 },
    { text: '🐓', idx: 8 },
    { text: '🐕', idx: 9 },
    { text: '🐗', idx: 10 },
  ]);

  const onDragStart = (
    e: React.DragEvent<HTMLElement>,
    idx: number,
    field: number
  ): void => {
    e.dataTransfer.effectAllowed = 'move';
    setDragItem(idx);
    setStartField(field);
  };
  const onDragEnter = (
    e: React.DragEvent<HTMLElement>,
    idx: number,
    field: number
  ): void => {
    setCurPosition(idx);
    setCurField(field);
  };
  const onDragEnd = (e: React.DragEvent<HTMLElement>): void => {
    if (cur_field === start_field) {
      const temp = cur_field === 1 ? [...data1] : [...data2];
      const idx1 = temp.findIndex((item) => item.idx === drag_item);
      const idx2 = temp.findIndex((item) => item.idx === cur_position);

      const temp2 = temp[idx1];
      temp[idx1] = temp[idx2];
      temp[idx2] = temp2;
      if (cur_field === 1) {
        setData1(temp);
      } else {
        setData2(temp);
      }
    } else {
      const temp1 = start_field === 1 ? [...data1] : [...data2];
      const temp2 = start_field === 1 ? [...data2] : [...data1];
      const idx1 = temp1.findIndex((item) => item.idx === drag_item);
      const idx2 = temp2.findIndex((item) => item.idx === cur_position);

      const tempItem1 = temp1[idx1];
      const tempItem2 = temp2[idx2];
      temp1[idx1] = tempItem2;
      temp2[idx2] = tempItem1;

      if (start_field === 1) {
        setData1(temp1);
        setData2(temp2);
      } else {
        setData1(temp2);
        setData2(temp1);
      }
    }
  };

  return (
    <div className="container">
      <div className="list-wrapper">
        <ul>
          {data1.map((item, idx) => (
            <li
              onDragStart={(e) => {
                onDragStart(e, item.idx, 1);
              }}
              onDragEnter={(e) => {
                onDragEnter(e, item.idx, 1);
              }}
              onDragEnd={(e) => {
                onDragEnd(e);
              }}
              key={`elem1-${idx}`}
              className="elem elem-1"
              draggable={'true'}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="list-wrapper">
        <ul>
          {data2.map((item, idx) => (
            <li
              onDragStart={(e) => {
                onDragStart(e, item.idx, 2);
              }}
              onDragEnter={(e) => {
                onDragEnter(e, item.idx, 2);
              }}
              onDragEnd={(e) => {
                onDragEnd(e);
              }}
              key={`elem2-${idx}`}
              className="elem elem-2"
              draggable={'true'}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
