import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';

import Layout from '../src/components/layout';
import FirebaseAuth from '../src/components/firebaseAuth';
import { loadIdToken } from '../src/auth/firebaseAdmin';

export default function Auth() {
  return (
    <Layout>
      <FirebaseAuth />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  console.log({ uid });

  return { props: {} };
};
