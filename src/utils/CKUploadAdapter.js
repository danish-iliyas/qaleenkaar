export default class CKUploadAdapter {
  constructor(loader, uploadUrl) {
    this.loader = loader;
    this.uploadUrl = uploadUrl;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("image", file);

          fetch(this.uploadUrl, {
            method: "POST",
            body: data,
          })
            .then(res => res.json())
            .then(result => {
              if (result?.url) {
                resolve({ default: result.url });
              } else {
                reject("Upload failed");
              }
            })
            .catch(err => reject(err));
        })
    );
  }

  abort() {}
}
