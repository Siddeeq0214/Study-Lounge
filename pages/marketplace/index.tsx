import { useEffect } from 'react';
import type { ReactElement } from 'react';
import BaseLayout from '@/layouts/BaseLayout';
import {useRouter} from "next/router";

function Marketplace() {
  const router = useRouter();

  useEffect(() => {
    router.push("/status/coming-soon")
  }, [])

  return (
    <>
    </>
  );
}

export default Marketplace;

Marketplace.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
