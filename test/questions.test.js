const assert = require('assert')
const { questions } = require('../src/questions.json')

class QuestionsGen {
  constructor(questions){
    this.questions = questions
    this.id = 1
  }

  isNext(answer){
    if(!this.questions[this.id].paths){
      return false
    }
    
    if(this.questions[this.id].paths !== 'number'){
      this.id = this.questions[this.id].paths[answer]
    } else {
      this.id = this.questions[this.id].paths
    }
    
    if(this.id < 0) {
      this.id = 0
    }
    
    return true 
  }

  getNextQuestion(){
    return this.questions[this.id].question
  }

  validate(answer){
    if(typeof this.questions[this.id].validation === 'boolean'){
      return this.questions[this.id].validation
    }

    if(Array.isArray(this.questions[this.id].validation)){
      return this.questions[this.id].validation.includes(answer)
    }

    if(typeof this.questions[this.id].validation === 'string'){
      const reg = new RegExp(this.questions[this.id].validation)
      return reg.test(answer)
    }

    return false
  }
}

describe('questionGenerator', () => {
  const gen = new QuestionsGen(questions)
  it('returns first questions', () => {
    assert.equal(gen.getNextQuestion(), questions[1].question)
  })

  it('should validate the answer for prev question', () => {
    assert.equal(gen.validate('yes'), true)
    assert.equal(gen.validate('no'), true)
  })

  it('should validate to false if wrong answer for prev question', () => {
    assert.equal(gen.validate('not sure'), false)
  })

  it('if validation is true check if there is next question', () => {
    assert.equal(gen.isNext('no'), true)
    assert.equal(gen.getNextQuestion(), questions[0].question)
  })

  it('if validation is false return prev question', () => {
    assert.equal(gen.validate('sorry'), false)
    assert.equal(gen.getNextQuestion(), questions[0].question)
  })

})