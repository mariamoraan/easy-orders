import React, { createContext, useContext, useEffect, useState } from 'react';
import { Company } from '../../domain/company';
import { useAuth } from '@/features/auth/delivery/context/auth.context';
import { CompanyLocator } from '../locator';

interface ICompanyContext {
  company: Company;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;
}

const CompanyContext = createContext<ICompanyContext>({
  company: {
    id: '',
    name: '',
    ownerId: '',
  },
  setCompany: function (): void {
    throw new Error('Function not implemented.');
  },
});

export const CompanyProvider = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company>({
    id: '',
    name: '',
    ownerId: '',
  });

  useEffect(() => {
    const setup = async () => {
      if (!user || !user.companyId) return;
      const userCompany = await CompanyLocator.getFindCompanyByIdQuery().handle(user.companyId);
      setCompany(userCompany);
    };
    setup();
  }, [user?.companyId]);

  return <CompanyContext.Provider value={{ company, setCompany }}>{children}</CompanyContext.Provider>;
};

export const useCompany = () => useContext(CompanyContext);
