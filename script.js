const web3 = new Web3(Web3.givenProvider || "ws://localhost:8080");

const form = document.querySelector('form');
const xButton = document.getElementsByClassName('x-button')[0];

const send = async (amount) => {
    // alert(`Now sending a ${amount} ETH tip!`);

    // Requests accounts from Metamask
    const userAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    
    const wei = web3.utils.toWei(amount);

    // Confirms that we have at least one Metamask account
    if (userAccounts.length > 0) {
        // Requests ETH transaction from correct Metamask wallet address to my Metamask wallet
        window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: userAccounts[0],
                to: '0x96e72388185a57340c317717F8696D46727289F2',
                value: web3.utils.toHex(wei)
            }]
        })
    }
}

// if Memtamask is linked to your browser and accessible via window.ethereum, show the popup
// otherwise replace popup with innerHTML
if (window.ethereum) {
    form.classList.add('has-eth');
} else {
 form.innerHTML = 'Sign in to your Metamask crypto wallet to leave a tip on this article!'   
}

// typical form submission event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (window.ethereum) {
        const input = form.querySelector('input');
        send(input.value);
    }
})

// hides form when xButton is clicked
xButton.addEventListener('click', () => {
    form.classList.add('hidden');
})