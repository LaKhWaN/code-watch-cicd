// index.js

const { execSync } = require("child_process");

// Define test cases (input and expected output)
const testCases = [
  { input: "1 2", expectedOutput: "3.0" },
  { input: "-1 5", expectedOutput: "4.0" },
  { input: "3.5 2.5", expectedOutput: "6.0" },
];

// Function to run tests
function runTests() {
  let passedAllTests = true;

  testCases.forEach((testCase, index) => {
    console.log(`Running Test Case ${index + 1}`);
    console.log(`Input: ${testCase.input}`);
    console.log(`Expected Output: ${testCase.expectedOutput}`);

    // Run Python script with input
    const pythonProcess = execSync(`echo "${testCase.input}" | python sum.py`);
    let pythonOutput = pythonProcess.toString().trim(); // Trim whitespace

    console.log(`Output: ${pythonOutput}`);
    console.log(`Expected Output: ${testCase.expectedOutput}`);

    // Compare output with expected output
    if (
      parseFloat(pythonOutput).toFixed(1) !==
      parseFloat(testCase.expectedOutput).toFixed(1)
    ) {
      console.log(`1Test Case ${index + 1} failed!`);
      passedAllTests = false;
    } else {
      console.log(`Test Case ${index + 1} passed!`);
    }
  });

  return passedAllTests;
}

// Function to push changes
function pushChanges() {
  try {
    execSync("git add .");
    execSync('git commit -m "Auto-push: Tests passed"');
    execSync("git push origin main");
    execSync("git config --global user.email 'action@github.com'");
    execSync("git config --global user.name 'GitHub Action'");
    console.log("Changes pushed successfully.");
  } catch (error) {
    console.error("Error pushing changes:", error);
  }
}

// Function to create an issue
function createIssue() {
  // Raise an issue in the repository
  // execSync(
  //   `gh issue create --title "Tests failed" --body "Tests failed. Please check your code."`
  // );
  console.log("Creating issue: Tests failed. Please check your code.");
}

// Main function
function main() {
  const testsPassed = runTests();

  if (testsPassed) {
    pushChanges();
  } else {
    createIssue();
  }
}

main();
