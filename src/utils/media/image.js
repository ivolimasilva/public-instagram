export default (media) =>
    media.__typename === 'GraphImage' &&
    media.__typename !== 'GraphVideo' &&
    media.__typename !== 'GraphSidecar' &&
    !media.is_video;
