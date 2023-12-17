export const getImageType = (imageData: string) => {
 const base64Header = imageData?.substring(0, 30);
 // Check the header to identify image type
 if (base64Header?.includes('image/png')) {
   return 'png';
 } else if (base64Header.includes('image/jpeg')) {
   return 'jpeg';
 } else if (base64Header.includes('image/svg')) {
   return 'svg+xml';
 }
 // Default to JPEG or handle other types as needed
 return 'jpeg';
};