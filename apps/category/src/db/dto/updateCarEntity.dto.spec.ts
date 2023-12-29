import { UpdateCarEntityDto } from './updateCarEntity.doa';

describe('updateCarEntityDto', () => {
  it('update should instance of updateCarEntityDto with all this data', () => {
    const data = {
      model: 'camry1',
      img: 'imgCars',
      year: 1223,
      class: 'goods',
    };

    const dto = new UpdateCarEntityDto(data);

    expect(dto).toBeDefined();

    expect(data.class).toEqual(dto.class);
    expect(data.img).toEqual(dto.img);
    expect(data.year).toEqual(dto.year);
  });

  it('update should instance of updateCarEntityDto with make', () => {
    const data = {
      make: 'marked',
    };

    const dto = new UpdateCarEntityDto(data);

    expect(dto).toBeDefined();

    expect(data.make).toEqual(dto.make);
  });
});
