import { useState } from 'react';

import { ClapsButtonUi } from '~/components/claps-button/claps-button-ui';
import { getNextFibonacci } from '~/lib/utils';

export default function ClapsButton() {
  const [count, setCount] = useState(3);
  const maxCount = 13;

  return (
    <div className="border-border my-5 grid place-items-center rounded-lg border py-20 shadow-sm">
      <ClapsButtonUi
        count={count}
        progress={count / maxCount}
        onClick={() => {
          const nextCount = getNextFibonacci(count);
          if (nextCount > maxCount) {
            setCount(0);
          } else {
            setCount(nextCount);
          }
        }}
      />
    </div>
  );
}
