export function downloadUrl(url: string) {
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = url;
  link.download = 'Jelajah Nusantara.jpg';
  link.click();
}
