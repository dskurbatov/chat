export class QuestionsGen {
  constructor(questions){
    this.questions = questions
    this.id = 1
  }

  isLast(){
    return this.id === this.questions.length - 1
  }

  isFirst(){
    return this.id = 0
  }

  getCurrentQuestionId(){
    return this.id + 1
  }

  isNext(answer){
    if(!this.questions[this.id].paths){
      return false
    }
    
    if(typeof this.questions[this.id].paths !== 'number'){
      this.id = this.questions[this.id].paths[answer]
    } else {
      console.log(this.questions[this.id].paths)
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