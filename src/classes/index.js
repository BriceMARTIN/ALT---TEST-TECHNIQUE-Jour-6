export class Sample {
  constructor(input) {
    this.id = input.id;
    this.type = input.type;
    this.priority = input.priority;
    this.analysisTime = input.analysisTime;
    this.arrivalTime = input.arrivalTime;
    this.patientId = input.patientId;
  }
}

export class Technician {
  constructor(input) {
    this.id = input.id;
    this.name = input.name;
    this.speciality = input.speciality;
    this.startTime = input.startTime;
    this.endTime = input.endTime;
  }
}

export class Equipment {
  constructor(input) {
    this.id = input.id;
    this.name = input.name;
    this.type = input.type;
    this.available = input.available;
  }
}
