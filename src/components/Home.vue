<template>
  <div class="container">
    <h1>Home</h1>
    <!-- <button class="btn btn-secondary" @click="makeData">Make</button> -->
    <hr>
    <input
      class="form-control mb-3 new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      v-on:keyup.enter="addTodo"
    >
    <ul class="todo-list list-group mb-3" v-if="todos.length">
      <!-- The list of todo items -->
      <li
        v-for="todo in todos"
        class="todo list-group-item"
        v-bind:key="todo.id"
        v-bind:class="{ completed: todo.completed, editing: todo == editedTodo }"
      >
        <!-- <label v-if="!todo.editing" v-on:dblclick="testEdit(todo)" for="test">Double click me</label>
        <input v-if="todo.editing" v-on:keyup.enter="doneTestEdit(todo)" v-on:keyup.esc="doneTestEdit(todo)" type="text" class="form-control" placeholder="thanks">-->
        <div class="view input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input
                class="toggle"
                type="checkbox"
                v-model="todo.completed"
                v-on:click="completed(todo)"
              >
            </div>
          </div>

          <textarea
            v-if="!todo.editing"
            class="view form-control"
            type="text"
            v-model="todo.title"
            @dblclick="editTodo(todo)"
            rows="1"
            readonly
          ></textarea>
          
          <input
            class="edit form-control"
            type="text"
            v-model="todo.title"
            v-if="todo.editing"
            v-on:blur="doneEdit(todo)"
            v-on:keyup.enter="doneEdit(todo)"
            v-on:keyup.esc="cancelEdit(todo)"
          >

          <div class="input-group-append">
            <button class="destroy btn btn-secondary" v-on:click="removeTodo(todo)">X</button>
          </div>
        </div>
        <small><i>Created: {{todo.created}}</i></small>
      </li>
    </ul>

    <div class="row">
      <div class="col">
        <span class="todo-count" v-if="remaining > 0">
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize }} left
        </span>
      </div>
      <div class="col text-right">
        <button
          class="clear-completed btn btn-primary"
          @click="removeCompleted"
          v-if="todos.length > remaining"
        >Clear completed</button>
      </div>
    </div>
  </div>
</template>
<script>
import db from "../firebase/firebaseInit.js";
var todosCollection = db.collection("todos");

export default {
  data() {
    return {
      test: [],
      newTodo: "",
      todos: [],
      editedTodo: null,
      editing: null
    };
  },

  created() {
    //get realtime updates from database
    todosCollection.orderBy("created").onSnapshot(snap => {
      let data = [];

      snap.forEach(doc => {
        var timeStamp = new Date(doc.data().created)
        var date = timeStamp.toDateString()
        data.push({
          id: doc.id,
          title: doc.data().title,
          completed: doc.data().completed,
          created: date,
          editing: false
        });
      });

      this.todos = data;
    });
  },

  filters: {
    pluralize: function(n) {
      return n === 1 ? "item" : "items";
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    remaining: function() {
      var incompleteTodos = this.todos.filter(function(todo) {
        return !todo.completed;
      });

      return incompleteTodos.length;
    }
  },

  methods: {
    //test logic
    makeData() {
      db.collection("test").add({
        num: Math.floor(Math.random() * 100)
      });
    },
    getData() {
      db.collection("test")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              num: doc.data().num
            };
            this.test.push(data);
          });
        });
    },
    testEdit(todo) {
      todo.editing = true;
    },
    doneTestEdit(todo) {
      todo.editing = false;
    },

    //todo logic
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        // todo is empty, nothing to do
        return;
      }

      // 3. Add a new collection document to "todos"
      todosCollection.add({
        title: value,
        completed: false,
        created: Date.now()
      });

      // clear out the newTodo variable
      this.newTodo = "";
    },

    removeTodo: function(todo) {
      // 4. Delete the document from the todos collection
      todosCollection.doc(todo.id).delete();
    },

    completed: function(todo) {
      // 5. Update completed for the current document

      todosCollection.doc(todo.id).update({
        completed: !todo.completed
      });
    },

    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].editing = false
      }
      todo.editing = true;
    },

    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;

      var title = todo.title.trim();

      if (!title) {
        this.removeTodo(todo);
      } else {
        // 6. Update the current document in the todos collection
        todosCollection.doc(todo.id).update({
          title: title
        });
      }
      todo.editing = false;
    },

    cancelEdit: function(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },

    removeCompleted: function() {
      // 7. Remove all the completed todos from the todos collection
      var batch = db.batch();

      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed) {
          var item = todosCollection.doc(this.todos[i].id);
          batch.delete(item);
        }
      }

      batch.commit();
    }
  }
};
</script>
<style>
.view {
  resize: none;
}
</style>

