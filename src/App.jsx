import React, { useState } from 'react';

const App = () => {
  // กำหนดค่าเริ่มต้น
  const [balance, setBalance] = useState(10000); // ยอดเงินคงเหลือ
  const [manualAmount, setManualAmount] = useState(''); // จำนวนเงินที่กรอกเอง
  const [transactionHistory, setTransactionHistory] = useState([]); // ประวัติการถอน
  const [errorMessage, setErrorMessage] = useState(''); // ข้อความแจ้งเตือน

  // ฟังก์ชันการถอนเงิน
  const withdraw = (amount) => {
    if (balance - amount < 1) {
      alert('ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้');
      return;
    }
    setBalance(balance - amount);
    addTransaction(amount);
  };

  // ฟังก์ชันสำหรับกรอกจำนวนเงินเอง
  const withdrawManual = () => {
    const amount = parseInt(manualAmount);
    if (!amount || amount < 1) {
      setErrorMessage('กรุณากรอกจำนวนเงินที่ถูกต้อง');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if (balance - amount < 1) {
      setErrorMessage('ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setBalance(balance - amount);
    addTransaction(amount);
    setManualAmount(''); // ล้างช่องกรอกหลังจากถอนเสร็จ
  };

  // ฟังก์ชันการเพิ่มรายการประวัติการถอน
  const addTransaction = (amount) => {
    const newTransaction = `ถอนเงิน: ${amount} บาท, ยอดคงเหลือหลังการถอน: ${balance - amount} บาท`;
    setTransactionHistory([newTransaction, ...transactionHistory]);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">ระบบการถอนเงิน</h1>

      {/* การจัดวางระบบถอนเงินและประวัติการถอน */}
      <div className="flex space-x-10">
        {/* ระบบถอนเงิน */}
        <div className="w-2/3 bg-white p-6 rounded-xl shadow-2xl">
          {/* ยอดเงินคงเหลือ */}
          <div className="mb-6">
            <p className="text-2xl font-semibold text-gray-800">
              ยอดเงินคงเหลือ: <span className="text-green-500">{balance} บาท</span>
            </p>
          </div>

          {/* ปุ่มถอนเงินล่วงหน้า */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">เลือกจำนวนเงินที่ต้องการถอน</h2>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => withdraw(100)}
                className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                100 บาท
              </button>
              <button
                onClick={() => withdraw(500)}
                className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                500 บาท
              </button>
              <button
                onClick={() => withdraw(1000)}
                className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                1000 บาท
              </button>
              <button
                onClick={() => withdraw(5000)}
                className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                5000 บาท
              </button>
            </div>
          </div>

          {/* การกรอกจำนวนเงินเอง */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">กรอกจำนวนเงินที่ต้องการถอน</h2>
            <input
              type="number"
              className="mt-4 w-full p-4 border-2 border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="กรอกจำนวนเงิน"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value)}
            />
            <button
              onClick={withdrawManual}
              className="mt-4 w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              ถอนเงิน
            </button>
          </div>
        </div>

        {/* ประวัติการถอนเงิน */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">ประวัติการถอนเงิน</h2>
          <div className="overflow-y-auto max-h-96 bg-gray-50 p-4 rounded-lg shadow-inner">
            <ul className="text-sm text-gray-700">
              {transactionHistory.map((transaction, index) => (
                <li key={index} className="mb-2">{transaction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ข้อความแจ้งเตือน */}
      {errorMessage && (
        <div className="text-red-600 mt-6 text-center p-4 bg-red-100 rounded-md shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default App;
