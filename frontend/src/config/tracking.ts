export const trackingConfig = {
  meta: {
    pixelId: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
    currency: 'USD',
    productContentType: 'product',
    serviceContentType: 'service',
    leadEventName: 'Lead',
    viewContentEventName: 'ViewContent',
    pageViewEventName: 'PageView',
    defaultLeadContentPrefix: 'marks-preowned-cars',
    advancedMatchingFields: ['em', 'ph', 'fn', 'ln', 'external_id', 'fbp', 'fbc'],
  },
}
