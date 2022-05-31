export default function ImageInput({setImage}) {
  async function setImageInForm(event) {
    try {
      const imageBase64 = await convertFileToBase64(event.target.files[0]);
      setImage(imageBase64);
    } catch (error) {
      return console.log(error);
    }
  }

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <input type="file" name="image" onChange={setImageInForm}/>
  );
}