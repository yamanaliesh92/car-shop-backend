import { ModelMapperServiceCar } from './modelMapper.service';

describe('dd', () => {
  let modelMapper: ModelMapperServiceCar;

  beforeEach(() => {
    modelMapper = new ModelMapperServiceCar();
  });

  it('should map carEntity to car', () => {
    const data = {
      id: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
      class: 'class',
      make: 'make',
      fullType: 'fullType',
      model: 'model',
      cylinders: 12,
      year: 2009,
      img: 'img',
    };
    const car = modelMapper.toCar(data);

    expect(car).toBeDefined();
    expect(car.class).toEqual(data.class);
    expect(car.make).toEqual(data.make);
    expect(car.year).toEqual(data.year);
    expect(car.cylinders).toEqual(data.cylinders);
  });

  it('should map categoryEntity to Category', () => {
    const data = {
      id: 122,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'bmw',
    };
    const category = modelMapper.toCategory(data);

    expect(category).toBeDefined();
    expect(category.id).toEqual(data.id);
    expect(category.name).toEqual(data.name);
  });
});
