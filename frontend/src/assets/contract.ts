import Web3 from 'web3';

// ABI và địa chỉ hợp đồng
const ABI: any[] = [ /* Danh sách ABI */ ];
const addressSC: string = '0x9AFe10b99eF5e0Bd348f0dE6F6896F82f61CC734';

// Khởi tạo Web3 từ MetaMask
const web3 = new Web3(window.ethereum);
window.ethereum.enable();

// Khởi tạo hợp đồng thông qua Web3
const contractMM = new web3.eth.Contract(ABI, addressSC);

// Khởi tạo Web3 thông qua Infura
const provider = new Web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/0c318738860048e1973e16489dd40040');
const web3_infura = new Web3(provider);
const contractInfura = new web3_infura.eth.Contract(ABI, addressSC);

// Xử lý sự kiện từ Infura
contractInfura.events.eventCreateCourse(
    {
        filter: {},
        fromBlock: 'latest',
    },
    (err: Error, returnEvent: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(returnEvent);
            window.location.href = '/courses/index.html';
        }
    }
);

// Thêm các xử lý sự kiện khác tương tự ở đây...

// Kết nối với MetaMask và lấy tài khoản hiện tại
async function connectMM(): Promise<string[]> {
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
    });
    return accounts;
}

// Kiểm tra xem MetaMask đã được cài đặt hay chưa
function checkMM() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        console.log('You have not installed MetaMask!');
    }
}
