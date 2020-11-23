

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    visible: false,
    todoText: "",
    computedText: "This text will be computed",
    activeColor: "green",
    fontSize: 20
  },
  methods: {
    doSomething: function(){
      this.message = this.message.split('').reverse().join('');
      this.visible = !this.visible;
    },

    addTodo: function(){
      console.log("Input text: " + this.todoText);
      this.todos.push({text: this.todoText});
    },

    // A method invocation will always run the function whenever a re-render happens
    reverseASentence: function(){
      return this.computedText.split(' ').reverse().join(' ')
    }
  },

  computed: {
    // A computed property will only re-evaluate when some of its reactive dependencies have changed
    reverseSentence: function () {
      return this.computedText.split(' ').reverse().join(' ')
    }
  }
})



var app = new Vue({
  el: '#app-2',
  data: {
    message: 'Hello Vue 2!',
  },

  beforeCreate(){
    console.log("beforeCreate");
    console.log("msg: " + this.message);
  },

  created(){
    console.log("created");
    console.log("msg: " + this.message);
    console.log("html element: " + document.querySelector('#header').text);
  },

  mounted(){
    console.log("mounted");
    console.log("msg: " + this.message);
    console.log("html element: " + document.querySelector('#header').textContent);

    //this.message = "Hello Vue2! Updated";
  },

  beforeUpdate(){
    console.log("beforeUpdate");
  },

  updated(){
    console.log("updated");
  }
});