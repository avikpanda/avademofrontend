const data = [
  {
    customerId: 123,
    customerName: "Aqua Packaging",
    customerNumber: "8923",
    openInvoices: "22355, 3434, 4545, 5656, 6767, 8989, ",
    lastCallSummary:
      "Email sent to customer with their new invoice copies",
    status: "Open",
    contacts: [
      {
        id: 1,
        fullName: "Avik Panda",
        phoneBusiness: "+917319335588",
      },
      {
        id: 2,
        fullName: "Shreeja Verma",
        phoneBusiness: "+918899005533",
      },
    ],
  },
  {
    customerId: 234,
    customerName: "Bottle Makers",
    customerNumber: "2356734",
    openInvoices: "1234, 2345, 3456, 4567, 5678",
    lastCallSummary:
      "Call made to customer to remind about the payment commitment made on 2024-01-21 due on 2024-01-29 for invoice 2345.",
    status: "On Hold",
    contacts: [
      {
        id: 3,
        fullName: "Ayush Kumar",
        phoneBusiness: "+918955667788",
      },
      {
        id: 4,
        fullName: "Abhijeet Dey",
        phoneBusiness: "+919833778899",
      },
    ],
  },
  {
    customerId: 345,
    customerName: "Glass Construction",
    customerNumber: "2356734",
    openInvoices: "64785, 34567, 88995",
    lastCallSummary:
      "Discussed about open invoices. Abhijeet Dey made a Payment Commitment of USD 3,600",
    status: "Escalated",
    contacts: [
      {
        id: 5,
        fullName: "Barkha Sinha",
        phoneBusiness: "+917788996622",
      },
    ],
  },
];

export default data;
