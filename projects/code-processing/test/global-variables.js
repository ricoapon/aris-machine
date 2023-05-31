// https://stackoverflow.com/questions/68630040/jasmine-karma-fails-with-referenceerror-process-is-not-defined
// This is needed, because of the "assert" dependency. This is not only applied for compiling tests, also for the
// main application (see src/index.html).
const process = {
  env: {
    NODE_ENV :'production'
  }
};
