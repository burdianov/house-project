import { GetServerSideProps, NextApiRequest } from 'next';
import { loadIdToken } from '../../src/auth/firebaseAdmin';
import Layout from '../../src/components/layout';
import HouseForm from './../../src/components/houseForm';

export default function Add() {
  return (
    <Layout>
      <HouseForm />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return { props: {} };
};
