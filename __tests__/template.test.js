import { XXX } from './../src/backend.js';

describe('City', () => {
  jest.useFakeTimers();
  let xxx;


  beforeEach(function() {
    xxx = new World();
  });

  afterEach(function() {
    jest.clearAllTimers();
  });

  test('should have a name and a contamination level of 0 when it is created', () => {
    portland = new City(0);
    portland.setContamination();
    expect(portland.id).toEqual(0);
    expect(portland.contamination).toEqual(0);
  });

  test('should have a contamination level of 3 after 30001 milliseconds', () => {
    portland = new City(0);
    portland.setContamination();
    jest.advanceTimersByTime(30001);
    expect(portland.contamination).toEqual(3);
  });



});
