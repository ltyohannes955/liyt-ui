'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Use useState with lazy initializer to create store only once
    const [store] = useState<AppStore>(() => makeStore());

    return <Provider store={store}>{children}</Provider>;
}
