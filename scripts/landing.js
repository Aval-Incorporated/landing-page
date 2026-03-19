async function pageSwitch(page, el){
    const pageData = await fetch(`pages/${page}.html`)
    const textData = await pageData.text()
    document.querySelector('.content').innerHTML = textData
    window.scroll(0, 0)
    el.classList.add('active')
    if(page != 'home'){
        document.querySelector('.fot').classList.add('hide')
    }
    else{
        document.querySelector('.fot').classList.remove('hide')                
    }
} 
function waitlist(){
    const jw = document.getElementById('JWaitlist')

    jw.addEventListener('click', () => [
        window.location.href = '../landing-page/products/campaignity.html'
    ])
}
function showAlert(text, type){
    const alerts = document.querySelector('.alert')
    if(text){
        alerts.innerHTML = text
    }
    alerts.classList.add('active')
    alerts.classList.add(type)
    setTimeout(() => {alerts.classList.remove('active')}, 3000)
}
document.addEventListener("DOMContentLoaded", async () => {
    const createClient = window.supabase.createClient('https://tnbdgppzrhemykfewekl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuYmRncHB6cmhlbXlrZmV3ZWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MDEyOTgsImV4cCI6MjA3OTM3NzI5OH0.PYfBpxx9-2_mNU9A_VXVOFXS4dmBJ9XcqLbwldnzheM')
    const nav = document.querySelectorAll('.nav')
    const navArr = Array.from(nav)
    const viewProd = document.querySelectorAll('.prod-btn')
    let viewProdArr = Array.from(viewProd)

    navArr.forEach(el => {
        el.addEventListener('click', async () => {
            console.log(el)
            let pageView = el.dataset.view
            pageSwitch(pageView, el)
            if(pageView == 'products'){
                setTimeout(() => {waitlist()}, 200)
            }
            navArr.forEach(el => el.classList.remove('active'))
            el.classList.add('active')
        })
    })

    viewProdArr.forEach(el => {
        el.addEventListener('click', () => {
            navArr.forEach(el => el.classList.remove('active'))
            const nav = document.querySelector('.prod')
            pageSwitch('products', nav)
            setTimeout(() => {waitlist()}, 200)
        })
    })

    document.getElementById('newsletterSub').addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const email = document.querySelector('#newsletter')
        document.getElementById('subscribe').setAttribute('disabled', 'true')
        document.getElementById('subscribe').style.cursor = 'no-drop'
        document.getElementById('subscribe').style.background = '#4B5563'
        const {data, error} = await createClient.from('newsletter').insert({email: email.value})
        if(!error){
            showAlert('Thank you for subscribing.', 'pos')
        }
        else{
            if(error.message == 'duplicate key value violates unique constraint "newsletter_pkey"'){
                showAlert('You are already subscribed.', 'neg')
                return
            }
            showAlert('Encountered An Error.', 'neg')
        }
    })
})