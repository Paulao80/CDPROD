import FormData from "form-data";

export function getConfigUpImage(tanque: FormData) {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: () => {
      return tanque;
    },
  };
}
