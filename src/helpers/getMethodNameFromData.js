import { ethers } from "ethers";

// Known function selectors for common methods (fallback)
const knownSelectors = {
  // ERC-20 Function Selectors
  "0xa9059cbb": "transfer(address,uint256)", // Transfer tokens to a specified address
  "0x095ea7b3": "approve(address,uint256)", // Approve a specified address to spend tokens
  "0x23b872dd": "transferFrom(address,address,uint256)", // Transfer tokens from one address to another
  "0x70a08231": "balanceOf(address)", // Get the token balance of an address
  "0xdd62ed3e": "allowance(address,address)", // Check the allowed tokens for a spender
  "0x18160ddd": "totalSupply()", // Get the total token supply
  "0x313ce567": "decimals()", // Get the number of decimals for the token
  "0x06fdde03": "name()", // Get the name of the token
  "0x95d89b41": "symbol()", // Get the symbol of the token

  // ERC-721 Function Selectors
  "0x42842e0e": "safeTransferFrom(address,address,uint256)", // Safely transfer a token
  "0xb88d4fde": "safeTransferFrom(address,address,uint256,bytes)", // Safely transfer a token with data
  "0x6352211e": "ownerOf(uint256)", // Get the owner of a specified token ID
  "0x5b5e139f": "tokenURI(uint256)", // Get the URI for a token ID

  // ERC-1155 Function Selectors
  "0xf242432a": "safeTransferFrom(address,address,uint256,uint256,bytes)", // Safely transfer an ERC-1155 token
  "0x2eb2c2d6":
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)", // Batch transfer ERC-1155 tokens
  "0x00fdd58e": "balanceOf(address,uint256)", // Get the balance of an address for a specific token ID
  "0x4e1273f4": "balanceOfBatch(address[],uint256[])", // Get the balances of multiple addresses and token IDs
  "0xd9b67a26": "supportsInterface(bytes4)", // Check if the contract supports a given interface
};

// Utility to retrieve ABI from IndexedDB by contract address
async function getABIFromIndexedDB(contractAddress) {
  // Return null early if contractAddress is invalid
  if (!contractAddress) return null;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ABIStore", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("abis")) {
        db.createObjectStore("abis", { keyPath: "address" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["abis"], "readonly");
      const objectStore = transaction.objectStore("abis");

      // Attempt to get the ABI using the contractAddress as the key
      const getRequest = objectStore.get(contractAddress);

      getRequest.onsuccess = () => {
        resolve(getRequest.result?.abi || null); // Resolve with ABI if found, or null
      };
      getRequest.onerror = (error) => {
        reject(error);
      };
    };

    request.onerror = (error) => {
      reject(error);
    };
  });
}

// Function to get the method name based on transaction data, using IndexedDB and known selectors
export async function getMethodNameFromData(data, contractAddress) {
  // Extract the function selector (first 4 bytes of data)
  const functionSelector = data.slice(0, 10);

  // Check known selectors first
  if (knownSelectors[functionSelector]) {
    return knownSelectors[functionSelector];
  }

  // If not found in known selectors, try IndexedDB
  const abi = await getABIFromIndexedDB(contractAddress);
  if (abi) {
    const iface = new ethers.utils.Interface(abi);
    for (const fragment of Object.values(iface.functions)) {
      if (iface.getSighash(fragment) === functionSelector) {
        return fragment.name; // Return the method name
      }
    }
  }

  // If not found anywhere, return "-"
  return null;
}

// // Using this function in a component to get method names
// export function useTransactionMethodNames(transactions) {
//   const [txs, setTxs] = useState([]);

//   useEffect(() => {
//     if (!transactions) {
//       setTxs([]);
//       return;
//     }

//     const fetchMethodNames = async () => {
//       let data = [];
//       for (const tx of transactions) {
//         const methodName = await getMethodNameFromData(tx.data, tx.to);
//         data.push({ ...tx, methodName });
//       }
//       setTxs(data);
//     };

//     fetchMethodNames();
//   }, [transactions]);

//   return txs;
// }
