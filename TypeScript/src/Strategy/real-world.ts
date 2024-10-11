import fs from "node:fs/promises";
import path from "node:path";

interface UploadResult {
  success: boolean;
  message: string;
}

interface UploadStategy {
  upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult>;
}

class LocalUpload implements UploadStategy {
  public async upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    try {
      await fs.writeFile(path.join(__dirname, filePath, name), content);
      return {
        success: true,
        message: "Uploaded to local storage",
      };
    } catch {
      return {
        success: false,
        message: "Error uploading to local storage",
      };
    }
  }
}

class AWSUpload implements UploadStategy {
  public async upload(
    _filePath: string,
    _name: string,
    _content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, _reject) => {
      const result: UploadResult = {
        success: true,
        message: "Uploaded to AWS storage",
      };

      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }
}

class Context {
  private strategy: UploadStategy;

  constructor(strategy: UploadStategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: UploadStategy) {
    this.strategy = strategy;
  }

  public fileUpload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return this.strategy.upload(filePath, name, content);
  }
}

// Testing...

const localUpload = new LocalUpload();
const awsUpload = new AWSUpload();

const context = new Context(localUpload);

context
  .fileUpload("/", "Output.txt", "Hello World")
  .then((result) => console.log(result));

context.setStrategy(awsUpload);

context
  .fileUpload("/", "Output.txt", "Hello World")
  .then((result) => console.log(result));
