const { Web3 } = require('web3');

async function main(){
    const nodes = require('./allocations.json');
    const fluxAggregatorAbi = require('./abis/FluxAggregator.json');
    const web3 = new Web3(new Web3.providers.HttpProvider(nodes.rpc));

    let nodeBalance;
    let aggregatorContract;
    let desc;
    let withdrawable;
    let amountPli = 0;

    for (const node of nodes.allocations) {
        nodeBalance = web3.utils.fromWei(await web3.eth.getBalance(node.nodeAddress), 'ether');
        console.log(`Node Address : ${node.nodeAddress}`);
        console.log(`  Node Balance : ${nodeBalance} XDC`);
        console.log('  withdrawable :');
        for (const facAddr of node.facAddresses) {
            aggregatorContract = new web3.eth.Contract(fluxAggregatorAbi, facAddr);
            desc = await aggregatorContract.methods.description().call();
            withdrawable = web3.utils.fromWei(
                await aggregatorContract.methods.withdrawablePayment(node.nodeAddress).call(),
                    'ether');
            amountPli += Number(withdrawable);
            console.log(`      ${desc} : ${withdrawable} PLI`);
        }
        console.log('      ---------------------------');
        console.log(`      AMOUNT   : ${amountPli} PLI`);
        console.log();
        amountPli = 0;
    }
}

main();
