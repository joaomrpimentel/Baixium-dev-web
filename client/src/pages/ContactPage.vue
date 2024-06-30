<template>
    <main-header></main-header>
    <div class="container" style="width: 50%;; margin: auto; text-align: center;">
      <h4>Contact Us</h4>
      <p>Have a question or feedback? Fill out the form below to get in touch with us.</p>
      
      <q-form @submit="submitForm" >
        <q-input
          outlined
          v-model="formData.name"
          label="Name"
          dense
          required
        />
        <q-input
          outlined
          v-model="formData.email"
          label="Email"
          type="email"
          dense
          required
        />
        <q-input
          outlined
          v-model="formData.message"
          label="Message"
          type="textarea"
          rows="5"
          dense
          required
        />
        <q-btn
          type="submit"
          color="black"
          label="Submit"
        class="full-width"
        />
      </q-form>
    </div>
    <main-footer></main-footer>
</template>


<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TermsAndConditionsPage',
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter
    },
    data() {
        return {
        formData: {
            name: '',
            email: '',
            message: ''
        }
    };
    },
    methods: {
        submitForm() {
        // Handle form submission here
        console.log('Form submitted:', this.formData);
        // You can send the form data to your backend or perform any other action
        }
    }
});
</script>

