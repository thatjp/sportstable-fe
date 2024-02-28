export const formatTableData = (action, state) => {
  let arr = [];
      action?.payload?.resultSets[0]?.rowSet?.forEach((element, idx) => {
        let obj = {};
        action.payload.resultSets[0].headers?.forEach((k, i) => {
          console.log(k)
          obj[k] = element[i];
        });
        arr.push(obj);
      });
      state.games = arr
    }
  