export const PrintTemplate = (e,y) => {

    console.log(e)
    console.log(y)
    return `
    <!DOCTYPE html>
  <html lang="en">
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
  
    <div style="display: flex; justify-content: space-between; margin: 15px auto">
    <p style="max-width: 600px">
  Die folgenden Leistungen sind in allen Positionen des Leistungsverzeichnisses zu berücksichtigen und in die Einheitspreise mit einzukalkulieren. Eine gesonderte Vergütung erfolgt nicht.
  •Bei den zu bearbeitenden Flächen bis 4,0 Meter Höhe sind sämtliche Hilfsmittel in den Einheitspreis einzukalkulieren.
  •Darüber hinaus sind geeignete Hilfsmittel wie Rollgerüst und / Bühnen etc. zu verwenden.
  • Baustelleneinrichtung, Materialtransport und Baustellen Beräumung
  • Der Transport erfolgt nur mit Geräten des AN; die Nutzung der Einkaufswägen ist untersagt
    </p>
  
    <img width="100" height="100" src="https://www.logodesignlove.com/wp-content/uploads/2022/01/logo-wave-symbol-01.jpg" />
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
      <thead>
      <tr>
        <th style="background-color: grey">0.0.</th>
        <th style="background-color: grey">Rollgerüst/Elektrische Hebemittel</th>
        <th style="background-color: grey"></th>
        <th style="background-color: grey"></th>
        <th style="background-color: grey; min-width: 100px"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-column="First Name">0.0.1</td>
        <td data-column="Last Name">Rollgerüst Stellung / Rückbau</td>
        <td data-column="Job Title">1</td>
        <td data-column="Twitter">pausch</td>
        <td data-column="Twitter">6,00 €</td>
      </tr>
        <tr>
        <td data-column="First Name">0.0.3</td>
        <td data-column="Last Name">Teleskoparbeitsbühne/Scherenarbeitsbühne Stellung / Rückbau  ab 7,00m (max. 20 m.)</td>
        <td data-column="Job Title">2</td>
        <td data-column="Twitter">Woche</td>
        <td data-column="Twitter">10,90 €</td>
      </tr>
        <tr>
        <td data-column="First Name">0.0.6</td>
        <td data-column="Last Name">Vorhaltung ab 2. Woche</td>
        <td data-column="Job Title">5</td>
        <td data-column="Twitter">Tag</td>
        <td data-column="Twitter">20,00 €</td>
      </tr>
        <tr>
        <td data-column="First Name">0.0.8</td>
        <td data-column="Last Name">Teleskoparbeitsbühne/Scherenarbeitsbühne Stellung / Rückbau bis 7,00m</td>
        <td data-column="Job Title">1</td>
        <td data-column="Twitter">m²</td>
        <td data-column="Twitter">170,80 €</td>
      </tr>
  
    </tbody>
      <thead>
      <tr>
        <th style="background-color: grey">34.1.</th>
        <th style="background-color: grey">Malerarbeiten Außen</th>
        <th style="background-color: grey"></th>
        <th style="background-color: grey"></th>
        <th style="background-color: grey"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-column="First Name">34.1.2</td>
        <td data-column="Last Name">Grundierung Tiefengrund</td>
        <td data-column="Job Title">8</td>
        <td data-column="Twitter">pausch</td>
        <td data-column="Twitter">150,00 €</td>
      </tr>
        <tr>
        <td data-column="First Name">34.1.5</td>
        <td data-column="Last Name">Anstrich Wand- und Deckenflächen,Acrylat-Farbe Hellbezugswert ab 25</td>
        <td data-column="Job Title">3</td>
        <td data-column="Twitter">Woche</td>
        <td data-column="Twitter">6,60 €</td>
      </tr>
        <tr>
        <td data-column="First Name">34.1.4</td>
        <td data-column="Last Name">Anstrich Wand- und Deckenflächen,Acrylat-Farbe Hellbezugswert ab 65</td>
        <td data-column="Job Title">1</td>
        <td data-column="Twitter">Tag</td>
        <td data-column="Twitter">11,40 €</td>
      </tr>
  
    </tbody>
    <thead>
      <tr>
        <th style="background-color: grey"></th>
        <th style="background-color: grey"></th>
        <th style="background-color: grey"></th>
        <th style="background-color: grey">Total:</th>
        <th style="background-color: grey; min-width: 100px">1.345,55 €</th>
      </tr>
    </thead>
  </table>
      
      </div>
    </body>
  </html>
  
    `;
  };
  