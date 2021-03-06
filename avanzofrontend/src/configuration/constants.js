/* ----------------- Company ------------------- */
export const bankTypeAccountInfo = [
  {id: 1, name: "Cuenta de ahorros", code: "CA"},
  {id: 2, name: "Cuenta corriente", code: "CC"},
  {id: 3, name: "Tarjeta Prepago Maestro", code: "TP"},
  {id: 3, name: "Depósitos Electrónicos", code: "DE"},
];

/* ------------------ Document Types --------------------- */
export const documentTypes = [
  {id: 1, name: "Cédula", code: "1"},
  {id: 2, name: "Cédula de extranjería", code: "2"},
  {id: 3, name: "Pasaporte", code: "3"},
];

/* ------------------ Gender Types --------------------- */
export const genders = [
  {id: 1, name: "Femenino", code: "1"},
  {id: 2, name: "Masculino", code: "2"},
  {id: 3, name: "Otro", code: "3"},
];


/* ------------------ Request State ---------------- */
export const requestState = {
  APPROVED: 3,
  RR_HH: 2,
  FINALIZED: 5,
  INVALID_DOCUMENTS: 6,
  REJECTED: 8,
};

/* ------------------ Document Types --------------------- */
export const citys = [
  {id: 1, name: "Bogotá D.C.", code: "1"},
  {id: 2, name: "Medellín", code: "2"},
  {id: 3, name: "Cali", code: "3"},
  {id: 4, name: "Barranquilla", code: "4"},
  {id: 5, name: "Cartagena", code: "5"},
  {id: 6, name: "Bucaramanga", code: "6"},
  {id: 7, name: "Santa Marta", code: "7"},
  {id: 8, name: "Manizales", code: "8"},
  {id: 9, name: "Cúcuta", code: "9"},
  {id: 10, name: "Ibagué", code: "10"},
  {id: 11, name: "Pereira", code: "11"},
  {id: 12, name: "Villavicencio", code: "12"},
  {id: 13, name: "Pasto", code: "13"},
  {id: 14, name: "Neiva", code: "14"},
  {id: 15, name: "Tunja", code: "15"},
  {id: 16, name: "Armenia", code: "16"},
  {id: 17, name: "Soacha", code: "17"},
  {id: 18, name: "Popayán", code: "18"},
  {id: 19, name: "Valledupar", code: "19"},
  {id: 20, name: "Buenaventura", code: "20"},
];

export const defineBadgeName = (id) => {
  if(id === 1){
    return "Solicitada";
  }else if(id === 2){
    return "Aprobada Recursos Humanos";
  }else if(id === 3){
    return "Aprobada Administración";
  }else if(id === 4){
    return "En desembolso";
  }else if(id === 5){
    return "Finalizada";
  }else if(id === 6){
    return "Documentos errados";
  }else if(id === 7){
    return "Rechazada";
  }else if(id === 8){
    return "Devolución Bancaria";
  }else if(id === 9){
    return "Procesadas sin cambio";
  }else if(id === 10){
    return "Procesada documentos con cambio";
  }else if(id === 11){
    return "Rechazadas por el banco procesadas";
  }else if(id === 12){
    return "Pendientes desembolsar por banco";
  }
};

export const defineButtonClass = (id) => {
  if(id === 1){
    return "#c1c1c1";
  }else if(id === 2){
    return "yellow";
  }else if(id === 3){
    return "#ffa962";
  }else if(id === 4){
    return "#62ffb5";
  }else if(id === 5){
    return "#00afe4";
  }else if(id === 6){
    return "#ff4747";
  }else if(id === 7){
    return "#ff4747";
  }else if(id === 8){
    return "#ff4747";
  }else{
    return "#b3b3b3";
  }
};



/*Bncos*/
export const banks = [
  {
    "id": 1,
    "nombre": "BANCO DE BOGOTÁ"
  },
  {
    "id": 2,
    "nombre": "BANCO POPULAR"
  },
  {
    "id": 3,
    "nombre": "BANCO CORPBANCA"
  },
  {
    "id": 4,
    "nombre": "BANCOLOMBIA"
  },
  {
    "id": 5,
    "nombre": "CITIBANK"
  },
  {
    "id": 6,
    "nombre": "BANCO GNB SUDAMERIS"
  },
  {
    "id": 7,
    "nombre": "BBVA COLOMBIA"
  },
  {
    "id": 8,
    "nombre": "ITAÚ"
  },
  {
    "id": 9,
    "nombre": "BANCO COLPATRIA"
  },
  {
    "id": 10,
    "nombre": "BANCO DE OCCIDENTE"
  },
  {
    "id": 11,
    "nombre": "BANCO CAJA SOCIAL"
  },
  {
    "id": 12,
    "nombre": "BANCO AGRARIO"
  },
  {
    "id": 13,
    "nombre": "BNP PARIBAS"
  },
  {
    "id": 14,
    "nombre": "BANCO DAVIVIENDA"
  },
  {
    "id": 15,
    "nombre": "BANCO AV VILLAS"
  },
  {
    "id": 16,
    "nombre": "BANCO PROCREDIT"
  },
  {
    "id": 17,
    "nombre": "BANCO PICHINCHA"
  },
  {
    "id": 18,
    "nombre": "BANCOOMEVA"
  },
  {
    "id": 19,
    "nombre": "BANCO FALABELLA"
  },
  {
    "id": 20,
    "nombre": "BANCO FINANDINA"
  },
  {
    "id": 21,
    "nombre": "BANCO MULTIBANK"
  },
  {
    "id": 22,
    "nombre": "BANCO SANTANDER DE NEGOCIOS COLOMBIA"
  },
  {
    "id": 23,
    "nombre": "COOPCENTRAL"
  },
  {
    "id": 24,
    "nombre": "BANCO COMPARTIR"
  },
  {
    "id": 25,
    "nombre": "CORFICOLOMBIANA"
  },
  {
    "id": 26,
    "nombre": "FINANCIERA JURIDISCOOP"
  },
  {
    "id": 27,
    "nombre": "COOPERATIVA FINANCIERA DE ANTIOQUIA"
  },
  {
    "id": 28,
    "nombre": "COTRAFA COOPERATIVA FINANCIERA"
  },
  {
    "id": 29,
    "nombre": "CONFIAR"
  },
  {
    "id": 30,
    "nombre": "COLTEFINANCIERA"
  },
  {
    "id": 31,
    "nombre": "DAVIPLATA"
  },
  {
    "id": 32,
    "nombre": "NEQUI"
  },
  {
    "id": 33,
    "nombre": "EFECTY"
  },
  {
    "id": 34,
    "nombre": "AVANZOAPP"
  }
 ];