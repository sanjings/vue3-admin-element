export const useGlobalProperties = () => {
  const { appContext } = getCurrentInstance()!;
  const globalProperties = appContext.config.globalProperties;
  return { globalProperties };
};
