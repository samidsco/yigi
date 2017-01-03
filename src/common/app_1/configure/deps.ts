import validate from 'shared/validate'

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;