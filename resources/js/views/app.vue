<template>
    <div class="container">
        <div class="overflow-auto">
            {{ sortable }}
            <b-table
                id="my-table"
                :items="comments"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="fields"
                :sort-by.sync="sortable.by"
                :sort-desc.sync="sortable.isDesc"
                small
            >
                <template #cell(action)="data">
                    <b-button @click="removeComment(data.item.id)" variant="danger">
                        Удалить
                    </b-button>
                </template>
                <template #cell(date)="data">
                    {{ data.item.date.split('T')[0]}}
                </template>
            </b-table>
            <b-pagination
                v-model="currentPage"
                :total-rows="comments.length"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
        </div>
        <div class="form">
            <div class="form__group">
                <b-form-input v-model="form.name" placeholder="Название" />
            </div>
            <div class="form__group">
                <b-form-textarea
                    id="textarea"
                    v-model="form.text"
                    placeholder="Коментарий"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </div>
            <div class="form__group">
                <date-picker v-model="form.date" />
            </div>
            <b-button variant="primary" @click="createComment">
                Добавить коментарий
            </b-button>
        </div>
    </div>
</template>
<script>
const default_layout = "default"
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { mapActions } from 'vuex'

export default {
    components: { DatePicker },
    computed: {
        comments() {
            return this.$store.state.comments
        },
        perPage () {
            return this.$store.state.perPage
        },
        sortable: {
            get: function () {
                return this.$store.state.sortable
            },
            set: function (value) {
                this.$store.commit('setSortable', value)
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            form: {
                name: null,
                text: null,
                date: null
            },
            fields: [
                {
                    key: 'id',
                    sortable: true
                },
                {
                    key: 'name',
                    label: 'Имя',
                    sortable: false
                },
                {
                    key: 'text',
                    label: 'Текст',
                    sortable: false
                },
                {
                    key: 'date',
                    label: 'Дата',
                    sortable: true
                },
                {
                    key: 'action',
                    label: '',
                    sortable: false
                }
            ],
        }
    },
    mounted() {
        this.fetchComments()
    },
    methods: {
        ...mapActions(['fetchComments']),
        createComment () {
            this.$store.dispatch('createComment', this.form)
                .then(() => {
                    alert('Коментарий добавлен')
                    this.form.name = null
                    this.form.text = null
                    this.form.date = null
                    this.fetchComments()
                })
                .catch(() => alert('Произошла ошибка'))
        },
        removeComment(id) {
            let isBoss = confirm("Действительно хотите удалить коментарий?")
            if (!isBoss) return
            this.$store.dispatch('removeComment', id)
                .then(() => {
                    alert('Коментарий удален')
                    this.fetchComments()
                })
                .catch(() => alert('Произошла ошибка'))
        }
    }
};
</script>

<style>
body {
    margin: 0;
}
.container {
    max-width: 1280px;
    background-color: #d9d9d9;
    margin: 0 auto;
    height: 100vh;
    padding: 0 15px;
}
.form__group {
    margin-bottom: 10px;
}
</style>
