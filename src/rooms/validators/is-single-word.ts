import { registerDecorator, ValidationOptions } from 'class-validator';
import { CreateRoomDTO } from '../create-room.dto';

export function IsSingleWord(validationOptions?: ValidationOptions) {
  return function (object: CreateRoomDTO, propertyName: string) {
    registerDecorator({
      name: 'isSingleWord',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' && value.trim().split(' ').length === 1
          );
        },
      },
    });
  };
}
