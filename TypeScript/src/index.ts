import { exec } from "child_process";

const main = () => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      "No correct arguments provided, please provide a pattern name and type.",
    );
    process.exit(1);
  }

  const patternName = args[0];
  const patternType = args[1];

  const path = `src/${capitalize(patternName)}/${patternType}.ts`;

  exec(`tsx ${path}`, (error, stdout, stderr) => {
    if (error) console.error(`exec error: ${error}`);
    if (stdout) console.log(stdout);
    if (stderr) console.error(`stderr: ${stderr}`);
  });
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

main();
