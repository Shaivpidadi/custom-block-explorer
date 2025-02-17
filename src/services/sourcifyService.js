const SOURCIFY_SERVER = "http://localhost:5555";
const CHAIN_ID = 31337;

const loadFromSourcify = async (addr) => {
    try {
        const res = await fetch(`${SOURCIFY_SERVER}/repository/contracts/full_match/${CHAIN_ID}/${addr}/metadata.json`);
        const json = await res.json();

        const targ = json.settings.compilationTarget;
        const targName = Object.values(targ)[0];

        const abi = json.output.abi;
        const result = {};

        result[targName] = abi;
        return result;
    } catch (err) {
        console.error("Failed to connect to sourcify: ", err);
    }
}


export {
    loadFromSourcify
}