import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdf = (tableId, pdfName) => {
  const pdf = new jsPDF({ orientation: 'landscape' });
  const table = document.getElementById(tableId);
  if (!table) return;

  const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
  const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => Array.from(tr.querySelectorAll('td')).map(td => td.textContent));

  // Remove the last column
  headers.pop();
  const filteredRows = rows.map(row => row.slice(0, -1));

  autoTable(pdf, {
    head: [headers],
    body: filteredRows,
  });

  pdf.save(pdfName);
};
