
<template>

    <main-header></main-header>
    <q-card class="q-pa-md items-start q-gutter-md" style="margin: 0px 10%">
        <q-card-section>
            <div class="container">
                <h3>Terms and Conditions</h3>
        
                <h4>1. Introduction</h4>
                <p>Welcome to Baixium!</p>
                <p>These terms and conditions outline the rules and regulations for the use of Baixium's Website, located at <a href="http://baixium-dev-web.s3-website-us-east-1.amazonaws.com/">http://baixium-dev-web.s3-website-us-east-1.amazonaws.com/</a>.</p>
                <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Baixium if you do not agree to take all of the terms and conditions stated on this page.</p>
        
                <h4>2. Interpretation and Definitions</h4>
                <p>For the purposes of these terms and conditions:</p>
                <ul>
                    <li><strong>Company</strong> means Baixium, registered under the laws of Brazil, whose registered office is at Avenida dos Sabiás, número 330, Morada de Laranjeiras. 29166630 Serra, ES.</li>
                    <li><strong>You</strong> means the individual accessing or using the Website, or the company, or other legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
                    <!-- Add more definitions as necessary -->
                </ul>
        
                <h4>3. User Content</h4>
                <p>Our website allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the website, including its legality, reliability, and appropriateness.</p>
        
                <h4>4. Intellectual Property Rights</h4>
                <p>Other than the content you own, under these terms, Baixium and/or its licensors own all the intellectual property rights and materials contained in this website.</p>
        
                <h4>5. User Responsibilities</h4>
                <p>By accessing this website, you agree to comply with all applicable laws and regulations. You also agree not to:</p>
                <ul>
                    <li>Use the website in any way that may cause damage to the website or impair the availability or accessibility of the website;</li>
                    <li>Engage in any unauthorized use, reproduction, or distribution of any content on the website;</li>
                    <li>Attempt to gain unauthorized access to the website or any associated systems or networks;</li>
                    <li>Use the website to transmit or distribute any malicious code, viruses, or harmful software;</li>
                    <li>Engage in any activity that interferes with or disrupts the website or servers or networks connected to the website;</li>
                    <li>Violate any third-party rights, including intellectual property rights or privacy rights;</li>
                    <li>Use the website for any illegal or unauthorized purpose;</li>
                    <li>Engage in any conduct that restricts or inhibits anyone else's use or enjoyment of the website.</li>
                </ul>
        
                <!-- Add more sections as needed -->
        
                <h4>6. Changes to These Terms and Conditions</h4>
                <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. It is your responsibility to check these terms periodically for changes.</p>
        
                <h4>7. Contact Us</h4>
                <p>If you have any questions about these terms and conditions, you can contact us:</p>
                <ul>
                    <li>Email: <a href="mailto:contact@baixium.com">contact@baixium.com</a></li>
                    <li>Phone: (27) 99915-7070</li>
                    <!-- Add more contact options if needed -->
                </ul>
            </div>        
        </q-card-section>
    </q-card>
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
    data () {
        return {
            email: '',
            username: '',
            password: '',
            passwordFieldType: 'password',
            register: false,
            btnLabel: 'Login',
            visibility: false,
            visibilityIcon: 'visibility'
        }
    },
    methods: {
        toggleVisibility () {
            this.visibility = !this.visibility;
            this.passwordFieldType = this.visibility ? 'text' : 'password';
            this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility';
        }
    }
});
</script>