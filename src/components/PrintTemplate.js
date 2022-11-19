import moment from "moment"

export const PrintTemplate = (outPut, totalPrice, name) => {

  const budgetdata = moment().format("LLL")

  return `
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
    table { 
    width: 100%; 
    border-collapse: collapse; 
    }
  .title: {
    display: flex;
    justify-content: space-between;
  }

/* Zebra striping */
tr:nth-of-type(odd) { 
    background: #eee; 
    }

th { 
    background: #871a1a; 
    color: white; 
    font-weight: bold; 
    }

td, th { 
    padding: 10px; 
    border: 1px solid #ccc; 
    text-align: left; 
    font-size: 18px;
    }
    </style>
  </head>
  <body style="background: #fff; text-align: start; padding: 0 35px">

  <div style="margin: 15px auto">
    <h3>Kunde: ${name}</h3>
    <h3>Datum: ${budgetdata} </h3>
  </div>
  <table style="border-collapse: collapse; margin:20px auto;">
  <thead>
    <tr>
      <th>Oz</th>
      <th>Bezeichnung</th>
      <th>Menge</th>
      <th>Einheit</th>
      <th>Preis in Euro</th>
    </tr>
  </thead>
  ${outPut.map(
    (row) =>
      `<tbody>
    <tr>
      <th style="background-color: grey">${row.OZ}</th>
      <th style="background-color: grey">${row.Beschreibung}</th>
      <th style="background-color: grey"></th>
      <th style="background-color: grey"></th>
      <th style="background-color: grey; min-width: 100px"></th>
    </tr> ${row.sub.map(
      (data) => `   <tr>
    <td data-column="First Name" style="font-size: 13.5px">${data.OZ}</td>
    <td data-column="Last Name" style="font-size: 13.5px">${data.Beschreibung}</td>
    <td data-column="Job Title" style="font-size: 13.5px">${data.quantity}</td>
    <td data-column="Twitter" style="font-size: 13.5px">${data.Einheit}</td>
    <td data-column="Twitter" style="font-size: 13.5px">${data.EP}</td>
  </tr>`
    )}
  </tbody>`
  )}
   
  <thead>
    <tr>
      <th style="background-color: grey"></th>
      <th style="background-color: grey"></th>
      <th style="background-color: grey"></th>
      <th style="background-color: grey; font-size: 13.5px">Total:</th>
      <th style="background-color: grey; min-width: 100px; font-size: 13.5px">${totalPrice}</th>
    </tr>
  </thead>
</table>
  </body>
</html>
  `;
};
