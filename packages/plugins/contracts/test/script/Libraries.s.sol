// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Script } from "sphinx-forge-std/Script.sol";
import { MyContractWithLibraries } from "../../../contracts/test/MyContracts.sol";

/**
 * @notice A Forge script that deploys two libraries dynamically (i.e. not pre-linked) as well as
 *         the contract that uses these libraries. Forge automatically deploys the libraries at the
 *         beginning of the Forge script, so we don't need to add our own code that deploys them.
 *         This is the easiest way to deploy a contract with libraries from TypeScript because
 *         EthersJS does not automatically link libraries during contract deployments. The
 *         Hardhat-EthersJS plugin does link libraries, but it relies on contract artifacts
 *         generated by Hardhat, which isn't compatible with this repository because we compile with
 *         Foundry.
 */
contract MyContractWithLibraries_Script is Script {
    function run() external {
        vm.broadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        new MyContractWithLibraries();
    }
}
