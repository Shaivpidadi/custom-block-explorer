# Block Explorer

This project is a custom blockchain explorer built with React, Ethers.js, and Hardhat. It allows users to explore blockchain data and interact with smart contracts on a local Hardhat node, making it ideal for development and testing in a controlled environment.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Hardhat** (for local blockchain node)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shaivpidadi/block-explorer
   cd block-explorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

The app uses environment variables to configure the connection to the blockchain node. To customize, create a `.env` file in the project root with the following variables:

```env
REACT_APP_PROVIDER='http://127.0.0.1:8545'   # Fallback for local Hardhat node
REACT_APP_WS_PROVIDER='ws://localhost:8545'  # WebSocket provider for real-time updates
```

### Running the Application

1. **Start the Hardhat Node**

   Open a terminal, navigate to your Hardhat project directory, and start the Hardhat node:

   ```bash
   npx hardhat node
   ```

2. **Start the Block Explorer**

   In another terminal window, go to the `block-explorer` project directory and start the React app:

   ```bash
   npm run start
   ```

   The app should now be accessible at `http://localhost:3000`, with full interaction capabilities on the Hardhat node.

### Running with Docker

For simplified setup, the project can be run in Docker.

1. **Build the Docker image:**

   ```bash
   docker build -t block-explorer      --build-arg REACT_APP_PROVIDER='http://127.0.0.1:8545'      --build-arg REACT_APP_WS_PROVIDER='ws://localhost:8545' .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3000:3000 block-explorer
   ```

   This will serve the app on `http://localhost:3000`.

## Testing

To run tests, ensure the Hardhat node is running, then execute:

```bash
npx hardhat test --network localhost
```

This setup connects the tests to the running Hardhat node for more realistic testing scenarios.

## Dependencies

- **React**
- **Ethers.js**
- **Tailwind CSS**
- **Hardhat**

![](https://hit.yhype.me/github/profile?user_id=26166520&repo=https://github.com/Shaivpidadi/custom-block-explorer)

<div align="center">
  <sub>Created by <a href="https://github.com/Shaivpidadi">Shaishav Pidadi</a>.</sub>
</div>
