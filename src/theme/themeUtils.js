/**
 * @param px input px as per 1920 * 940 resolution. Here, base font size is 18px
 */
export const pxToRem = (px) => `${px / 18.018}rem`;

// MUI Spacing
export const spacing = (value) => `${pxToRem(value)}`;

/**
 * @param px input px as per 1920 * 940 resolution
   @param portHeight input for new screen portHeight resolutions
 */
export const pxToVh = (px, portHeight = 940) => `${(px * 100) / portHeight}vh`;

/**
 * @param px input px as per 1920 * 940 resolution if portWidth not provided, Else input as per provided resoln.
   @param portWidth input for new screen portWidth resolutions
 */
export const pxToVw = (px, portWidth = 1920) => `${(px * 100) / portWidth}vw`;
