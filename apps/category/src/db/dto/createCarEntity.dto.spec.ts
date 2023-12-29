import { CreateCarEntityDto } from './createCarEntity.dto';

describe('createCarEntityDto', () => {
  it('create should instance of createCarEntityDto', () => {
    const data = {
      model: 'camry',
      img: 'imgCar',
      year: 123,
      class: 'good',
      make: 'japan',
      cylinders: 2,
      fullType: 'type',
    };

    const dto = new CreateCarEntityDto(data);

    expect(dto).toBeDefined();
    expect(data.cylinders).toEqual(dto.cylinders);
    expect(data.class).toEqual(dto.class);
    expect(data.make).toEqual(dto.make);
    expect(data.img).toEqual(dto.img);
    expect(data.year).toEqual(dto.year);
  });
});
