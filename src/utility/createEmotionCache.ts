import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const isBrowser = typeof document !== 'undefined';

const createEmotionCache = () => {
    let insertionPoint;
    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
            'meta[name="emotion-insertion-point"]',
        );
        insertionPoint = emotionInsertionPoint ?? undefined;
    }

    return createCache({ key: 'mui-style', stylisPlugins:[prefixer, rtlPlugin] , insertionPoint});
}

export default createEmotionCache;