import assert from 'assert'
import { questions } from '../src/questions.json'
import { questionGenerator } from '../src/helpers/questions'

describe('questionGenerator', () => {
  const gen = questionGenerator(questions, 0)
  it('returns first questions', () => {
    assert.deepEqual(gen.next().value, questions[0])
  })

  it('returns next questions based on answer', () => {
    assert.deepEqual(gen.next('good').value, questions[1])
  })

  it('returns next question based on answer', () => {
    assert.deepEqual(gen.next('nothing').value, questions[3])
  })

  it('when there is no more questions set done to true', () => {
    assert.equal(gen.next().done, true)
  })

})