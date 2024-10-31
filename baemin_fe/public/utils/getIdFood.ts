export const getIdFood = (param: string) => {
  return param.split("_").pop();
};
