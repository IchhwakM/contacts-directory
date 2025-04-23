import * as yup from 'yup';

export const schema = yup.object().shape({
  Id: yup.number().label('ID'),
  Title: yup.string().label('Title').nullable(),
  FirstName: yup.string().required().label('First Name').nullable(),
  MiddleName: yup.string().label('Middle Name').nullable(),
  LastName: yup.string().required().label('Last Name').nullable(),
  Company: yup.string().label('Company').nullable(),
  JobTitle: yup.string().label('Company').nullable(),
  Email: yup.string().required().email().label('Email').nullable(),
  Phone: yup
    .string()
    .required()
    .matches(/^(\+?[\d]+)?$/, 'Phone should have digits only')
    .label('Phone').nullable(),
  Address: yup.string().label('Location').nullable(),
  Avatar: yup.string().label('Location').nullable(),
  Notes: yup.string().label('Location').nullable(),
  IsFav: yup.boolean().label('Favourite')
});