// test_and_push.js

const { execSync } = require("child_process");
const fs = require("fs");

// Define test cases (input and expected output)
const testCases = [
  { input: "1 2", expectedOutput: "3\n" },
  { input: "-1 5", expectedOutput: "4\n" },
  { input: "3.5 2.5", expectedOutput: "6\n" },
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
    const pythonOutput = pythonProcess.toString();

    console.log(`Output: ${pythonOutput}`);

    console.log(pythonProcess.toString());
    // Compare output with expected output
    if (pythonOutput !== testCase.expectedOutput) {
      console.log(`Test Case ${index + 1} failed!`);
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
