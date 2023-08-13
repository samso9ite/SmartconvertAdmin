<template>
<div>
    <NavBar />
        <div class="content-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <h4 class="card-title">Testimonials</h4>
                            </div>
                            <div class="card-body pt-0">
                                <div class="row">
                                    <div class="col-xl-3 col-lg-3 col-xxl-4" v-for="testimonial in testimonials" :key="testimonial.reference">
                                            <div class="widget-card">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="widget-stat">
                                                        <div class="coin-title">
                                                            <h5 class="d-inline-block ms-2 mb-3">
                                                                {{testimonial.user.first_name}} {{testimonial.user.last_name}}
                                                            </h5>
                                                        </div>
                                                        <h4 style="margin-bottom:15px">  {{testimonial.message}}
                                                        </h4>
                                                        <span style="color:green; font-size: 17px; font-weight: 600; cursor: pointer;  background-color: aliceblue; padding:8px; border-radius: 10px; "  @click="updateTestimonial({reference:testimonial.reference, status:false})" v-if="testimonial.status == false">Approve</span>
                                                        <span style="color:red; font-size: 17px; font-weight: 600; cursor: pointer; background-color: aliceblue; padding:8px; border-radius: 10px" @click="updateTestimonial({reference:testimonial.reference, status:true})" v-if="testimonial.status == true">Disapprove</span>
                                                    </div>
                                                    <div id="btcChart"></div>
                                            </div>
                                                  
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
        </div>
    <Footer />
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { useStore } from 'vuex'
import Api from './Api'
import { onMounted } from 'vue'

export default defineComponent({
    name: "Testimonials",
    components: {Footer, NavBar},
    setup() {
        const testimonials = ref<any>([])
        const store = useStore()
       
        /* Get all coins from the database */
        const getTestimonials = async() => {
            try {
                await  Api.axios_instance.get(Api.baseUrl+'api/v1/list-testimonials')
                    .then(res => {
                        testimonials.value = res.data
                        store.commit('storeTestimonials', {testimonials_list:res.data})
                    })
            } catch(e){
                console.log("There's an error");
            }
        }
        const updateTestimonial = (params:any) => {
            try {
                let formData = {
                    status: !params.status
                }
                Api.axios_instance.patch(Api.baseUrl+'api/v1/update-testimonial/'+params.reference, formData)
                .then(res => {
                    getTestimonials()
                    alert("Testimonial Has Been Updated")
                })
            }catch(e){
                console.log("Error Occured");
            }
        }
        onMounted(() =>{
            getTestimonials()
        })
    return {getTestimonials, testimonials, updateTestimonial}
    },
})
</script>