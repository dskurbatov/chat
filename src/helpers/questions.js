export function *questionGenerator(q, id){
  while(!q[id].done){
    let answer = yield q[id]
    id = q[id].paths[answer]
  }
  yield q[id]
}
