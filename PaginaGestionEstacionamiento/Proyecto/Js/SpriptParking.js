
const parkingLot = {}; 

parkingLot['A1'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['A2'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['A3'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['A4'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B1'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B2'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B3'] = { status: 'Free', documentNumber: '', userName: '' };
parkingLot['B4'] = { status: 'Free', documentNumber: '', userName: '' };


function registerCar(event) {
  event.preventDefault(); 

  const documentNumber = document.getElementById("documentNumber").value;
  const userName = document.getElementById("userName").value;
  const parkingSpot = document.getElementById("parkingSpot").value;


  const documentNumberError = document.getElementById("documentNumberError");
  const userNameError = document.getElementById("userNameError");
  documentNumberError.textContent = "";
  userNameError.textContent = "";

  if (!/^\d+$/.test(documentNumber)) {
    documentNumberError.textContent = "El número de documento debe contener solo números.";
    return;
  }
  if (!/^[a-zA-Z]+$/.test(userName)) {
    userNameError.textContent = "El nombre de usuario debe contener solo letras.";
    return;
  }

  if (parkingLot[parkingSpot].status === 'Free') {
    parkingLot[parkingSpot].status = 'Occupied';
    parkingLot[parkingSpot].documentNumber = documentNumber;
    parkingLot[parkingSpot].userName = userName;
    updateParkingLot(); 
    document.getElementById("registrationForm").reset(); 
  } else {
    alert("El lugar de estacionamiento ya está ocupado.");
  }
}


function updateParkingLot() {
  const parkingLotContainer = document.getElementById("parkingLot");
  parkingLotContainer.innerHTML = ''; 


  const leftColumn = document.createElement('div');
  leftColumn.classList.add('col-md-5', 'mb-3');
  for (let i = 1; i <= 4; i++) {
    const parkingSpot = document.createElement('div');
    parkingSpot.classList.add('parking-spot');
    parkingSpot.dataset.spot = `A${i}`; 
    parkingSpot.textContent = `A${i}`;

    if (parkingLot[`A${i}`].status === 'Occupied') {
      parkingSpot.classList.add('occupied');
      parkingSpot.title = `Lugar: A${i}\nNúmero de Documento: ${parkingLot[`A${i}`].documentNumber}\nNombre: ${parkingLot[`A${i}`].userName}`;
    } else {
      parkingSpot.classList.add('free');
    }

   
    parkingSpot.addEventListener('click', function() {
      const modal = new bootstrap.Modal(document.getElementById('parkingSpotInfoModal')); // Crea una instancia del modal
      const modalInfo = document.getElementById('modalInfo');
      const spot = this.dataset.spot; 

      if (parkingLot[spot].status === 'Occupied') {
        modalInfo.innerHTML = ''; 
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const documento = document.createElement('li');
        documento.textContent = `Número de documento: ${parkingLot[spot].documentNumber}`;
        modalInfo.appendChild(documento);

        const nombre = document.createElement('li');
        nombre.textContent = `Nombre: ${parkingLot[spot].userName}`;
        modalInfo.appendChild(nombre);

        modal.show();
      } else {
        modalInfo.innerHTML = ''; 
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const estado = document.createElement('li');
        estado.textContent = `Estado: Libre`;
        modalInfo.appendChild(estado);

        modal.show(); 
      }
    });

    leftColumn.appendChild(parkingSpot);
  }


  const yellowLine = document.createElement('div');
  yellowLine.classList.add('col-md-2', 'yellow-line'); 
  

  const rightColumn = document.createElement('div');
  rightColumn.classList.add('col-md-5');
  for (let i = 1; i <= 4; i++) {
    const parkingSpot = document.createElement('div');
    parkingSpot.classList.add('parking-spot');
    parkingSpot.dataset.spot = `B${i}`;
    parkingSpot.textContent = `B${i}`; 

    if (parkingLot[`B${i}`].status === 'Occupied') {
      parkingSpot.classList.add('occupied');
      parkingSpot.title = `Lugar: B${i}\nNúmero de Documento: ${parkingLot[`B${i}`].documentNumber}\nNombre: ${parkingLot[`B${i}`].userName}`;
    } else {
      parkingSpot.classList.add('free');
    }

    
    parkingSpot.addEventListener('click', function() {
      const modal = new bootstrap.Modal(document.getElementById('parkingSpotInfoModal')); 
      const modalInfo = document.getElementById('modalInfo');
      const spot = this.dataset.spot; 
      if (parkingLot[spot].status === 'Occupied') {
        modalInfo.innerHTML = ''; 
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const documento = document.createElement('li');
        documento.textContent = `Número de documento: ${parkingLot[spot].documentNumber}`;
        modalInfo.appendChild(documento);

        const nombre = document.createElement('li');
        nombre.textContent = `Nombre: ${parkingLot[spot].userName}`;
        modalInfo.appendChild(nombre);

        modal.show(); 
      } else {
        modalInfo.innerHTML = ''; 
        const fila = document.createElement('li');
        fila.textContent = `Fila: ${spot}`;
        modalInfo.appendChild(fila);

        const estado = document.createElement('li');
        estado.textContent = `Estado: Libre`;
        modalInfo.appendChild(estado);

        modal.show(); 
      }
    });

    rightColumn.appendChild(parkingSpot);
  }

  parkingLotContainer.appendChild(leftColumn);
  parkingLotContainer.appendChild(yellowLine);
  parkingLotContainer.appendChild(rightColumn);
}


function searchUser(event) {
  event.preventDefault(); 
  const searchInput = document.getElementById("searchInput").value;
  let foundSlot = null;

  for (const slot in parkingLot) {
    if (parkingLot[slot].status === 'Occupied') {
      if (parkingLot[slot].documentNumber === searchInput || parkingLot[slot].userName.toLowerCase() === searchInput.toLowerCase()) {
        foundSlot = slot;
        break;
      }
    }
  }

  if (foundSlot) {
    alert(`El usuario se encuentra en el lugar ${foundSlot}`);
  } else {
    alert("No se encontró el usuario");
  }
}


const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener('submit', registerCar);


const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', searchUser);


updateParkingLot();