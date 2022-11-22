// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ChugSplashRegistry } from "./ChugSplashRegistry.sol";
import { ChugSplashManager } from "./ChugSplashManager.sol";
import { ChugSplashManagerProxy } from "./ChugSplashManagerProxy.sol";
import { ProxyUpdater } from "./ProxyUpdater.sol";
import { Create2 } from "./libraries/Create2.sol";
import { Proxy } from "./libraries/Proxy.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title ChugSplashBootLoader
 */
contract ChugSplashBootLoader is Initializable {
    /**
     * @notice Deterministic Deployment Proxy address.
     */
    address public constant DETERMINISTIC_DEPLOYMENT_PROXY_ADDRESS =
        0x4e59b44847b379578588920cA78FbF26c0B4956C;

    /**
     * @notice Address of the ProxyUpdater.
     */
    ProxyUpdater public proxyUpdater;

    /**
     * @notice Address of the ChugSplashRegistry implementation contract.
     */
    ChugSplashRegistry public registryImplementation;

    /**
     * @notice Address of the ChugSplashRegistry's proxy.
     */
    Proxy public registryProxy;

    /**
     * @notice Address of the root ChugSplashManagerProxy.
     */
    ChugSplashManagerProxy public rootManagerProxy;

    /**
     * @notice Boots an upgradeable version of ChugSplash with a root ChugSplashManager that owns
     *         the ChugSplashRegistry. Once these contracts are deployed, we can upgrade ChugSplash
     *         using ChugSplash!
     *
     * @param _owner                     Address of the owner of the ChugSplash contracts.
     * @param _executorBondAmount        Executor bond amount in ETH.
     * @param _executionLockTime         Amount of time for an executor to completely execute a
     *                                   bundle after claiming it.
     * @param _ownerBondAmount           Amount that must be deposited in this contract in order to
     *                                   execute a bundle.
     * @param _executorPaymentPercentage Amount that an executor will earn from completing a bundle,
     *                                   denominated as a percentage.
     * @param _managerImplementation     Address of the ChugSplashManager implementation contract.
     * @param _registryProxy             Address of the ChugSplashRegistry's proxy.
     */
    function initialize(
        address _owner,
        uint256 _executorBondAmount,
        uint256 _executionLockTime,
        uint256 _ownerBondAmount,
        uint256 _executorPaymentPercentage,
        address _managerImplementation,
        address _registryProxy
    ) external initializer {
        // Deploy the ProxyUpdater.
        proxyUpdater = new ProxyUpdater{ salt: bytes32(0) }();

        // Deploy the root ChugSplashManager's proxy.
        rootManagerProxy = new ChugSplashManagerProxy{ salt: bytes32(0) }(
            ChugSplashRegistry(_registryProxy),
            address(this)
        );
        // Initialize the proxy. Note that we initialize it in a different call from the deployment
        // because this makes it easy to calculate the Create2 address off-chain before it is
        // deployed.
        rootManagerProxy.upgradeToAndCall(
            _managerImplementation,
            abi.encodeCall(ChugSplashManager.initialize, ("Root Manager", _owner))
        );
        // Transfer ownership of the ChugSplashManagerProxy to the specified owner.
        rootManagerProxy.changeAdmin(_owner);

        // Deploy and initialize the ChugSplashRegistry's implementation contract.
        registryImplementation = new ChugSplashRegistry{ salt: bytes32(0) }(
            address(proxyUpdater),
            _ownerBondAmount,
            _executorBondAmount,
            _executionLockTime,
            _executorPaymentPercentage,
            _managerImplementation
        );
    }
}
