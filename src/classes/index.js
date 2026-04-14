// NOTE: All properties were unprivated for easier access and to avoid bloat and unexpected errors. In a real-world application, these would likely be private with getters/setters as needed.
export class Sample {
  id;
  type;
  priority;
  analysisTime;
  arrivalTime;
  patientId;

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
  id;
  name;
  speciality;
  startTime;
  endTime;

  constructor(input) {
    this.id = input.id;
    this.name = input?.name;
    this.speciality = input.speciality;
    this.startTime = input.startTime;
    this.endTime = input.endTime;
  }
}

export class Equipment {
  id;
  name;
  type;
  available;

  constructor(input) {
    this.id = input.id;
    this.name = input?.name;
    this.type = input.type;
    this.available = input.available;
  }
}

export class Timetable {
  technicianId;
  assignments;

  constructor(technicianId) {
    this.technicianId = technicianId;
    this.assignments = [];
  }

  addAssignment(sampleId, equipmentId, startTime, endTime) {
    this.assignments.push({ sampleId, equipmentId, startTime, endTime });
  }
}
