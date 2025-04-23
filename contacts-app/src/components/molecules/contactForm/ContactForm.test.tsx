import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContactForm } from './ContactForm';
import { Contact } from 'store/contactDetailsStore';
import { schema } from './contactForm.schema';
import { SnackbarProvider } from 'context/snackbar/SnackbarProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const defaultContact: Contact = {
  Id: 9999,
  Avatar: 'Photo',
  Title: 'Mr.',
  FirstName: 'John',
  LastName: 'Doe',
  MiddleName: 'Carla',
  Company: 'D.K',
  JobTitle: 'SDE',
  Email: 'John.Doe@test.com',
  Phone: '9997776665',
  Address: 'Raipur',
  Notes: 'Cool Developer',
  IsFav: false
};


const getBaseProps = () => ({
  contact: defaultContact,
});

const queryClient = new QueryClient();

const Component = () => {
  const methods = useForm<Contact>({
    resolver: yupResolver(schema as any),
    defaultValues: defaultContact
  });

  React.useEffect(() => {
    methods.reset(defaultContact);
  }, []);

  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <ContactForm {...getBaseProps()} />
      </QueryClientProvider>
    </SnackbarProvider>
  );
};


describe('ContactForm', () => {
  it('renders the form with default contact values', async () => {
    render(<Component />);
      expect(screen.getByLabelText(/First Name/i)).toHaveDisplayValue('John');
      expect(screen.getByLabelText(/Last Name/i)).toHaveDisplayValue('Doe');
      expect(screen.getByLabelText(/Email/i)).toHaveDisplayValue('John.Doe@test.com');
  });
});
