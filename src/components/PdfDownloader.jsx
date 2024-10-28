import React from "react";
import jsPDF from "jspdf";
import axios from "axios";

export default function PdfDownloader({ responseData }) {
  const generatePDF = (bookingDetails) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Booking Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${bookingDetails.name}`, 20, 40);
    doc.text(`Date: ${bookingDetails.date}`, 20, 50);
    doc.text(`Time: ${bookingDetails.time}`, 20, 60);
    doc.text(`Doctor: ${bookingDetails.doctor}`, 20, 70);
    doc.text(`Reference Number: ${bookingDetails.referenceNumber}`, 20, 80);
    doc.save("booking_confirmation.pdf");
  };

  const handleDownloadPDF = (e) => {
    e.eventDefault();
    generatePDF(responseData);
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-primary text-white px-8 py-2 rounded-lg"
    >
      Download PDF
    </button>
  );
}
