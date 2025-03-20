export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (!event.target.files || event.target.files.length === 0) return;

  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const imageUrl = URL.createObjectURL(file);
    return { label: file.name, value: imageUrl };
  } else {
    alert('Please select an image file');
    return null;
  }
};
