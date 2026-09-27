document.addEventListener('DOMContentLoaded', () => {
    const tiers = document.querySelectorAll('.tier');
    
    tiers.forEach(tier => {
        tier.addEventListener('click', () => {
            tiers.forEach(t => t.classList.remove('active-tier'));
            tier.classList.add('active-tier');
            calculateTotal();
        });
    });

    const selectSeatBtns = document.querySelectorAll('.match-card .btn-outline');
    const matchDropdown = document.getElementById('match');

    selectSeatBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if(matchDropdown.options[index]) {
                matchDropdown.selectedIndex = index;
            }
        });
    });

    const ticketInput = document.getElementById('tickets');
    const submitBtn = document.querySelector('.booking-form .btn-primary');
    
    const calculateTotal = () => {
        const activeTier = document.querySelector('.active-tier');
        const priceText = activeTier.querySelector('p').innerText;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        
        const quantity = parseInt(ticketInput.value) || 1;
        const total = price * quantity;
        
        submitBtn.innerText = `Pay ₹${total.toLocaleString()}`;
    };

    ticketInput.addEventListener('input', calculateTotal);
    
    calculateTotal();

    const form = document.querySelector('.booking-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const name = document.getElementById('name').value;
        const activeTierName = document.querySelector('.active-tier h4').innerText;
        const quantity = ticketInput.value;
        const matchSelected = matchDropdown.options[matchDropdown.selectedIndex].text;
        
        alert(`🏏 Booking Confirmed, ${name}!\n\nDetails:\nMatch: ${matchSelected}\nTickets: ${quantity} x ${activeTierName}\n\nCheck your email for the digital pass.`);
        
        form.reset();
        calculateTotal();
    });
});