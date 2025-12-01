export const uploadImage = async (image: FormData) => {
  const apiKey = process.env.IMAGE_BB_API_KEY;

  const url = `https://api.imgbb.com/1/upload&key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: image,
    });

    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
  }
};
