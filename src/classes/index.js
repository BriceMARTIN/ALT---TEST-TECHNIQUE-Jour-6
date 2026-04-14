export class Sample {
  #id;
  #type;
  #priority;
  #analysisTime;
  #arrivalTime;
  #patientId;

  constructor(input) {
    this.#id = input.id;
    this.#type = input.type;
    this.#priority = input.priority;
    this.#analysisTime = input.analysisTime;
    this.#arrivalTime = input.arrivalTime;
    this.#patientId = input.patientId;
  }

  getId() {
    return this.#id;
  }

  getType() {
    return this.#type;
  }

  getPriority() {
    return this.#priority;
  }

  getAnalysisTime() {
    return this.#analysisTime;
  }

  getArrivalTime() {
    return this.#arrivalTime;
  }

  getPatientId() {
    return this.#patientId;
  }
}

export class Technician {
  #id;
  #name;
  #speciality;
  #startTime;
  #endTime;

  constructor(input) {
    this.#id = input.id;
    this.#name = input?.name;
    this.#speciality = input.speciality;
    this.#startTime = input.startTime;
    this.#endTime = input.endTime;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getSpeciality() {
    return this.#speciality;
  }

  getStartTime() {
    return this.#startTime;
  }

  getEndTime() {
    return this.#endTime;
  }
}

export class Equipment {
  #id;
  #name;
  #type;
  #available;

  constructor(input) {
    this.#id = input.id;
    this.#name = input?.name;
    this.#type = input.type;
    this.#available = input.available;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getType() {
    return this.#type;
  }

  getAvailable() {
    return this.#available;
  }
}
