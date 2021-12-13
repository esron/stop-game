import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CreateRoomDTO } from '../create-room.dto';

export function ArraySizeEquals(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: CreateRoomDTO, propertyName: string) {
    registerDecorator({
      name: 'arraySizeEquals',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'number' &&
            value.length === relatedValue
          );
        },
      },
    });
  };
}
