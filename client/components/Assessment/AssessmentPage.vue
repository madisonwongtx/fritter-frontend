<template>
  <main>
    <header>
      <h2>Good Framaritan Assessment</h2>
      <p>Help keep Fritter a healthy and expressive space.</p>
      <h4>How the Assessment Works: </h4>
      <p>Below you can request an assessement. The assessment will have eight options
        and you must select all the behaviors that are acceptable on the platform. After you hit submit you assessment,
        it will be graded.
        <br />
        <br />
        You must have a passing score in order to be able to post.
        You can take the assessment as many times as you would like but 
        will be required to take it every six months at minimum.
      </p>
    </header>
    <section>
      <h3>Current Status: {{ $store.state.score }}</h3>
      <h5
        v-if="$store.state.score < 5/8*100"
        style="color:red"
      >
        Last Attempt Failed
      </h5>
      <h5
        v-else
        style="color:forestgreen"
      >
        Last Attempt Passed!
      </h5>
    </section>
    <section>
      <button
        @click="getAssessment"
      >
        Get New Good Framaritan Assessment
      </button>
    </section>
    <section v-if="$store.state.quiz">
      <div>
        1. {{ $store.state.quiz.question1 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question1===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(1, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question1===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(1, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        2. {{ $store.state.quiz.question2 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question2===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(2, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question2===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(2, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        3. {{ $store.state.quiz.question3 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question3===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(3, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question3===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(3, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        4. {{ $store.state.quiz.question4 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question4===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(4, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question4===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(4, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        5. {{ $store.state.quiz.question5 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question5===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(5, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question5===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(5, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        6. {{ $store.state.quiz.question6 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question6===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(6, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question6===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(6, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        7. {{ $store.state.quiz.question7 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question7===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(7, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question7===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(7, 2)"
        >
          Not Acceptable
        </button>
      </div>
      <div>
        8. {{ $store.state.quiz.question8 }}
      </div>
      <div>
        <button 
          v-if="$store.state.question8===1"
          style="background-color:aquamarine"
        >
          Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(8, 1)"
        >
          Acceptable
        </button>
        <button 
          v-if="$store.state.question8===2"
          style="background-color:aquamarine"
        >
          Not Acceptable
        </button>
        <button 
          v-else
          style="background-color:aliceblue"
          @click="switchStatus(8, 2)"
        >
          Not Acceptable
        </button>
      </div>
    </section>
    <section>
      <button
        @click="gradeQuiz"
      >
        Submit Quiz
      </button>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AssessmentPage',
  data () {
    return {
      validated: false
    };
  },
  mounted () {
    console.log(this.$store.state.score);
  },
  methods: {
    async getAssessment() {
      const url = '/api/assessment';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if(!r.ok) {
          throw new Error (res.error);
        }
        this.$store.commit('updateQuiz', res.quiz)
        this.$store.commit('updateQuestion1', 0);
        this.$store.commit('updateQuestion2', 0);
        this.$store.commit('updateQuestion3', 0);
        this.$store.commit('updateQuestion4', 0);
        this.$store.commit('updateQuestion5', 0);
        this.$store.commit('updateQuestion6', 0);
        this.$store.commit('updateQuestion7', 0);
        this.$store.commit('updateQuestion8', 0);
        this.valid = true;
        // console.log(this.$store.state.quiz);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    switchStatus(question, nextStatus) {
      if (question == 1) {
        this.$store.commit('updateQuestion1', nextStatus);
      }
      if (question == 2) {
        this.$store.commit('updateQuestion2', nextStatus);
      }
      if (question == 3) {
        this.$store.commit('updateQuestion3', nextStatus);
      }
      if (question == 4) {
        this.$store.commit('updateQuestion4', nextStatus);
      }
      if (question == 5) {
        this.$store.commit('updateQuestion5', nextStatus);
      }
      if (question == 6) {
        this.$store.commit('updateQuestion6', nextStatus);
      }
      if (question == 7) {
        this.$store.commit('updateQuestion7', nextStatus);
      }
      if (question == 8) {
        this.$store.commit('updateQuestion8', nextStatus);
      }
    }, 
    async gradeQuiz () {
      const ansConvert = ['', 'yes', 'no']
      const params = {
        method: 'PUT',
        body: JSON.stringify({
              question_1: ansConvert[this.$store.state.question1],
              question_2: ansConvert[this.$store.state.question2],
              question_3: ansConvert[this.$store.state.question3],
              question_4: ansConvert[this.$store.state.question4],
              question_5: ansConvert[this.$store.state.question5],
              question_6: ansConvert[this.$store.state.question6],
              question_7: ansConvert[this.$store.state.question7],
              question_8: ansConvert[this.$store.state.question8]}),
        callback: () => {
          this.$store.commit('alert', {
              message: 'Assessment was submitted successfuly!', status: 'success'
            });
          }
        }

        const options = {
          method: params.method,
          headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }

        try{
          const r = await fetch ('/api/assessment/grade', options);
          if(!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
          this.$store.commit('refreshScore');
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
    }
  }
}
</script>