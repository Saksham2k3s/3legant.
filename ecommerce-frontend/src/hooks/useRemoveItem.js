const useRemoveItem = (item, index, prevState) => {
    
  const filterdState = prevState.filter((item, idx) => idx !== index);
  return filterdState

      
}

export default useRemoveItem;