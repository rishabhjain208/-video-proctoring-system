import * as blazeface from '@tensorflow-models/blazeface';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import React from 'react';
export default function useProctoring() {
  const modelsRef = React.useRef({ face: null, obj: null });
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const face = await blazeface.load();
      const obj = await cocoSsd.load();
      modelsRef.current = { face, obj };
      setReady(true);
    })();
  }, []);

  const detect = async (video) => {
    // returns { faces, items }
    const faces = await modelsRef.current.face.estimateFaces(video, false);
    const items = await modelsRef.current.obj.detect(video);
    return { faces, items };
  };

  return { ready, detect };
}
