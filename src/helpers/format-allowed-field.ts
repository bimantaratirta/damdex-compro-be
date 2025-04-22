import { ClassConstructor, ClassTransformOptions, plainToInstance } from "class-transformer";

export const formatAllowedField = (
    classUsedToFormat: ClassConstructor<any>,
    plainData: any,
    opts?: ClassTransformOptions,
  ) => {
    const options: ClassTransformOptions = {
      ...opts,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    };
    const result = plainToInstance(classUsedToFormat, plainData, options);
    return result;
  };