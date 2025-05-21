'use client';

import { useState } from 'react';
import Draggable from 'react-draggable';

const colors = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
  '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000'
];

const Input = ({ label, ...props }) => (
  <div className="flex flex-col text-sm">
    <label className="mb-1">{label}</label>
    <input {...props} className="border rounded p-2 w-full" />
  </div>
);

const Button = (props) => (
  <button {...props} className="px-4 py-2 bg-blue-600 text-white rounded" />
);

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [workers, setWorkers] = useState([]);
  const [positions, setPositions] = useState({});

  const handleAddWorker = () => {
    if (workerName.trim()) {
      setWorkers([...workers, workerName]);
      setWorkerName('');
    }
  };

  const updatePosition = (index, data) => {
    setPositions({ ...positions, [index]: { x: data.x, y: data.y } });
  };

  return (
    <div className="space-y-4 w-[1123px] h-[794px] border-2 border-black p-4 overflow-auto">
      <div className="flex space-x-2 mb-2">
        <Input label="Box 1 - OPERATION" value={operation} onChange={(e) => setOperation(e.target.value)} />
        <Input label="Box 2 - RIG" value={rig} onChange={(e) => setRig(e.target.value)} />
        <Input label="Box 3 - PIC" value={pic} onChange={(e) => setPic(e.target.value)} />
      </div>
      <Input label="Box 4 - LINE OF FIRE HAZARD" value={lofHazard} onChange={(e) => setLofHazard(e.target.value)} />

      <div className="flex space-x-2 items-end">
        <Input label="Box 5 - Add Personnel" value={workerName} onChange={(e) => setWorkerName(e.target.value)} />
        <Button onClick={handleAddWorker}>Add</Button>
      </div>

      <div className="flex space-x-4 h-[300px]">
        <div className="w-[300px] h-full border-2 border-black relative">
          <p className="text-sm font-bold p-1">Box 5 - Personnel Circles</p>
          {workers.map((w, i) => (
            <Draggable key={i} position={positions[i] || { x: 10 * i, y: 10 * i }} onStop={(e, data) => updatePosition(i, data)}>
              <div
                title={w}
                className="absolute w-8 h-8 rounded-full text-white text-xs flex items-center justify-center cursor-move z-10"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                {i + 1}
              </div>
            </Draggable>
          ))}
        </div>
        <div className="w-[700px] h-full border-2 border-black p-2 overflow-y-auto text-sm">
          <p className="font-bold mb-2">Box 6 - Personnel List</p>
          <ul className="space-y-1">
            {workers.map((w, i) => (
              <li key={i}>{i + 1}. {w}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-[500px] border-2 border-black mt-4 p-2 text-sm">
        <p className="font-bold">Box 7 - (Reserved for future use)</p>
      </div>
    </div>
  );
}
