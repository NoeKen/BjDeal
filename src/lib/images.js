/**
 * Sort through the mass amounts of data in
 * an endpoint and return the featured image URL
 */
// eslint-disable-next-line
export const getFeaturedImageUrl = (item) => (
  (item._embedded
      && item._embedded['wp:featuredmedia']
      && item._embedded['wp:featuredmedia']['0']
      && item._embedded['wp:featuredmedia']['0'].media_details
      && item._embedded['wp:featuredmedia']['0'].media_details.sizes
      && item._embedded['wp:featuredmedia']['0'].media_details.sizes.full
      && item._embedded['wp:featuredmedia']['0'].media_details.sizes.full.source_url)
    || null
);
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}
